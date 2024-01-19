<?php
/**
 * Unit tests covering the data_wp_style_processor functionality of the
 * WP_Interactivity_API class.
 *
 * @package WordPress
 * @subpackage Interactivity API
 *
 * @group interactivity-api
 */
class Tests_WP_Interactivity_API_WP_Style extends WP_UnitTestCase {
	/**
	 * Instance of WP_Interactivity_API.
	 *
	 * @var WP_Interactivity_API
	 */
	protected $interactivity;

	/**
	 * Set up.
	 */
	public function set_up() {
		parent::set_up();
		$this->interactivity = new WP_Interactivity_API();
	}

	/**
	 * Invokes the private set_style method of WP_Interactivity_API class.
	 *
	 * @param string $directive_value The directive attribute value to evaluate.
	 * @return mixed The result of the evaluate method.
	 */
	private function set_style_property( $style_attribute_value, $style_property_name, $style_property_value ) {
		$evaluate = new ReflectionMethod( $this->interactivity, 'set_style_property' );
		$evaluate->setAccessible( true );
		return $evaluate->invokeArgs( $this->interactivity, array( $style_attribute_value, $style_property_name, $style_property_value ) );
	}

	public function test_set_style_property_sets_properties() {
		// Adds property on empty style attribute.
		$result = $this->set_style_property( '', 'color', 'green' );
		$this->assertEquals( 'color:green;', $result );

		// Changes style property when there is an existing property.
		$result = $this->set_style_property( 'color:red;', 'color', 'green' );
		$this->assertEquals( 'color:green;', $result );

		// Adds a new property when the existing one does not match.
		$result = $this->set_style_property( 'color:red;', 'background', 'blue' );
		$this->assertEquals( 'color:red;background:blue;', $result );

		// Handles multiple existing properties.
		$result = $this->set_style_property( 'color:red;margin:5px;', 'color', 'green' );
		$this->assertEquals( 'color:green;margin:5px;', $result );

		// Adds a new property when multiple existing properties do not match.
		$result = $this->set_style_property( 'color:red;margin:5px;', 'padding', '10px' );
		$this->assertEquals( 'color:red;margin:5px;padding:10px;', $result );

		// Removes whitespaces in all properties.
		$result = $this->set_style_property( ' color : red; margin : 5px; ', 'padding', ' 10px ' );
		$this->assertEquals( 'color:red;margin:5px;padding:10px;', $result );

		// Updates a property when it's not the first one in the value.
		$result = $this->set_style_property( 'color:red;margin:5px;', 'margin', '15px' );
		$this->assertEquals( 'color:red;margin:15px;', $result );

		// Adds missing trailing semicolon.
		$result = $this->set_style_property( 'color:red;margin:5px', 'padding', '10px' );
		$this->assertEquals( 'color:red;margin:5px;padding:10px;', $result );

		// Doesn't add double semicolons.
		$result = $this->set_style_property( 'color:red;margin:5px;', 'padding', '10px;' );
		$this->assertEquals( 'color:red;margin:5px;padding:10px;', $result );

		// Handles empty properties in the input.
		$result = $this->set_style_property( 'color:red;;margin:5px;;', 'padding', '10px' );
		$this->assertEquals( 'color:red;margin:5px;padding:10px;', $result );
	}

	public function test_set_style_property_with_falsy_values() {
		// Removes a property with an empty string.
		$result = $this->set_style_property( 'color:red;margin:5px;', 'color', '' );
		$this->assertEquals( 'margin:5px;', $result );

		// Removes a property with null.
		$result = $this->set_style_property( 'color:red;margin:5px;', 'color', null );
		$this->assertEquals( 'margin:5px;', $result );

		// Removes a property with false.
		$result = $this->set_style_property( 'color:red;margin:5px;', 'color', false );
		$this->assertEquals( 'margin:5px;', $result );

		// Removes a property with 0.
		$result = $this->set_style_property( 'color:red;margin:5px;', 'color', 0 );
		$this->assertEquals( 'margin:5px;', $result );

		// It doesn't add a new property with an empty string.
		$result = $this->set_style_property( 'color:red;', 'padding', '' );
		$this->assertEquals( 'color:red;', $result );

		// It doesn't add a new property with null.
		$result = $this->set_style_property( 'color:red;', 'padding', null );
		$this->assertEquals( 'color:red;', $result );

		// It doesn't add a new property with false.
		$result = $this->set_style_property( 'color:red;', 'padding', false );
		$this->assertEquals( 'color:red;', $result );

		// It doesn't add a new property with 0.
		$result = $this->set_style_property( 'color:red;', 'padding', 0 );
		$this->assertEquals( 'color:red;', $result );
	}


	private function process_directives( $html ) {
		$this->interactivity->initial_state(
			'myPlugin',
			array(
				'green' => 'green',
				'false' => false,
			)
		);
		$new_html = $this->interactivity->process_directives( $html );
		$p        = new WP_HTML_Tag_Processor( $new_html );
		$p->next_tag();
		return array( $p, $new_html );
	}

	public function test_wp_style_sets_style_attribute() {
		$html    = '<div data-wp-style--color="myPlugin::state.green">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'color:green;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_sets_multiple_style_properties() {
		$html    = '
			<div
				data-wp-style--color="myPlugin::state.green"
				data-wp-style--background="myPlugin::state.green"
			>Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'color:green;background:green;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_sets_multiple_style_properties_with_different_values() {
		$html    = '
			<div
				data-wp-style--color="myPlugin::state.green"
				data-wp-style--background="myPlugin::state.false"
			>Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'color:green;', $p->get_attribute( 'style' ) );

		$html    = '
			<div
				style="background:red;"
				data-wp-style--color="myPlugin::state.green"
				data-wp-style--background="myPlugin::state.false"
			>Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'color:green;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_sets_style_property_when_style_attribute_exists() {
		$html    = '<div style="padding:10px;" data-wp-style--color="myPlugin::state.green">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'padding:10px;color:green;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_overwrites_style_property_when_style_property_exists() {
		$html    = '<div style="color:red;" data-wp-style--color="myPlugin::state.green">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'color:green;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_doesnt_add_style_attribute_on_false() {
		$html    = '<div data-wp-style--color="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_doesnt_add_style_property_on_false() {
		$html    = '<div style="padding:10px;" data-wp-style--color="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'padding:10px;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_keeps_style_property_when_style_property_exists() {
		$html    = '<div style="color:green;" data-wp-style--color="myPlugin::state.green">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'color:green;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_keeps_style_property_when_style_property_exists_and_is_not_the_only_one() {
		$html    = '<div style="padding:10px;color:green;" data-wp-style--color="myPlugin::state.green">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'padding:10px;color:green;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_removes_style_attribute_when_style_property_exists_and_is_the_only_one() {
		$html    = '<div style="color:green;" data-wp-style--color="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_removes_style_property_when_style_property_exists_and_is_not_the_only_one() {
		$html    = '<div style="padding:10px;color:green;" data-wp-style--color="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'padding:10px;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_doesnt_remove_empty_style_attribute() {
		$html    = '<div style data-wp-style--color="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertTrue( $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_doesnt_change_style_attribute_with_empty_directive_suffix() {
		$html    = '<div style="padding:10px;" data-wp-style="myPlugin::state.green">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'padding:10px;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_doesnt_change_style_attribute_with_empty_value() {
		$html    = '<div style="padding:10px" data-wp-style--color="">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'padding:10px;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_doesnt_change_style_attribute_without_value() {
		$html    = '<div style="padding: 10px;" data-wp-style--color>Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'padding:10px;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_works_with_multiple_directives() {
		$html    = '<div data-wp-style--color="myPlugin::state.green" data-wp-style--color="myPlugin::state.green">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'color:green;', $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_doesnt_do_anything_on_true_values() {
		$this->interactivity->initial_state( 'myPlugin', array( 'true' => true ) );
		$html    = '<div data-wp-style--color="myPlugin::state.text">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'style' ) );
	}

	public function test_wp_style_doesnt_add_style_property_on_falsy_values() {
		$this->interactivity->initial_state( 'myPlugin', array( 'text' => '' ) );
		$html    = '<div data-wp-style--color="myPlugin::state.text">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'style' ) );

		$this->interactivity->initial_state( 'myPlugin', array( 'array' => array() ) );
		$html    = '<div data-wp-style--color="myPlugin::state.array">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'style' ) );

		$this->interactivity->initial_state( 'myPlugin', array( 'number' => 0 ) );
		$html    = '<div data-wp-style--color="myPlugin::state.number">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'style' ) );

		$this->interactivity->initial_state( 'myPlugin', array( 'null' => null ) );
		$html    = '<div data-wp-style--color="myPlugin::state.null">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'style' ) );
	}
}
