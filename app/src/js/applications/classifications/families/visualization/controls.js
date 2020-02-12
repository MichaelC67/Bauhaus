import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, ActionToolbar } from '@inseefr/wilco';
import { goBack } from '@inseefr/wilco/src/utils/redirection';
import D from 'js/i18n';

function FamilyControls(props) {
	return (
		<ActionToolbar>
			<Button
				action={goBack(props, `/classifications/families`)}
				label={D.btnReturn}
			/>
		</ActionToolbar>
	);
}

export default withRouter(FamilyControls);
