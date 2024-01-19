<?php
/**
 * Unit tests covering the functionality of the public functions of the
 * Interactivity API.
 *
 * @package WordPress
 * @subpackage Interactivity API
 *
 * @group interactivity-api
 */
class Tests_Interactivity_API_Functions extends WP_UnitTestCase {
	/**
	 * Set up.
	 */
	public function set_up() {
		parent::set_up();

		register_block_type(
			'test/interactive-block',
			array(
				'render_callback' => function ( $attributes, $content ) {
					return '
						<div
							data-wp-interactive=\'{ "namespace": "myPlugin" }\'
							data-wp-context=\'{ "level": ' . $attributes['level'] . ' }\'
						>
							<input class="interactive-level-' . $attributes['level'] . '-before-content" data-wp-bind--value="context.level">
								' . $content . '
							<input class="interactive-level-' . $attributes['level'] . '-after-content" data-wp-bind--value="context.level">
						</div>';
				},
				'supports'        => array(
					'interactivity' => true,
				),
			)
		);

		register_block_type(
			'test/non-interactive-block',
			array(
				'render_callback' => function ( $attributes ) {
					$directive = isset( $attributes['hasDirective'] ) ? ' data-wp-bind--value="context.level"' : '';
					return '<input class="non-interactive-level-' . $attributes['level'] . '"' . $directive . '>';
				},
			)
		);
	}

	public function tear_down() {
		unregister_block_type( 'test/interactive-block' );
		unregister_block_type( 'test/non-interactive-block' );
		parent::tear_down();
	}

	public function test_processs_directives_of_a_single_interactive_block() {
		$post_content    = '<!-- wp:test/interactive-block { "level": 1 } /-->';
		$rendered_blocks = do_blocks( $post_content );
		$p               = new WP_HTML_Tag_Processor( $rendered_blocks );
		$p->next_tag( array( 'class_name' => 'interactive-level-1-before-content' ) );
		$this->assertSame( '1', $p->get_attribute( 'value' ) );
		$p->next_tag( array( 'class_name' => 'interactive-level-1-after-content' ) );
		$this->assertSame( '1', $p->get_attribute( 'value' ) );
	}

	public function test_processs_directives_of_a_single_interactive_block_containing_a_non_interactive_block_without_directives() {
		$post_content    = '
			<!-- wp:test/interactive-block { "level": 1 } -->
				<!-- wp:test/non-interactive-block { "level": 2 } /-->
			<!-- /wp:test/interactive-block -->
		';
		$rendered_blocks = do_blocks( $post_content );
		$p               = new WP_HTML_Tag_Processor( $rendered_blocks );
		$p->next_tag( array( 'class_name' => 'interactive-level-1-before-content' ) );
		$this->assertSame( '1', $p->get_attribute( 'value' ) );
		$p->next_tag( array( 'class_name' => 'non-interactive-level-2' ) );
		$this->assertNull( $p->get_attribute( 'value' ) );
		$p->next_tag( array( 'class_name' => 'interactive-level-1-after-content' ) );
		$this->assertSame( '1', $p->get_attribute( 'value' ) );
	}
}
