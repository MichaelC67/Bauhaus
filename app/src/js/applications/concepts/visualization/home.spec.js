import React from 'react';
import { render } from '@testing-library/react';
import ConceptVisualization from './home';
import { empty } from 'js/utils/concepts/general';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({});

describe('concept-visualization', () => {
	it('renders without crashing', () => {
		render(
			<Provider store={store}>
				<ConceptVisualization
					id="id"
					general={empty()}
					notes={{}}
					links={[]}
					stampList={[]}
					disseminationStatusList={[]}
					validateConcept={() => console.log('validate')}
					secondLang={true}
					langs={{ lg1: 'fr', lg2: 'en' }}
					permission={{ authType: '', roles: [''] }}
				/>
			</Provider>,
			{ wrapper: MemoryRouter }
		);
	});
});