import React from "react";
import {Alert, FormGroup, Panel, PanelGroup} from "react-bootstrap";
import CartItem from './CartItem';

const CartProductList = ({productsToCart, onRemoveFromCartHandler, footer: Footer}) => {
    let uniqueProducts = getUniqueProducts(productsToCart);
    return (
        <PanelGroup>
            <Panel collapsible header="Shopping Cart" footer={Footer}>
                <FormGroup>
                    {uniqueProducts.length > 0
                        ? uniqueProducts.map((item, index) =>
                            <CartItem key={index}
                                      product={item}
                                      onRemoveFromCartHandler={onRemoveFromCartHandler}/>
                        )
                        : <Alert bsStyle="info">No products in the cart</Alert>
                    }
                </FormGroup>
            </Panel>
        </PanelGroup>
    )
};

export default CartProductList;


function getUniqueProducts(productsToCart) {
    let uniqProducts = productsToCart.filter(
        (elt, i, a) => i === a.findIndex(elt2 => elt.id === elt2.id)
    );

    //calculate products amount and fill to displayed product list
    return uniqProducts.map(entry => {
        let occurrences = productsToCart.filter(item => item.id === entry.id).length;
        if (occurrences > 1) {
            entry.amount = occurrences;
        } else {
            entry.amount = 1;
        }

        return entry;
    });
}