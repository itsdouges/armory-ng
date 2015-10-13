import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger({
	collapsed: true
});

// @ngInject
export default ($ngReduxProvider) => {
	$ngReduxProvider.createStoreWith(rootReducer, ['ngUiRouterMiddleware', thunk, logger]);
};