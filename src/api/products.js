import axios from 'axios';

const GET = 'GET';
const PUT = 'PUT';
const POST = 'POST';
const DELETE = 'DELETE';

const GET_ALL_PRODUCTS_URL = "http://localhost:3000/products";
const EDIT_PRODUCT_URL = "http://localhost:3000/products/";
const DELETE_PRODUCT_URL = "http://localhost:3000/products/";
const CREATE_PRODUCT_URL = "http://localhost:3000/products";

export const loadAllProductsRequest = () => {
    return axios({
        method: GET,
        url: GET_ALL_PRODUCTS_URL,
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

export const editProductRequest = (productId, product) => {
    return axios({
        method: GET,
        url: EDIT_PRODUCT_URL + productId,
        data: {product: product},
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

export const deleteProductRequest = (productId) => {
    return axios({
        method: DELETE,
        url: DELETE_PRODUCT_URL + productId,
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

export const createProductRequest = (product) => {
    return axios({
        method: POST,
        url: CREATE_PRODUCT_URL,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {product: product},
        crossDomain: true,
        responseType: 'json'
    }).then(response => {
        return response.data
    })
};