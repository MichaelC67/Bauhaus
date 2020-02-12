import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, ActionToolbar } from 'bauhaus-library';
import { goBack } from 'bauhaus-library/src/utils/redirection';
import D from 'js/i18n';

function LevelControls(props) {
	const { id } = props;

	return (
		<ActionToolbar>
			<Button
				action={goBack(props, `/classifications/classification/${id}`)}
				label={D.btnReturn}
			/>
		</ActionToolbar>
	);
}

LevelControls.propTypes = {
	id: PropTypes.string.isRequired,
};
export default withRouter(LevelControls);
