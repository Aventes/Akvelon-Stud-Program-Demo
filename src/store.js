import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'

import productsReducers from './components/products/reducers/products'
import cartsReducers from './components/cart/reducers/carts'

const middleware = [thunk, createLogger()];

const store = createStore(
    combineReducers({
        productsReducers: productsReducers,
        cartsReducers: cartsReducers
    }),
    applyMiddleware(...middleware)
);

export default store;