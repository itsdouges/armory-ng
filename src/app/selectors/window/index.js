import { createSelector } from 'reselect';

const getSpacerHeight = state => state.window.spacerHeight;

export const spacerSelector = createSelector(
    getSpacerHeight,
    (spacerHeight) => {
        return {
            spacerHeight
        };
    }
);