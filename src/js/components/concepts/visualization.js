import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ConceptVisualizationControls from './visualization-controls';
import ConceptGeneral from './general';
import ConceptLinks from './links';
import ConceptNotes from './notes';
import ModalRmes from 'js/components/shared/modal-rmes';
import D from 'js/i18n';
import { propTypes as generalPropTypes } from 'js/utils/concepts/general';
import { propTypes as notePropTypes } from 'js/utils/concepts/notes';
import { propTypesBilingual as linksPropTypes } from 'js/utils/concepts/links';
import { propTypes as permissionOverviewPropTypes } from 'js/utils/auth/permission-overview';
import { isOutOfDate } from 'js/utils/moment';
import { getModalMessage } from 'js/utils/concepts/build-validation-message';

class ConceptVisualization extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalValid: false,
		};
		this.handleClickValidation = () => {
			const { id, general: { valid } } = this.props;
			if (valid) this.setState({ modalValid: true });
			else this.props.validateConcept(id);
		};
		this.handleCancelValidation = () => this.setState({ modalValid: false });
		this.handleConfirmValidation = () => {
			this.handleCancelValidation();
			this.props.validateConcept(this.props.id);
		};
	}

	render() {
		const {
			id,
			permission,
			general,
			links,
			notes,
			secondLang,
			langs,
		} = this.props;
		const { modalValid } = this.state;
		const {
			conceptVersion,
			creator,
			isValidated,
			prefLabelLg1,
			prefLabelLg2,
			valid,
		} = general;

		const modalButtons = [
			{
				label: D.btnCancel,
				action: this.handleCancelValidation,
				style: 'primary',
			},
			{
				label: D.btnValid,
				action: this.handleConfirmValidation,
				style: 'primary',
			},
		];

		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<label className="pull-right">
								<input
									type="checkbox"
									checked={secondLang}
									onChange={this.props.saveSecondLang}
								/>{' '}
								{D.displayLg2}
							</label>
						</div>
					</div>
					<div className="row">
						<div className="col-md-10 centered col-md-offset-1">
							<h2 className="page-title">{prefLabelLg1}</h2>
						</div>
					</div>
					{secondLang &&
						prefLabelLg2 && (
							<div className="row">
								<div className="col-md-8 centered col-md-offset-2">
									<h3 className="page-sub-title">{prefLabelLg2}</h3>
								</div>
							</div>
						)}
					<ConceptVisualizationControls
						id={id}
						permission={permission}
						creator={creator}
						//TODO FIX ME
						isValidated={isValidated === 'Validé'}
						isValidOutOfDate={isOutOfDate(valid)}
						conceptVersion={conceptVersion}
						handleValidation={this.handleClickValidation}
					/>
					<ConceptGeneral
						secondLang={secondLang}
						attr={general}
						langs={langs}
					/>
					<ConceptLinks secondLang={secondLang} links={links} />
					<ConceptNotes secondLang={secondLang} notes={notes} langs={langs} />
				</div>
				<ModalRmes
					id="validation-concept-modal"
					isOpen={modalValid}
					title="Confirmation de la validation"
					body={getModalMessage([{ prefLabelLg1, valid }])}
					modalButtons={modalButtons}
					closeCancel={this.handleCancelValidation}
				/>
			</div>
		);
	}
}

ConceptVisualization.propTypes = {
	id: PropTypes.string, // not available for creation
	permission: permissionOverviewPropTypes.isRequired,
	general: generalPropTypes.isRequired,
	notes: notePropTypes.isRequired,
	links: linksPropTypes.isRequired,
	stampList: PropTypes.array.isRequired,
	disseminationStatusList: PropTypes.array.isRequired,
	validateConcept: PropTypes.func.isRequired,
	langs: PropTypes.object.isRequired,
};

export default ConceptVisualization;
