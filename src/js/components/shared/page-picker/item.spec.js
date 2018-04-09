import React from 'react';
import { shallow } from 'enzyme';
import Item from './item';
import addLogo from 'js/components/shared/logo-add';

describe('page-picker', () => {
	it('renders without crashing', () => {
		shallow(
			<Item
				id="id"
				label="label"
				logo={addLogo}
				handleClick={() => console.log('action')}
			/>
		);
	});
});
