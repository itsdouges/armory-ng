export const actions = {
    SHOW_TOAST: 'SHOW_TOAST'
};

function showToast (message, icon, location = 'bottom-middle', timeout = 500) {
    return {
        type: actions.SHOW_TOAST,
        payload: {
            message: message,
            icon: icon,
            timeout: timeout,
            location: location
        }
    };
}

export default showToast;