const dictionary = {
	geography: {
		labelWithStartDate: {
			en: (label, startDate) => `${label} [since ${startDate}]`,
			fr: (label, startDate) => `${label} [depuis le ${startDate}]`
		},
		labelWithStartDateAndEndDate: {
			en: (label, startDate, endDate) => `${label} [since ${startDate} until ${endDate}]`,
			fr: (label, startDate, endDate) => `${label} [depuis le ${startDate} jusqu'au ${endDate}]`
		}
	},
	pagination: {
		goTo: {
			en: 'Go to page',
			fr: 'Allez à la page',
		},
	},
	btnReinitialize: {
		fr: 'Réinitialiser',
		en: 'Reinitialize',
	},
	result: {
		fr: 'résultat',
		en: 'result',
	},
	results: {
		fr: 'résultats',
		en: 'results',
	},
	deleteTitle: {
		fr: 'Suppression',
		en: 'Delete',
	},
	confirmationConceptDelete: {
		fr:
			'Vous êtes sur le point de supprimer définitivement ce concept. Êtes-vous sûr ?',
		en: 'You are about to permanently delete this concept. Are you sure?',
	},
	yes: {
		fr: 'Oui',
		en: 'Yes',
	},
	no: {
		fr: 'Non',
		en: 'No',
	},
	statusValidatedM: {
		fr: 'Publié',
		en: 'Published',
	},
	statusValidatedF: {
		fr: 'Publiée',
		en: 'Published',
	},
	statusModifiedM: {
		fr: 'Provisoire, déjà publié',
		en: 'Temporary, already published',
	},
	statusModifiedF: {
		fr: 'Provisoire, déjà publiée',
		en: 'Temporary, already published',
	},
	statusUnpublishedM: {
		fr: 'Provisoire, jamais publié',
		en: 'Temporary, never published',
	},
	statusUnpublishedF: {
		fr: 'Provisoire, jamais publiée',
		en: 'Temporary, never published',
	},
	noResult: {
		fr: 'Aucun résultat',
		en: 'No results',
	},
	advancedSearchTitle: {
		fr: 'Recherche avancée',
		en: 'Advanced search',
	},
	itemPerPagePlaceholder: {
		fr: 'Nombre d\'éléments par page',
		en: 'Number of elements per page'
	},
	createdDateTitle: {
		fr: 'Date de création',
		en: 'Creation date',
	},
	modifiedDateTitle: {
		fr: 'Date de modification',
		en: 'Modification date',
	},
};
export default dictionary;
