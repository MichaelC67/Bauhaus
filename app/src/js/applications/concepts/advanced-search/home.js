import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { PageTitle, NumberResult, Select } from '@inseefr/wilco';
import Controls from './controls';
import DatePickerRmes from 'js/applications/shared/date-picker-rmes';
import D from 'js/i18n';
import { filterKeyDate } from 'js/utils/array-utils';
import { ArrayUtils, withTitle, Pagination, useUrlQueryParameters } from 'bauhaus-utilities';

const filterLabel = ArrayUtils.filterKeyDeburr(['label']);
const filterAltLabel = ArrayUtils.filterKeyDeburr(['altLabel']);
const filterDefinition = ArrayUtils.filterKeyDeburr(['definition']);
const filterCreator = ArrayUtils.filterKeyDeburr(['creator']);
const filterDisseminationStatus = ArrayUtils.filterKeyDeburr([
	'disseminationStatus',
]);
const filterValidationStatus = ArrayUtils.filterKeyDeburr(['validationStatus']);
const filterCreatedDate = filterKeyDate(['created']);
const filterModifiedDate = filterKeyDate(['modified']);

const defaultFormState = {
	label: '',
	altLabel: '',
	definition: '',
	creator: '',
	dateCreatedStart: '',
	dateCreatedEnd: '',
	dateModifiedStart: '',
	dateModifiedEnd: '',
	disseminationStatus: '',
	validationStatus: '',
}

const ConceptSearchList = ({ conceptSearchList, stampList, disseminationStatusList }) => {
	const [form, setForm, reset] = useUrlQueryParameters(defaultFormState)
	const history = useHistory();

	const handleChange = (property, stateChange) => {
		const newForm = {
			...form,
			[property]: stateChange
		};
		setForm(newForm);
	};

	const {
		label,
		altLabel,
		definition,
		creator,
		disseminationStatus,
		validationStatus,
		dateCreatedStart,
		dateCreatedEnd,
		dateModifiedStart,
		dateModifiedEnd,
	} = form;

	const hits = conceptSearchList
		.filter(filterLabel(label))
		.filter(filterAltLabel(altLabel))
		.filter(filterDefinition(definition))
		.filter(filterCreator(creator))
		.filter(filterDisseminationStatus(disseminationStatus))
		.filter(filterValidationStatus(validationStatus))
		.filter(filterCreatedDate(dateCreatedStart, dateCreatedEnd))
		.filter(filterModifiedDate(dateModifiedStart, dateModifiedEnd));


	const disseminationStatusListOptions = disseminationStatusList.map(
		({ label, url: value }) => ({ label, value })
	);
	const stampListOptions = stampList.map(stamp => {
		return {
			label: stamp,
			value: stamp,
		};
	});

	const validationStatusOptions = [
		{ label: D.conceptStatusValid, value: 'true' },
		{ label: D.conceptStatusProvisional, value: 'false' },
	];

	const hitEls = hits.map(({ id, label }) => (
		<li key={id} className="list-group-item">
			<Link to={`/concept/${id}`}>{label}</Link>
		</li>
	));

	return (
		<div>
			<div className="container">
				<PageTitle title={D.conceptSearchTitle} />
				<Controls
					onClickReturn={() => history.push("/concepts")}
					initializeState={reset}
				/>
				<div className="row form-group">
					<div className="col-md-12">
						<input
							value={label}
							onChange={e => handleChange("label", e.target.value)}
							type="text"
							placeholder={D.searchLabelPlaceholder}
							className="form-control"
						/>
					</div>
				</div>
				<div className="row form-group">
					<div className="col-md-12">
						<input
							value={altLabel}
							onChange={e => handleChange('altLabel', e.target.value)}
							type="text"
							placeholder={D.searchAltLabelPlaceholder}
							className="form-control"
						/>
					</div>
				</div>
				<div className="row form-group">
					<div className="col-md-12">
						<input
							value={definition}
							onChange={e => handleChange('definition', e.target.value)}
							type="text"
							placeholder={D.searchDefinitionPlaceholder}
							className="form-control"
						/>
					</div>
				</div>
				<div className="row form-group">
					<div className="col-md-4">
						<Select
							className="form-control"
							placeholder={D.stampsPlaceholder}
							value={
								stampListOptions.find(({ value }) => value === creator) || ''
							}
							options={stampListOptions}
							onChange={value => handleChange('creator', value)}
						/>
					</div>
					<div className="col-md-4">
						<Select
							className="form-control"
							placeholder={D.disseminationStatusPlaceholder}
							value={
								disseminationStatusListOptions.find(
									({ value }) => value === disseminationStatus
								) || ''
							}
							options={disseminationStatusListOptions}
							onChange={value => handleChange('disseminationStatus', value)}
						/>
					</div>
					<div className="col-md-4">
						<Select
							className="form-control"
							placeholder={D.validationStatusPlaceholder}
							value={
								validationStatusOptions.find(
									({ value }) => value === validationStatus
								) || ''
							}
							options={validationStatusOptions}
							onChange={value => handleChange('validationStatus', value)}
						/>
					</div>
				</div>
				<div className="row vertical-center">
					<div className="col-md-3 text-center">
						<label>{D.conceptsCreationDateMessage}</label>
					</div>
					<div className="col-md-4">
						<DatePickerRmes
							value={dateCreatedStart}
							onChange={value => handleChange('dateCreatedStart', value)}
							placement="bottom"
						/>
					</div>
					<div className="col-md-1 text-center">
						<label>{D.conceptsTransitionDateMessage}</label>
					</div>
					<div className="col-md-4">
						<DatePickerRmes
							value={dateCreatedEnd}
							onChange={value => handleChange('dateCreatedEnd', value)}
							placement="bottom"
						/>
					</div>
				</div>
				<div className="row vertical-center">
					<div className="col-md-3 text-center">
						<label>{D.conceptsUpdateDateMessage}</label>
					</div>
					<div className="col-md-4">
						<DatePickerRmes
							value={dateModifiedStart}
							onChange={value => handleChange('dateModifiedStart', value)}
							placement="bottom"
						/>
					</div>
					<div className="col-md-1 text-center">
						<label>{D.conceptsTransitionDateMessage}</label>
					</div>
					<div className="col-md-4">
						<DatePickerRmes
							value={dateModifiedEnd}
							onChange={value => handleChange('dateModifiedEnd', value)}
							placement="bottom"
						/>
					</div>
				</div>
				<div className="text-center">
					<div>
						<h4>
							<NumberResult results={hitEls} />
						</h4>
					</div>
					<div>
						<Pagination itemEls={hitEls} itemsPerPage="10" />
					</div>
				</div>
			</div>
		</div>
	);
}
const propTypesGeneralForSearch = PropTypes.shape({
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	altLabel: PropTypes.string,
	definition: PropTypes.string,
	created: PropTypes.string,
	modified: PropTypes.string,
	creator: PropTypes.string,
	disseminationStatus: PropTypes.string,
	validationStatus: PropTypes.string,
});

ConceptSearchList.propTypes = {
	conceptSearchList: PropTypes.arrayOf(propTypesGeneralForSearch).isRequired,
	stampList: PropTypes.array.isRequired,
	disseminationStatusList: PropTypes.array.isRequired,
};

export default withTitle(ConceptSearchList, D.conceptsTitle, () => D.advancedSearch);
