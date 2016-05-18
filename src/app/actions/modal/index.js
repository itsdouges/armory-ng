export const actions = {
    SHOW_MODAL: 'SHOW_MODAL'
};

function setModalOpen (show, modalToShow) {
    return {
        type: actions.SHOW_MODAL,
        payload: show
    };
}

const actionCreators = {
    setModalOpen
};

export default actionCreators;