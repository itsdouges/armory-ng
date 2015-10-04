'use strict';

import { fetchCharacterResultSuccess, fetchingCharacter, selectCharacter } from './index';

describe('character action creators', () => {
	describe('thunks', () => {
		// TODO ;)
	});

	describe('actions', () => {
		it('should build fetch user character result as expected', () => {
			const action = fetchCharacterResultSuccess('user', 'characters');
			
			expect(action).toEqual({
				type: 'FETCH_CHARACTER_RESULT',
				payload: {
					name: 'user',
					data: 'characters'
				}
			});
		});
	});

	it('should build fetching character action as expected', () => {
		const action = fetchingCharacter(true);
		
		expect(action).toEqual({
			type: 'FETCHING_CHARACTER',
			payload: true
		});
	});

	it('should build select character action as expected', () => {
		const action = selectCharacter('michael');

		expect(action).toEqual({
			type: 'SELECT_CHARACTER',
			payload: 'michael' 
		});
	});
});