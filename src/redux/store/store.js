import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { myRegionsReducer } from '../reducers/myRegionsReducer';
import { searchReducer } from '../reducers/searchReducer';

const reducers = combineReducers({
    searchAPI: searchReducer,
    myRegionsAPI: myRegionsReducer
});

export default createStore(reducers, applyMiddleware(thunk));