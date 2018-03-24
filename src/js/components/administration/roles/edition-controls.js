import React from 'react';
import PropTypes from 'prop-types';
import D from 'js/i18n';

function EditionControls({ setEdition, addAgent, addData }) {
	const disabled = addData.length === 0;
	return (
		<div className="row btn-line">
			<div className="col-md-2">
				<div
					className="btn btn-primary btn-lg col-md-12"
					onClick={() => setEdition(false)}
				>
					{D.btnReturn}
				</div>
			</div>
			<div className="col-md-2 pull-right">
				<button
					className="btn btn-primary btn-lg col-md-12"
					onClick={() => addAgent(addData)}
					disabled={disabled}
				>
					{D.btnAdd}
				</button>
			</div>
		</div>
	);
}

EditionControls.propTypes = {
	setEdition: PropTypes.func.isRequired,
	addAgent: PropTypes.func.isRequired,
	addData: PropTypes.array.isRequired,
};

export default EditionControls;
