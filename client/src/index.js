import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

function logger({getState}){
    return next => action => {
        console.log('will dispatch', action);
        const returnValue = next(action);
        console.log('state after dispatch', getState());
        return returnValue;
    }
}
ReactDOM.render(
<Provider store={createStore(reducers, applyMiddleware(thunk, logger))}>
    <App />
</Provider>,
document.querySelector('#root'));