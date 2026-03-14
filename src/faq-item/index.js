import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ( { attributes, setAttributes } ) => {
		const { question, answer, headingTag } = attributes;
		const blockProps = useBlockProps();

		const HeadingTag = headingTag;

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'FAQ Item Settings', 'et-seo-simple-faq-block' ) }>
						<SelectControl
							label={ __( 'Heading Tag', 'et-seo-simple-faq-block' ) }
							value={ headingTag }
							options={ [
								{ label: 'H2', value: 'h2' },
								{ label: 'H3', value: 'h3' },
								{ label: 'H4', value: 'h4' },
								{ label: 'H5', value: 'h5' },
								{ label: 'H6', value: 'h6' },
							] }
							onChange={ ( value ) => setAttributes( { headingTag: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<details open>
						<summary>
							<RichText
								tagName={ headingTag }
								className="faq-question-text"
								value={ question }
								onChange={ ( value ) => setAttributes( { question: value } ) }
								placeholder={ __( 'Enter question here...', 'et-seo-simple-faq-block' ) }
								allowedFormats={ [ 'core/bold', 'core/italic' ] }
							/>
						</summary>
						<div className="faq-answer">
							<RichText
								tagName="div"
								value={ answer }
								onChange={ ( value ) => setAttributes( { answer: value } ) }
								placeholder={ __( 'Enter answer here...', 'et-seo-simple-faq-block' ) }
							/>
						</div>
					</details>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		const { question, answer, headingTag } = attributes;
		const blockProps = useBlockProps.save();
		const HeadingTag = headingTag;

		return (
			<div { ...blockProps }>
				<details>
					<summary>
						<RichText.Content
							tagName={ headingTag }
							className="faq-question-text"
							value={ question }
						/>
					</summary>
					<div className="faq-answer">
						<RichText.Content
							tagName="div"
							value={ answer }
						/>
					</div>
				</details>
			</div>
		);
	},
});
