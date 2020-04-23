import React from 'react';
import { withRouter } from 'react-router-dom';
import {
	ActionToolbar,
	ReturnButton,
	ExportButton,
	UpdateButton,
	DeleteButton,
} from '@inseefr/wilco';

const Controls = ({ dsdId }) => {
	const isLocal = process.env.REACT_APP_API === 'local';

	return (
		<ActionToolbar>
			<ReturnButton action="/structures" />
			{isLocal && <ExportButton action={console.log} />}
			<UpdateButton action={`/structures/${dsdId}/update`} />
			{isLocal && <DeleteButton action={console.log} />}
		</ActionToolbar>
	);
};

export default withRouter(Controls);
