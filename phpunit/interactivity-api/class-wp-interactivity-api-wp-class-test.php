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

	public function test_wp_class_sets_class_name_when_class_attribute_exists() {
		$html    = '<div class="other-class" data-wp-class--some-class="myPlugin::state.true">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'other-class some-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_sets_class_name_when_class_name_exists() {
		$html    = '<div class="some-class" data-wp-class--some-class="myPlugin::state.true">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-class', $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_doesnt_add_class_attribute() {
		$html    = '<div data-wp-class--some-class="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_doesnt_remove_empty_class_attribute() {
		$html    = '<div class data-wp-class--some-class="myPlugin::state.false">Text</div>';
		list($p) = $this->process_directives( $html );
		$this->assertTrue( $p->get_attribute( 'class' ) );
	}

	public function test_wp_class_doesnt_change_class_attribute_without_suffix() {
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
	}
}
