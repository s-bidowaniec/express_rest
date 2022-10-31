import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import concerts from './concertsRedux';
import seats from './seatsRedux';

// combine reducers
const rootReducer = combineReducers({
  concerts,
  seats,
});
const NODE_ENV = process.env.NODE_ENV;
let store;
if(NODE_ENV === 'production') {
	store = createStore(
		rootReducer,
		compose(
			applyMiddleware(thunk)
		)
	);
} else {
	store = createStore(
		rootReducer,
		compose(
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);
}
export default store;
