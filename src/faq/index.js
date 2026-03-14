import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';
import './editor.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ( { attributes, setAttributes } ) => {
		const { styleTheme } = attributes;
		const blockProps = useBlockProps({
			className: `et-seo-faq-container ${styleTheme}`
		});

		const ALLOWED_BLOCKS = [ 'et-seo-simple-faq-block/faq-item' ];
		const TEMPLATE = [
			[ 'et-seo-simple-faq-block/faq-item', {} ]
		];

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'FAQ Settings', 'et-seo-simple-faq-block' ) }>
						<SelectControl
							label={ __( 'Theme Style', 'et-seo-simple-faq-block' ) }
							value={ styleTheme }
							options={ [
								{ label: __( 'Default', 'et-seo-simple-faq-block' ), value: 'theme-default' },
								{ label: __( 'Boxed', 'et-seo-simple-faq-block' ), value: 'theme-boxed' },
								{ label: __( 'Bordered', 'et-seo-simple-faq-block' ), value: 'theme-bordered' },
							] }
							onChange={ ( value ) => setAttributes( { styleTheme: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
					/>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		const { styleTheme } = attributes;
		const blockProps = useBlockProps.save({
			className: `et-seo-faq-container ${styleTheme}`
		});
		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
});
