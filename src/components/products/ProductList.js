import React from "react";
import {Table} from "react-bootstrap";

import ProductTableItem from './ProductTableItem';

const ProductList = ({products, onAddToCartHandler, onRemoveFromCartHandler}) =>
    <div>
        <h4>Product List</h4>
        <Table striped bordered condensed hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>{/*empty*/}</th>
            </tr>
            </thead>
            <tbody>
            {
                products.map((item, index) => <ProductTableItem key={index}
                                                                product={item}
                                                                addToCart={onAddToCartHandler}/>)
            }
            </tbody>
        </Table>
    </div>
;

export default ProductList;