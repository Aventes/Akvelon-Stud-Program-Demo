import * as types from '../actions/ActionTypes'
const initialState = {
    products: [],
    productAddedToCart: false,
    productsShouldBeReloaded: false,
    isProductsLoading: false
};

function productsReducers(state = initialState, action) {
    switch (action.type) {
        case types.PRODUCTS_LOADED: {
            debugger;
            return updateObject(state, {
                products: action.products,
                productsShouldBeReloaded: false,
                isProductsLoading: false
            });
        }

        case types.PRODUCT_ADDED_TO_CART: {
            return updateObject(state, {
                productAddedToCart: action.productAddedToCart,
                productsShouldBeReloaded: true
            });
        }

        case types.PRODUCTS_SHOULD_BE_RELOADED: {
            return updateObject(state, {
                productsShouldBeReloaded: action.productsShouldBeReloaded
            });
        }

        case types.IS_PRODUCTS_LOADING: {
            return updateObject(state, {
                isProductsLoading: action.isProductsLoading
            });
        }

        default:
            return state;
    }
}

function updateObject(obj, newProperties) {
    return Object.assign({}, obj, newProperties);
}

export default productsReducers;