<?php
/**
 * Render for FAQ Item
 */

$question      = $attributes['question'] ?? '';
$answer        = $attributes['answer'] ?? '';
$heading_tag   = $attributes['headingTag'] ?? 'h3';
$accordion     = $block->context['et-seo-faq/accordionMode'] ?? false;
$block_id      = $block->context['et-seo-faq/blockId'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes();

$details_attributes = '';
if ( $accordion && ! empty( $block_id ) ) {
	$details_attributes .= ' name="' . esc_attr( $block_id ) . '"';
}
?>
<div <?php echo $wrapper_attributes; ?>>
	<details <?php echo $details_attributes; ?>>
		<summary>
			<<?php echo esc_attr( $heading_tag ); ?> class="faq-question-text">
				<?php echo wp_kses_post( $question ); ?>
			</<?php echo esc_attr( $heading_tag ); ?>>
		</summary>
		<div class="faq-answer">
			<?php echo wp_kses_post( $answer ); ?>
		</div>
	</details>
</div>
