import * as types from './ActionTypes';
import {loadShoppingCartProductsRequest, removeProductFromCartRequest} from '../../../api/cart';

export const shoppingCartProductsLoaded = (products) => {
    return {
        type: types.SHOPPING_CART_PRODUCTS_LOADED,
        products: products
    };
};

export const isShoppingCartProductsLoading = (bool) => {
    return {
        type: types.IS_SHOPPING_CART_PRODUCTS_LOADING,
        isShoppingCartProductsLoading: bool
    };
};

export const productsShouldBeReloaded = (bool = false) => {
    debugger;
    return {
        type: types.PRODUCTS_SHOULD_BE_RELOADED,
        productsShouldBeReloaded: bool
    };
};

export const loadAllCartProducts = () => {
    debugger;
    return (dispatch, getState) => {
        if(getState().cartsReducers.isShoppingCartProductsLoading) {
            return Promise.resolve();
        }

        dispatch(isShoppingCartProductsLoading(true));

        debugger;
        return loadShoppingCartProductsRequest()
            .then(products => dispatch(shoppingCartProductsLoaded(products)))
            .catch(e => console.error(e))
    };
};

export const removeProductFromCart = (productId) => {
    return (dispatch) => {
        return removeProductFromCartRequest(productId)
            .then(products => dispatch(shoppingCartProductsLoaded(products)))
            .then(products => dispatch(productsShouldBeReloaded(true)))
            .catch(e => console.error(e))
    };
};
