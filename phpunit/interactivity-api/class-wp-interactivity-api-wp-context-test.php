<?php
/**
 * Unit tests covering the data_wp_context_processor functionality of the
 * WP_Interactivity_API class.
 *
 * @package WordPress
 * @subpackage Interactivity API
 *
 * @group interactivity-api
 */
class Tests_WP_Interactivity_API_WP_Context extends WP_UnitTestCase {
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

	private function process_directives( $html ) {
		$new_html = $this->interactivity->process_directives( $html );
		$p        = new WP_HTML_Tag_Processor( $new_html );
		$p->next_tag( array( 'class_name' => 'test' ) );
		return array( $p, $new_html );
	}

	public function test_wp_context_directive_sets_a_context_in_a_custom_namespace() {
		$html    = '
			<div data-wp-context=\'myPlugin::{ "id": "some-id" }\'>
				<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_can_set_a_context_in_the_same_element() {
		$html    = '
			<div
				class="test"
				data-wp-context=\'myPlugin::{ "id": "some-id" }\'
				data-wp-bind--id="myPlugin::context.id"
			>
				Text
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_merges_context_in_the_same_custom_namespace() {
		$html    = '
			<div data-wp-context=\'myPlugin::{ "id1": "some-id-1" }\'>
				<div data-wp-context=\'myPlugin::{ "id2": "some-id-2" }\'>
					<div class="test" data-wp-bind--id="myPlugin::context.id1">Text</div>
					<div class="test" data-wp-bind--id="myPlugin::context.id2">Text</div>
				</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-1', $p->get_attribute( 'id' ) );
		$p->next_tag( array( 'class_name' => 'test' ) );
		$this->assertEquals( 'some-id-2', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_overwrites_context_in_the_same_custom_namespace() {
		$html    = '
			<div data-wp-context=\'myPlugin::{ "id": "some-id-1" }\'>
				<div data-wp-context=\'myPlugin::{ "id": "some-id-2" }\'>
					<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
				</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-2', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_replaces_old_context_after_closing_tag_in_the_same_custom_namespace() {
		$html    = '
			<div data-wp-context=\'myPlugin::{ "id": "some-id-1" }\'>
				<div data-wp-context=\'myPlugin::{ "id": "some-id-2" }\'>
					<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
				</div>
				<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-2', $p->get_attribute( 'id' ) );
		$p->next_tag( array( 'class_name' => 'test' ) );
		$this->assertEquals( 'some-id-1', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_merges_context_in_different_custom_namespaces() {
		$html    = '
			<div data-wp-context=\'myPlugin::{ "id": "some-id-1" }\'>
				<div data-wp-context=\'otherPlugin::{ "id": "some-id-2" }\'>
					<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
					<div class="test" data-wp-bind--id="otherPlugin::context.id">Text</div>
				</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-1', $p->get_attribute( 'id' ) );
		$p->next_tag( array( 'class_name' => 'test' ) );
		$this->assertEquals( 'some-id-2', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_doesnt_throw_on_malformed_context_objects() {
		$html    = '
			<div data-wp-context=\'myPlugin::{ id: "some-id" }\'>
				<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_doesnt_overwrite_context_on_malformed_context_objects() {
		$html    = '
			<div data-wp-context=\'myPlugin::{ "id": "some-id-1" }\'>
				<div data-wp-context=\'myPlugin::{ id: "some-id-2" }\'>
					<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
				</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-1', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_doesnt_throw_on_empty_context() {
		$html    = '
			<div data-wp-context="">
				<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_doesnt_overwrite_context_on_empty_context() {
		$html    = '
			<div data-wp-context=\'myPlugin::{ "id": "some-id-1" }\'>
				<div data-wp-context="">
					<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
				</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-1', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_doesnt_throw_on_context_without_value() {
		$html    = '
			<div data-wp-context>
				<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_doesnt_overwrite_context_on_context_without_value() {
		$html    = '
			<div data-wp-context=\'myPlugin::{ "id": "some-id-1" }\'>
				<div data-wp-context>
					<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
				</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-1', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_doesnt_work_without_any_namespace() {
		$html    = '
			<div data-wp-context=\'{ "id": "some-id" }\'>
				<div class="test" data-wp-bind--id="context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertNull( $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_works_with_default_namespace() {
		$html    = '
			<div
			 data-wp-interactive=\'{ "namespace": "myPlugin" }\'
			 data-wp-context=\'{ "id": "some-id" }\'
			>
				<div class="test" data-wp-bind--id="context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_overrides_default_namespace() {
		$html    = '
			<div
			 data-wp-interactive=\'{ "namespace": "myPlugin" }\'
			 data-wp-context=\'otherPlugin::{ "id": "some-id" }\'
			>
				<div data-wp-interactive=\'{ "namespace": "otherPlugin" }\'>
					<div class="test" data-wp-bind--id="context.id">Text</div>
				</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_overrides_default_namespace_with_same_namespace() {
		$html    = '
			<div
			 data-wp-interactive=\'{ "namespace": "myPlugin" }\'
			 data-wp-context=\'myPlugin::{ "id": "some-id" }\'
			>
				<div class="test" data-wp-bind--id="context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_works_with_nested_default_namespaces() {
		$html    = '
			<div data-wp-interactive=\'{ "namespace": "myPlugin" }\'>
				<div data-wp-context=\'{ "id": "some-id" }\'>
					<div data-wp-interactive=\'{ "namespace": "otherPlugin" }\'>
						<div data-wp-context=\'{ "id": "other-id" }\'>
							<div class="test" data-wp-bind--id="context.id">Text</div>
							<div class="test" data-wp-bind--id="myPlugin::context.id">Text</div>
						</div>
					</div>
					<div class="test" data-wp-bind--id="context.id">Text</div>
				</div>
				<div class="test" data-wp-bind--id="context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'other-id', $p->get_attribute( 'id' ) );
		$p->next_tag( array( 'class_name' => 'test' ) );
		$this->assertEquals( 'some-id', $p->get_attribute( 'id' ) );
		$p->next_tag( array( 'class_name' => 'test' ) );
		$this->assertEquals( 'some-id', $p->get_attribute( 'id' ) );
		$p->next_tag( array( 'class_name' => 'test' ) );
		$this->assertNull( $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_works_with_default_namespace_in_the_same_element() {
		$html    = '
			<div
			 class="test"
			 data-wp-interactive=\'{ "namespace": "myPlugin" }\'
			 data-wp-context=\'{ "id": "some-id" }\'
			 data-wp-bind--id="context.id"
			>
				Text
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_merges_context_in_the_same_default_namespace() {
		$html    = '
			<div
				data-wp-interactive=\'{ "namespace": "myPlugin" }\'
				data-wp-context=\'{ "id1": "some-id-1" }\'
			>
				<div data-wp-context=\'{ "id2": "some-id-2" }\'>
					<div class="test" data-wp-bind--id="context.id1">Text</div>
					<div class="test" data-wp-bind--id="context.id2">Text</div>
				</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-1', $p->get_attribute( 'id' ) );
		$p->next_tag( array( 'class_name' => 'test' ) );
		$this->assertEquals( 'some-id-2', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_overwrites_context_in_the_same_default_namespace() {
		$html    = '
			<div
				data-wp-interactive=\'{ "namespace": "myPlugin" }\'
				data-wp-context=\'{ "id": "some-id-1" }\'
			>
				<div data-wp-context=\'{ "id": "some-id-2" }\'>
					<div class="test" data-wp-bind--id="context.id">Text</div>
				</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-2', $p->get_attribute( 'id' ) );
	}

	public function test_wp_context_directive_replaces_old_context_after_closing_tag_in_the_same_default_namespace() {
		$html    = '
			<div
				data-wp-interactive=\'{ "namespace": "myPlugin" }\'
				data-wp-context=\'{ "id": "some-id-1" }\'
			>
				<div data-wp-context=\'{ "id": "some-id-2" }\'>
					<div class="test" data-wp-bind--id="context.id">Text</div>
				</div>
				<div class="test" data-wp-bind--id="context.id">Text</div>
			</div>
		';
		list($p) = $this->process_directives( $html );
		$this->assertEquals( 'some-id-2', $p->get_attribute( 'id' ) );
		$p->next_tag( array( 'class_name' => 'test' ) );
		$this->assertEquals( 'some-id-1', $p->get_attribute( 'id' ) );
	}
}
