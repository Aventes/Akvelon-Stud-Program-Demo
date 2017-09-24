import React from "react";
import {Button} from "react-bootstrap";

const ProductTableItem = ({product, addToCart, removeFromCart}) =>
    <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
            <Button bsStyle="success" onClick={() => addToCart(product)}>Add to Cart</Button>
        </td>
    </tr>
;

export default ProductTableItem;