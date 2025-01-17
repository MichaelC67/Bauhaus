import { buildApi } from './build-api';

export const api = {
	getCodesLists: () => [''],
	getPartialCodesLists: () => ['partial'],
	getCodesList: notation => [`${notation}`],
};

export default buildApi('codeList', api);
