import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';
import './editor.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ( { attributes, setAttributes, clientId } ) => {
		const { styleTheme, accordionMode, blockId } = attributes;

		// Assign a unique blockId if it's not set
		if ( ! blockId ) {
			setAttributes( { blockId: `faq-${ clientId.substring( 0, 8 ) }` } );
		}

		const blockProps = useBlockProps({
			className: `et-seo-faq-container ${styleTheme}`
		});

		const ALLOWED_BLOCKS = [ 'et-seo-simple-faq-block/faq-item' ];
		const TEMPLATE = [
			[ 'et-seo-simple-faq-block/faq-item', {} ],
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
								{ label: __( 'Dark Modern', 'et-seo-simple-faq-block' ), value: 'theme-dark' },
							] }
							onChange={ ( value ) => setAttributes( { styleTheme: value } ) }
						/>
						<ToggleControl
							label={ __( 'Accordion Mode', 'et-seo-simple-faq-block' ) }
							help={ __( 'Only one item can be open at a time.', 'et-seo-simple-faq-block' ) }
							checked={ accordionMode }
							onChange={ ( value ) => setAttributes( { accordionMode: value } ) }
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
