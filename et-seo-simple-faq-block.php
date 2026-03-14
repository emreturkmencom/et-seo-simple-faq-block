<?php
/**
 * Plugin Name:       SEO Simple FAQ Block
 * Description:       A lightweight, SEO-friendly Gutenberg FAQ block using HTML5 details/summary and auto JSON-LD schema.
 * Version:           1.0.0
 * Author:            Emre Türkmen
 * Author URI:        https://emreturkmen.com
 * Text Domain:       et-seo-simple-faq-block
 * License:           GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function et_seo_simple_faq_block_init() {
	load_plugin_textdomain( 'et-seo-simple-faq-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

	register_block_type( __DIR__ . '/build/faq' );
	register_block_type( __DIR__ . '/build/faq-item' );
}
add_action( 'init', 'et_seo_simple_faq_block_init' );
