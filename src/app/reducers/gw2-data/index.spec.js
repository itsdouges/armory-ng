import reducer from './index';
import { showTooltip } from '../../actions/gw2-data';

describe('gw2 reducer', () => {
    it('should set show tooltip', () => {
        const state = reducer(undefined, showTooltip(true, {
            item: 'item',
            skin: 'skin',
            upgrades: 'upgrades',
            type: 'type',
            upgradeCount: 'total'
        }));

        expect(state).toEqual({
            items: {
                data: {}
            },
            skins: {
                data: {}
            },
            traits: {
                data: {}
            },
            specializations: {
                data: {}
            },
            tooltip: {
                open: true,
                item: 'item',
                skin: 'skin',
                upgrades: 'upgrades',
                type: 'type',
                upgrade_combo_count: 'total'
            }
        });
    });

    it('should set show tooltip false', () => {
        const previousState = {
            items: {
                data: {}
            },
            skins: {
                data: {}
            },
            tooltip: {
                open: true,
                item: 'item',
                skin: 'skin',
                upgrades: 'upgrades',
                type: 'type',
                upgrade_combo_count: 'total'
            }
        };

        const state = reducer(previousState, showTooltip(false));

        expect(state).toEqual({
            items: {
                data: {}
            },
            skins: {
                data: {}
            },
            tooltip: {
                open: false
            }
        });
    });
});