"use strict";

import reducer from './index';
import { fetchCharacterResultSuccess, fetchingCharacter, selectCharacter } from '../../actions/characters';

describe('character reducers', () => {
    it('should add character to initial state', () => {
        const character = {
            name: 'woo'
        };

        const newState = reducer(undefined, fetchCharacterResultSuccess('woo', character));

        expect(newState).toEqual({
            data: {
                woo: {
                    name: 'woo'
                }
            }
        });
    });

    it('should add character to exisiting state', () => {
        const state = {
            data: {
                haha: {
                    name: 'haha'
                }
            }
        };

        const character = {
            name: 'woo'
        };

        const newState = reducer(state, fetchCharacterResultSuccess('woo', character));

        expect(newState).toEqual({
            data: {
                woo: {
                    name: 'woo'
                },
                haha: {
                    name: 'haha'
                }
            }
        });
    });

    it('should set fetching to true when fetching character', () => {
        const state = reducer({}, fetchingCharacter(true));

        expect(state).toEqual({
            fetching: true
        });
    });

    it('should set fetching to false when not fetching character', () => {
        const state = reducer({}, fetchingCharacter(false));

        expect(state).toEqual({
            fetching: false
        });
    });

    it('should set selected to selected character', () => {
        const state = reducer({}, selectCharacter('heyhey'));

        expect(state).toEqual({
            selected: 'heyhey',
            mode: 'pve'
        });
    });
});