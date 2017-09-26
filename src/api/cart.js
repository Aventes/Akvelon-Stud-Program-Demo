import axios from 'axios';

const GET_ALL_PRODUCTS = "http://localhost:3000/products";

export const loadAllProducts = () => {
    return axios({
        method: 'GET',
        url: GET_ALL_PRODUCTS,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        crossDomain: true,
        responseType: 'json'
    }).then(response => response.data)
};