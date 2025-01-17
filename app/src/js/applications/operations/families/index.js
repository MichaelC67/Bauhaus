import React, { useEffect, useState } from 'react';
import { Loading } from '@inseefr/wilco';
import api from '../../../remote-api/operations-api';
import { ArrayUtils, Auth, useTitle } from 'bauhaus-utilities';
import D from '../../../i18n/build-dictionary';
import OperationsObjectHome from '../shared/list';

export const FamiliesHomeContainer = () => {
	const [loading, setLoading] = useState(true);
	const [families, setFamilies] = useState([]);
	useTitle(D.operationsTitle, D.familiesTitle)

	useEffect(() => {
		api.getFamiliesList()
			.then(results => setFamilies(ArrayUtils.sortArray('label')(results)))
			.finally(() => setLoading(false))
	}, [])

	if (loading) return <Loading />;

	return (
		<OperationsObjectHome
			items={families}
			roles={[Auth.ADMIN]}
			title={D.familiesSearchTitle}
			childPath="operations/family"
			searchURL="/operations/families/search"
			createURL="/operations/family/create"
		/>
	);
}


export default FamiliesHomeContainer;
