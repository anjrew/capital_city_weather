import React from 'react';
import ReactDOM from 'react-dom';

// PAGES
import App from './pages/app';

// REDUX
import reducer from './react_utils/redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { parseCitysResp }from './react_utils/redux/middleware';

const middleWare = applyMiddleware(thunk, promise, parseCitysResp, logger);
const initialState = {
    status: '',
    query:''
};

const store = createStore(reducer, initialState, composeWithDevTools(middleWare));

let elem = <Provider store={store}>
    <App />
</Provider>;


ReactDOM.render(elem, document.querySelector('main'));
