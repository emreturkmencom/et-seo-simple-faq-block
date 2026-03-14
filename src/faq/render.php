<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block default content.
 * @param WP_Block $block      The block instance.
 */

// Generate JSON-LD Schema
$schema_items = [];

if ( ! empty( $block->parsed_block['innerBlocks'] ) && is_array( $block->parsed_block['innerBlocks'] ) ) {
	foreach ( $block->parsed_block['innerBlocks'] as $inner_block ) {
		if ( isset( $inner_block['blockName'] ) && 'et-seo-simple-faq-block/faq-item' === $inner_block['blockName'] ) {
			$question = isset( $inner_block['attrs']['question'] ) ? $inner_block['attrs']['question'] : '';
			$answer   = isset( $inner_block['attrs']['answer'] ) ? $inner_block['attrs']['answer'] : '';
			
			// Strip tags to ensure clean JSON strings, though schema can contain some HTML.
			// It's safer to strip tags for the schema question, and keep basic HTML for answer.
			if ( ! empty( $question ) && ! empty( $answer ) ) {
				$schema_items[] = [
					'@type'          => 'Question',
					'name'           => wp_strip_all_tags( $question ),
					'acceptedAnswer' => [
						'@type' => 'Answer',
						'text'  => wp_kses_post( $answer ),
					],
				];
			}
		}
	}
}

$schema_html = '';
if ( ! empty( $schema_items ) ) {
	$schema = [
		'@context'   => 'https://schema.org',
		'@type'      => 'FAQPage',
		'mainEntity' => $schema_items,
	];
	$schema_html = '<script type="application/ld+json">' . wp_json_encode( $schema ) . '</script>';
}

// Ensure the content output is the same as the JS saved content which includes the wrapper,
// just appending the schema to it.
// Replace the closing div with the schema and the closing div.
$content_with_schema = preg_replace( '/<\/div>$/', $schema_html . '</div>', trim( $content ) );

echo $content_with_schema;