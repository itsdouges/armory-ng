import styles from './social-buttons.less';

function component () {
    return {
        restrict: 'E',
        scope: {},
        controller: SocialButtons,
        controllerAs: 'ctrl',
        bindToController: {
            location: '@',
            sendToast: '&'
        },
        template: `
            <div>
                Like what you see? <strong>Share it!</strong>
            </div>

            <div class="${styles.buttons}">
                <copy-to-clipboard 
                    send-toast="ctrl.sendToast"
                    class="${styles.buttonContainer}"
                    text="{{ ctrl.location }}"></copy-to-clipboard>
            </div>
        `
    };
}

class SocialButtons {
    constructor () {
        this.sendToast = this.sendToast();
    }
}

export default component;