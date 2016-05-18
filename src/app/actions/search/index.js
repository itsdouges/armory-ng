import axios from 'axios';
import modalActions from '../modal';
import config from '../../app.env';

export const actions = {
    CLEAR_SEARCH: 'CLEAR_SEARCH',
    SEARCH_RESULT: 'SEARCH_RESULT',
    SEARCHING: 'SEARCHING'
};

function searchThunk (searchTerm) {
    return (dispatch) => {
        dispatch(modalActions.setModalOpen(true, 'search'));
        dispatch(searching(true, searchTerm));

        return axios.get(`${config.api.endpoint}search?filter=${searchTerm}`)
            .then((response) => {
                dispatch(searchResult(response.data));
            });
    };
}

function searchResult (items) {
    return {
        type: actions.SEARCH_RESULT,
        payload: items
    };
}

function searching (busy, term) {
    return {
        type: actions.SEARCHING,
        payload: {
            busy,
            term
        }
    };
}

function closeSearchThunk () {
    return dispatch => {
        dispatch(modalActions.setModalOpen(false));
        dispatch(clearSearch());
    };
}

function clearSearch () {
    return {
        type: actions.CLEAR_SEARCH
    };
}

const actionCreators = {
    searchThunk,
    closeSearchThunk
};

export default actionCreators;