import React from 'react';
import {
	NewButton,
	PageTitle,
	Button,
	VerticalMenu,
} from '@inseefr/wilco';
import { Auth, SearchableList } from 'bauhaus-utilities';
import D from 'js/i18n';

function OperationsObjectHome({
	items,
	roles,
	title,
	childPath,
	searchURL,
	createURL,
	advancedSearch = true,
}) {
	return (
		<div className="container">
			<div className="row">
					<VerticalMenu>
						<Auth.AuthGuard roles={roles}>
							<NewButton action={createURL} wrapper={false} />
						</Auth.AuthGuard>
						<Button wrapper={false} action="/operations/tree">
							{D.btnTree}
						</Button>
					</VerticalMenu>
				<div className="col-md-8 text-center pull-right operations-list">
					<PageTitle title={title} col={12} offset={0} />
					<SearchableList
						items={items}
						childPath={childPath}
						label="label"
						searchUrl={searchURL}
						advancedSearch={advancedSearch}
						autoFocus={true}
					/>
				</div>
			</div>
		</div>
	);
}

export default OperationsObjectHome;
