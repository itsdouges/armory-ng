import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger({
	collapsed: true,
	//predicate: (state, action) => action.type !== 'INVALIDATE_EMAIL'
});

export default ($ngReduxProvider) => {
	$ngReduxProvider.createStoreWith(rootReducer, [thunk, logger]);
};