import * as types from './ActionTypes';
import {loadAllProductsRequest} from '../../../api/products';
import {addProductToCartRequest} from '../../../api/cart';

export const productsLoaded = (products) => {
    return {
        type: types.PRODUCTS_LOADED,
        products
    }
};
export const productsShouldBeReloaded = (bool) => {
    return {
        type: types.PRODUCTS_SHOULD_BE_RELOADED,
        productsShouldBeReloaded: bool
    }
};

export const isProductsLoading = (bool) => {
    return {
        type: types.IS_PRODUCTS_LOADING,
        isProductsLoading: bool
    }
};

export const loadAllProducts = () => {
    return (dispatch, getState) => {
        if(getState().productsReducers.isProductsLoading) {
            return Promise.resolve();
        }

        dispatch(isProductsLoading(true));

        return loadAllProductsRequest()
            .then(products => dispatch(productsLoaded(products)))
            .catch(e => console.error(e))
    }
};

export const productAddedToCart = (productAddedToCart) => {
    return {
        type: types.PRODUCT_ADDED_TO_CART,
        productAddedToCart
    }
};

export const addProductToCart = (productId) => {
    return (dispatch) => {
        return addProductToCartRequest(productId)
            .then(response => dispatch(productAddedToCart(true)))
            .then(response =>  dispatch(productsShouldBeReloaded(true)))
            .catch(e => console.log(e))
    }
};