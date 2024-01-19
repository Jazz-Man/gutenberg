<?php
/**
 * Interactivity API: WP_Interactivity_API class.
 *
 * @package WordPress
 * @subpackage Interactivity API
 */

if ( class_exists( 'WP_Interactivity_API' ) ) {
	return;
}

/**
 * Class used to process the Interactivity API in the server.
 */
class WP_Interactivity_API {
	private static $directive_processors = array(
		'data-wp-interactive' => 'data_wp_interactive_processor',
		'data-wp-context'     => 'data_wp_context_processor',
		'data-wp-bind'        => 'data_wp_bind_processor',
		'data-wp-class'       => 'data_wp_class_processor',
		'data-wp-style'       => 'data_wp_style_processor',
		'data-wp-text'        => 'data_wp_text_processor',
	);

	private $initial_state = array();

	private $config = array();

	public function initial_state( $store_namespace, $initial_state = null ) {
		if ( ! isset( $this->initial_state[ $store_namespace ] ) ) {
			$this->initial_state[ $store_namespace ] = array();
		}
		if ( is_array( $initial_state ) ) {
			$this->initial_state[ $store_namespace ] = array_replace_recursive(
				$this->initial_state[ $store_namespace ],
				$initial_state
			);
		}
		return $this->initial_state[ $store_namespace ];
	}

	public function print_client_interactivity_data() {
		if ( ! empty( $this->initial_state ) ) {
			wp_print_inline_script_tag(
				wp_json_encode(
					array(
						'config'       => (object) $this->config,
						'initialState' => (object) $this->initial_state,
					),
					JSON_HEX_TAG | JSON_HEX_AMP
				),
				array(
					'type' => 'application/json',
					'id'   => 'wp-interactivity-data',
				)
			);
		}
	}

	/**
	 * Registers the `@wordpress/interactivity` script modules.
	 */
	public function register_script_modules() {
		wp_register_module(
			'@wordpress/interactivity',
			gutenberg_url( '/build/interactivity/index.min.js' ),
			array(),
			defined( 'GUTENBERG_VERSION' ) ? GUTENBERG_VERSION : get_bloginfo( 'version' )
		);
	}

	public function add_hooks() {
		add_action( 'wp_footer', array( $this, 'print_client_interactivity_data' ), 8 );
	}

	public function process_directives( $html ) {
		$p               = new WP_Interactivity_API_Directives_Processor( $html );
		$tag_stack       = array();
		$namespace_stack = array();
		$context_stack   = array();
		$unbalanced      = false;

		$directive_processor_prefixes          = array_keys( self::$directive_processors );
		$directive_processor_prefixes_reversed = array_reverse( $directive_processor_prefixes );

		while ( $p->next_tag( array( 'tag_closers' => 'visit' ) ) && false === $unbalanced ) {
			$tag_name = $p->get_tag();

			if ( $p->is_tag_closer() ) {
				// Preprocessing for a closing tag.
				if ( 0 === count( $tag_stack ) ) {
					// If the tag stack is empty, it means the HTML is unbalanced and we
					// should stop processing it.
					$unbalanced = true;
					continue;
				}

				list( $opening_tag_name, $directives_prefixes ) = end( $tag_stack );

				if ( $opening_tag_name !== $tag_name ) {
					// If the matching opening tag is not the same than the closing tag,
					// it means the HTML is unbalanced and we should stop processing it.
					$unbalanced = true;
					continue;
				} else {
					// The HTML is still balanced, we can keep processing it.
					array_pop( $tag_stack );

					// If the matching opening tag didn't have any directives, we don't
					// need to do any processing.
					if ( 0 === count( $directives_prefixes ) ) {
						continue;
					}
				}
			} else {
				// Preprocessing for an opening tag.
				$directives_prefixes = array();

				foreach ( $p->get_attribute_names_with_prefix( 'data-wp-' ) as $attribute_name ) {
					// Extracts the directive prefix to see if there is a server directive
					// processor registered for that directive.
					list( $directive_prefix ) = $this->extract_directive_prefix_and_suffix( $attribute_name );
					if ( array_key_exists( $directive_prefix, self::$directive_processors ) ) {
						$directives_prefixes[] = $directive_prefix;
					}
				}

				// If this is not a void element, add it to the tag stack so we can
				// check if all tags are balanced later.
				if ( ! $p->is_void_element() ) {
					$tag_stack[] = array( $tag_name, $directives_prefixes );
				}
			}

			// Sorts the attributes by the order of the `directives_processor`
			// property, considering it as the priority order in which directives
			// should be processed. The order is reversed for tag closers.
			$directives_prefixes = array_intersect(
				$p->is_tag_closer()
					? $directive_processor_prefixes_reversed
					: $directive_processor_prefixes,
				$directives_prefixes
			);

			// Executes the directive processors.
			foreach ( $directives_prefixes as $directive_prefix ) {
				call_user_func_array(
					array( $this, self::$directive_processors[ $directive_prefix ] ),
					array( $p, &$context_stack, &$namespace_stack )
				);
			}
		}

		// It returns the original content if the HTML is unbalanced because it's
		// not safe to process. In that case, the Interactivity API runtime will
		// update the HTML on the client side during the hydration.
		return $unbalanced || 0 < count( $tag_stack ) ? $html : $p->get_updated_html();
	}

	private function evaluate( $directive_value, $default_namespace, $context ) {
		// Extract the namespace from the directive attribute value.
		list( $ns, $path ) = $this->parse_directive_value( $directive_value, $default_namespace );

		if ( empty( $path ) ) {
			return null;
		}

		$store = array(
			'state'   => isset( $this->initial_state[ $ns ] ) ? $this->initial_state[ $ns ] : array(),
			'context' => isset( $context[ $ns ] ) ? $context[ $ns ] : array(),
		);

		// Checks first if the reference path is preceded by a negator operator (!),
		// indicating that the value obtained should be negated.
		$should_negate_value = '!' === $path[0];
		$path                = $should_negate_value ? substr( $path, 1 ) : $path;

		// Extracts the value from the store using the reference path.
		$path_segments = explode( '.', $path );
		$current       = $store;
		foreach ( $path_segments as $p ) {
			if ( isset( $current[ $p ] ) ) {
				$current = $current[ $p ];
			} else {
				return null;
			}
		}

		// Returns the opposite if it has a negator operator (!).
		return $should_negate_value ? ! $current : $current;
	}

	/**
	 * Extracts and returns the prefix and suffix of a directive attribute.
	 *
	 * The suffix is the optional string after the first double hyphen and the
	 * prefix is everything that comes before the suffix.
	 *
	 * Examples:
	 *
	 *     'data-wp-interactive'   => array( 'data-wp-interactive', null )
	 *     'data-wp-bind--src'     => array( 'data-wp-bind', 'src' )
	 *     'data-wp-foo--and--bar' => array( 'data-wp-foo', 'and--bar' )
	 *
	 * @param string $directive_name The directive attribute name.
	 * @return array The array with the prefix and suffix.
	 */
	private function extract_directive_prefix_and_suffix( $directive_name ) {
		return explode( '--', $directive_name, 2 );
	}

	/**
	 * Parses and extracts the namespace and reference path from the given
	 * directive attribute value.
	 *
	 * If the value doesn't contain an explicit namespace, it returns the default
	 * one. If the value contains a JSON instead of a reference path, the function
	 * parses it and returns the resulting array.
	 *
	 * Examples:
	 *
	 *     ( 'actions.foo', 'myPlugin' )                      => array( 'myPlugin', 'actions.foo' )
	 *     ( 'otherPlugin::actions.foo', 'myPlugin' )         => array( 'otherPlugin', 'actions.foo' )
	 *     ( '{ "isOpen": false }', 'myPlugin' )              => array( 'myPlugin', array( 'isOpen' => false ) )
	 *     ( 'otherPlugin::{ "isOpen": false }', 'myPlugin' ) => array( 'otherPlugin', array( 'isOpen' => false ) )
	 *
	 * @param string $value             The directive attribute value.
	 * @param string $default_namespace The default namespace to use if no explicit namespace is found in the value.
	 * @return null|array An array containing either the JSON or the reference path, or null on failure.
	 */
	private function parse_directive_value( $value, $default_namespace = null ) {
		// Return early if the value is empty or a boolean.
		if ( empty( $value ) || is_bool( $value ) ) {
			return array( $default_namespace, null );
		}

		$matches       = array();
		$has_namespace = preg_match( '/^([\w\-_\/]+)::(.*)$/', $value ?? '', $matches );

		// Replace the value and namespace if there is a namespace in the value.
		if ( $has_namespace ) {
			$default_namespace = $matches[1];
			$value             = isset( $matches[2] ) ? $matches[2] : null;
		}

		// Try to decode the value as a JSON object. If it fails and the value isn't
		// 'null', return as is. Otherwise, return the decoded JSON or null for the
		// string 'null'.
		$decoded_json = json_decode( $value, true );
		if ( null !== $decoded_json || 'null' === trim( $value ) ) {
				$value = $decoded_json;
		}

		return array( $default_namespace, $value );
	}


	private function data_wp_interactive_processor( $p, &$context_stack, &$namespace_stack ) {
		// Remove the last namespace from the stack if this is the closing tag.
		if ( $p->is_tag_closer() ) {
			array_pop( $namespace_stack );
			return;
		}

		// Decode the data-wp-interactive attribute. In the case it is not a valid
		// JSON string, `null` is stored in `$directive_data`.
		$attribute_value = $p->get_attribute( 'data-wp-interactive' );
		$directive_data  = is_string( $attribute_value ) && ! empty( $attribute_value )
		? json_decode( $attribute_value, true )
		: null;

		// Push the newly defined namespace, or the current one if the
		// data-wp-interactive definition was invalid or does not contain a
		// namespace. This is done because the function pops out the current
		// namespace from the stack whenever it finds an island's closing tag,
		// independently of whether the island definition was correct or it
		// contained a valid namespace.
		$namespace_stack[] = isset( $directive_data['namespace'] )
			? $directive_data['namespace']
			: end( $namespace_stack );
	}

	private function data_wp_context_processor( $p, &$context_stack, &$namespace_stack ) {
		// Remove the last context from the stack if this is the closing tag.
		if ( $p->is_tag_closer() ) {
			array_pop( $context_stack );
			return;
		}

		$attribute_value = $p->get_attribute( 'data-wp-context' );
		$namespace_value = end( $namespace_stack );

		// Separate namespace and value from the context directive attribute.
		list( $namespace_value, $data ) = is_string( $attribute_value ) && ! empty( $attribute_value )
		? $this->parse_directive_value( $attribute_value, $namespace_value )
		: array( $namespace_value, null );

		// If there is a proper namespace, we need to add a new context to the stack
		// with the merge of the previous and new ones.
		if ( is_string( $namespace_value ) ) {
			$context = ( end( $context_stack ) !== false ) ? end( $context_stack ) : array();

			// Add parsed data to the context under the corresponding namespace.
			array_push(
				$context_stack,
				array_replace_recursive(
					$context,
					array( $namespace_value => is_array( $data ) ? $data : array() )
				)
			);
		}
	}

	private function data_wp_bind_processor( $p, &$context_stack, &$namespace_stack ) {
		if ( ! $p->is_tag_closer() ) {
			$all_bind_directives = $p->get_attribute_names_with_prefix( 'data-wp-bind--' );

			foreach ( $all_bind_directives as $attribute_name ) {
				list( , $bound_attribute ) = $this->extract_directive_prefix_and_suffix( $attribute_name );
				if ( empty( $bound_attribute ) ) {
					return;
				}

				$attribute_value = $p->get_attribute( $attribute_name );
				$result          = $this->evaluate( $attribute_value, end( $namespace_stack ), end( $context_stack ) );

				if ( null !== $result && ( false !== $result || '-' === $bound_attribute[4] ) ) {
					// If $result is a boolean and the attribute is `aria-` or `data-,
					// convert it to a string "true" or "false". We follow the exact same
					// logic than Preact here because we need to replicate what it does, but
					// in the server: https://github.com/preactjs/preact/blob/ea49f7a0f9d1ff2c98c0bdd66aa0cbc583055246/src/diff/props.js#L131C24-L136
					if ( is_bool( $result ) && '-' === $bound_attribute[4] ) {
						$result = $result ? 'true' : 'false';
					}
					$p->set_attribute( $bound_attribute, $result );
				} else {
					$p->remove_attribute( $bound_attribute );
				}
			}
		}
	}

	private function data_wp_class_processor( $p, &$context_stack, &$namespace_stack ) {
		if ( ! $p->is_tag_closer() ) {
			$all_class_directives = $p->get_attribute_names_with_prefix( 'data-wp-class--' );

			foreach ( $all_class_directives as $attribute_name ) {
				list( , $class_name ) = $this->extract_directive_prefix_and_suffix( $attribute_name );
				if ( empty( $class_name ) ) {
					return;
				}

				$attribute_value = $p->get_attribute( $attribute_name );
				$result          = $this->evaluate( $attribute_value, end( $namespace_stack ), end( $context_stack ) );

				if ( $result ) {
					$p->add_class( $class_name );
				} else {
					$p->remove_class( $class_name );
				}
			}
		}
	}

	private function data_wp_style_processor( $p, &$context_stack, &$namespace_stack ) {
		if ( ! $p->is_tag_closer() ) {
			$all_style_attributes = $p->get_attribute_names_with_prefix( 'data-wp-style--' );

			foreach ( $all_style_attributes as $attribute_name ) {
				list( , $style_property ) = $this->extract_directive_prefix_and_suffix( $attribute_name );
				if ( empty( $style_property ) ) {
					continue;
				}

				$directive_attribute_value = $p->get_attribute( $attribute_name );
				$style_property_value      = $this->evaluate( $directive_attribute_value, end( $namespace_stack ), end( $context_stack ) );

				$style_attribute_value = ( $p->get_attribute( 'style' ) === true ) ? '' : $p->get_attribute( 'style' ) ?? '';
				if ( $style_property_value || ( ! $style_property_value && $style_attribute_value ) ) {
					$style_attribute_value = $this->set_style_property( $style_attribute_value, $style_property, $style_property_value );
					if ( ! empty( $style_attribute_value ) ) {
						$p->set_attribute( 'style', $style_attribute_value );
					} else {
						$p->remove_attribute( 'style' );
					}
				}
			}
		}
	}

	/**
	 * Sets an style property in ...
	 *
	 * @param string $style_attribute_value Existing style to amend.
	 * @param string $style_property_name  Style property name.
	 * @param string $style_property_value Style property value.
	 * @return string Amended styles.
	 */
	private function set_style_property( $style_attribute_value, $style_property_name, $style_property_value ) {
		$style_assignments    = explode( ';', $style_attribute_value );
		$result               = array();
		$style_property_found = false;
		$style_property_value = ! empty( $style_property_value ) ? rtrim( trim( $style_property_value ), ';' ) : null;

		// Searches for the style property in the existing properties.
		foreach ( $style_assignments as $style_assignment ) {
			if ( empty( trim( $style_assignment ) ) ) {
				continue;
			}
			list( $name, $value ) = explode( ':', $style_assignment );
			if ( trim( $name ) === $style_property_name ) {
				// If the value is false, it doesn't add it.
				if ( $style_property_value ) {
					$result[] = $style_property_name . ':' . $style_property_value . ';';
				}
				$style_property_found = true;
			} else {
				$result[] = trim( $name ) . ':' . trim( $value ) . ';';
			}
		}

		// If it doesn't find the style property, it adds it at the end of the list.
		if ( ! $style_property_found && $style_property_value ) {
			$new_style_assignment = $style_property_name . ':' . $style_property_value . ';';
			array_push( $result, $new_style_assignment );
		}

		return implode( '', $result );
	}

	private function data_wp_text_processor( $p, &$context_stack, &$namespace_stack ) {
		if ( ! $p->is_tag_closer() ) {
			// Follows the same logic as Preact and only changes the content if the
			// value is a string or a number. Otherwise, it removes the content.
			$attribute_value = $p->get_attribute( 'data-wp-text' );
			$result          = $this->evaluate( $attribute_value, end( $namespace_stack ), end( $context_stack ) );

			if ( is_string( $result ) || is_numeric( $result ) ) {
				$p->set_content_between_balanced_tags( esc_html( $result ) );
			} else {
				$p->set_content_between_balanced_tags( '' );
			}
		}
	}
}
