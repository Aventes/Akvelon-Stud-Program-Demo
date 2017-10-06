import * as types from '../actions/ActionTypes'
const initialState = {
    products: [],
    productAddedToCart: false,
    productsShouldBeReloaded: false,
    isShoppingCartProductsLoading: false,
};

function cartsReducers(state = initialState, action) {
    switch (action.type) {
        case types.SHOPPING_CART_PRODUCTS_LOADED: {
            return updateObject(state, {
                products: action.products,
                productsShouldBeReloaded: false,
                isShoppingCartProductsLoading: false
            });
        }
        case types.PRODUCTS_SHOULD_BE_RELOADED: {
            return updateObject(state, {
                productsShouldBeReloaded: action.productsShouldBeReloaded
            });
        }
        case types.IS_SHOPPING_CART_PRODUCTS_LOADING: {
            return updateObject(state, {
                isShoppingCartProductsLoading: action.isShoppingCartProductsLoading
            });
        }

        default:
            return state;
    }
}

function updateObject(obj, newProperties) {
    return Object.assign({}, obj, newProperties);
}

export default cartsReducers;