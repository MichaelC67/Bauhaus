import React, { useState } from 'react';
import {
	Note,
	UpdateButton,
	ActionToolbar,
	ReturnButton,
	ErrorBloc,
	Select,
} from '@inseefr/wilco';
import D, { D1, D2 } from '../../i18n/build-dictionary';
import { HTMLUtils, ValidationButton } from 'bauhaus-utilities';
import PropTypes from 'prop-types';
import './view.scss';

export const CodeDetailView = ({
	code,
	codes,
	handleUpdate,
	handleBack,
	updatable,
	secondLang,
	col = 3,
	publishComponent,
	serverSideError,
}) => {
	const descriptionLg1 = HTMLUtils.renderMarkdownElement(code.descriptionLg1);
	const descriptionLg2 = HTMLUtils.renderMarkdownElement(code.descriptionLg2);
	const [parents, setParents] = useState(code.parents);

	const publish = () => {
		publishComponent();
	};

	const codesOptions = codes
		.map((code) => {
			return {
				label: code.code + ' - ' + code.labelLg1,
				value: code.code,
			};
		})
		.concat({ label: '', value: '' });

	return (
		<React.Fragment>
			<ActionToolbar>
				<ReturnButton action={handleBack} col={col} />
				<ValidationButton callback={publish} object={code} />
				{updatable && <UpdateButton action={handleUpdate} col={col} />}
			</ActionToolbar>
			<ErrorBloc error={serverSideError} />

			<div className="row">
				<Select
					className="form-control"
					label={D.parentCodeTitle}
					placeholder={D.parentCodeTitle}
					value={
						codesOptions.filter(
							({ value }) =>
								(parents && parents.some((parent) => parent === value)) ||
								(!parents && value === '')
						) || ''
					}
					options={codesOptions}
					disabled
					unclearable
					onChange={(parent) => setParents(...parents, parent)}
					multi
				/>
			</div>
			<div className="row">
				<Note text={code.id} title={D.codeTitle} alone={true} />
			</div>
			<div className="row">
				<Note text={code.labelLg1} title={D1.codeLabel} alone={!secondLang} />
				{secondLang && (
					<Note text={code.labelLg2} title={D2.codeLabel} alone={false} />
				)}
			</div>
			<div className="row">
				<Note
					text={descriptionLg1}
					title={D1.codeDescription}
					alone={!secondLang}
					allowEmpty={true}
				/>
				{secondLang && (
					<Note
						text={descriptionLg2}
						title={D2.codeDescription}
						alone={false}
						allowEmpty={true}
					/>
				)}
			</div>
		</React.Fragment>
	);
};

CodeDetailView.propTypes = {
	code: PropTypes.object,
	codes: PropTypes.array,
	handleUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	handleBack: PropTypes.func,
	updatable: PropTypes.bool,
	secondLang: PropTypes.bool,
	publishComponent: PropTypes.func,
};
