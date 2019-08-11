import reducer from './react_utils/redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const middleWare = applyMiddleware(reduxPromise);

export default createStore(reducer, composeWithDevTools(middleWare), thunk);