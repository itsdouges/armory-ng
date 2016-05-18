import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

var middleWare = [
    'ngUiRouterMiddleware', 
    thunk
];

// @ngInject
export default ($ngReduxProvider) => {
    if (__DEV__) {
        const logger = createLogger({
            collapsed: true
        });

        middleWare.push(logger);
    }

    $ngReduxProvider.createStoreWith(rootReducer, middleWare);
};