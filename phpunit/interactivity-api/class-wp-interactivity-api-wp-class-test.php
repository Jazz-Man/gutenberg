<?php
/**
 * Unit tests covering the data_wp_class_processor functionality of the
 * WP_Interactivity_API class.
 *
 * @package WordPress
 * @subpackage Interactivity API
 *
 * @group interactivity-api
 */
class Tests_WP_Interactivity_API_WP_Class extends WP_UnitTestCase {
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
		$this->interactivity->initial_state(
			'myPlugin',
			array(
				'true'  => true,
				'false' => false,
			)
		);
	}

	private function process_directives( $html ) {
		$new_html = $this->interactivity->process_directives( $html );
		$p        = new WP_HTML_Tag_Processor( $new_html );
		$p->next_tag();
		return array( $p, $new_html );
	}

	public function test_wp_class_sets_class_name() {
		$html    = '<div data-wp-class--some-class="myPlugin::state.true">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_sets_multiple_class_names() {
		$html    = '
			<div
				data-wp-class--some-class="myPlugin::state.true"
				data-wp-class--other-class="myPlugin::state.true"
			>Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-class other-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_handles_multiple_class_names_with_different_values() {
		$html    = '
			<div
				data-wp-class--some-class="myPlugin::state.true"
				data-wp-class--other-class="myPlugin::state.false"
			>Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-class', $p->get_attribute( 'class' ) );

		$html    = '
			<div
				class="other-class"
				data-wp-class--some-class="myPlugin::state.true"
				data-wp-class--other-class="myPlugin::state.false"
			>Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_sets_class_name_when_class_attribute_exists() {
		$html    = '<div class="other-class" data-wp-class--some-class="myPlugin::state.true">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'other-class some-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_doesnt_add_class_attribute_on_false() {
		$html    = '<div data-wp-class--some-class="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_doesnt_add_class_name_on_false() {
		$html    = '<div class="other-class" data-wp-class--some-class="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'other-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_keeps_class_name_when_class_name_exists() {
		$html    = '<div class="some-class" data-wp-class--some-class="myPlugin::state.true">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_keeps_class_name_when_class_name_exists_and_is_not_the_only_one() {
		$html    = '<div class="other-class some-class" data-wp-class--some-class="myPlugin::state.true">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'other-class some-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_removes_class_attribute_when_class_name_exists_and_is_the_only_one() {
		$html    = '<div class="some-class" data-wp-class--some-class="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_removes_class_name_when_class_name_exists_and_is_not_the_only_one() {
		$html    = '<div class="other-class some-class" data-wp-class--some-class="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'other-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_doesnt_remove_empty_class_attribute() {
		$html    = '<div class data-wp-class--some-class="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertTrue( $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_doesnt_change_class_attribute_with_empty_directive_suffix() {
		$html    = '<div class="other-class" data-wp-class="myPlugin::state.true">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'other-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_doesnt_change_class_attribute_with_empty_value() {
		$html    = '<div class="other-class" data-wp-class--some-class="">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'other-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_doesnt_change_class_attribute_without_value() {
		$html    = '<div class="other-class" data-wp-class--some-class>Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'other-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_sets_class_name_on_truthy_values() {
		$this->interactivity->initial_state( 'myPlugin', array( 'text' => 'some text' ) );
		$html    = '<div data-wp-class--some-class="myPlugin::state.text">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-class', $p->get_attribute( 'class' ) );

		$this->interactivity->initial_state( 'myPlugin', array( 'array' => array( 1, 2 ) ) );
		$html    = '<div data-wp-class--some-class="myPlugin::state.array">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-class', $p->get_attribute( 'class' ) );

		$this->interactivity->initial_state( 'myPlugin', array( 'number' => 1 ) );
		$html    = '<div data-wp-class--some-class="myPlugin::state.number">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_sets_class_name_on_falsy_values() {
		$this->interactivity->initial_state( 'myPlugin', array( 'text' => '' ) );
		$html    = '<div data-wp-class--some-class="myPlugin::state.text">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'class' ) );

		$this->interactivity->initial_state( 'myPlugin', array( 'array' => array() ) );
		$html    = '<div data-wp-class--some-class="myPlugin::state.array">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'class' ) );

		$this->interactivity->initial_state( 'myPlugin', array( 'number' => 0 ) );
		$html    = '<div data-wp-class--some-class="myPlugin::state.number">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'class' ) );

		$this->interactivity->initial_state( 'myPlugin', array( 'null' => null ) );
		$html    = '<div data-wp-class--some-class="myPlugin::state.null">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'class' ) );
	}
}
