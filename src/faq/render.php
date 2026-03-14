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

if ( ! empty( $block->parsed_block['innerBlocks'] ) ) {
	foreach ( $block->parsed_block['innerBlocks'] as $inner_block ) {
		if ( 'et-seo-simple-faq-block/faq-item' === $inner_block['blockName'] ) {
			$question = $inner_block['attrs']['question'] ?? '';
			$answer   = $inner_block['attrs']['answer'] ?? '';
			
			// Strip tags to ensure clean JSON strings, though schema can contain some HTML.
			// It's safer to strip tags for the schema question, and keep basic HTML for answer.
			if ( ! empty( $question ) && ! empty( $answer ) ) {
				$schema_items[] = [
					'@type'          => 'Question',
					'name'           => wp_strip_all_tags( $question ),
					'acceptedAnswer' => [
						'@type' => 'Answer',
						'text'  => $answer,
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

$wrapper_attributes = get_block_wrapper_attributes( [
	'class' => 'et-seo-faq-container ' . esc_attr( $attributes['styleTheme'] ?? 'theme-default' )
] );

echo '<div ' . $wrapper_attributes . '>';
echo $content;
echo $schema_html;
echo '</div>';
