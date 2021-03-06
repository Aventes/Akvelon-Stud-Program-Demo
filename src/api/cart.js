import axios from 'axios';

const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';
const DELETE = 'DELETE';

const GET_ALL_CART_PRODUCTS_URL = `http://localhost:3000/cart/products`;
const CART_CHECKOUT_URL = `http://localhost:3000/cart/checkout`;
const ADD_PRODUCT_TO_CART = `http://localhost:3000/cart/`;
const DELETE_PRODUCT_FROM_CART = `http://localhost:3000/cart/`;

export const loadShoppingCartProductsRequest = () => {
    return axios({
        method: GET,
        url: GET_ALL_CART_PRODUCTS_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        responseType: 'json'
    }).then(response => {
        return response.data
    })
};

export const cartCheckoutRequest = () => {
    return axios({
        method: POST,
        url: CART_CHECKOUT_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        responseType: 'json'
    }).then(response => {
        return response.data
    })
};

export const addProductToCartRequest = (productId) => {
    return axios({
        method: PUT,
        url: ADD_PRODUCT_TO_CART + productId,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        responseType: 'json'
    }).then(response => {
        return response.data
    })
};

export const removeProductFromCartRequest = (productId) => {
    return axios({
        method: DELETE,
        url: DELETE_PRODUCT_FROM_CART + productId,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        responseType: 'json'
    }).then(response => {
        return response.data
    })
};