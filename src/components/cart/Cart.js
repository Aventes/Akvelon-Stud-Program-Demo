import React, {Component} from "react";
import {Alert, Button, Col, ControlLabel, FormGroup, Panel, PanelGroup, Row} from "react-bootstrap";
import CartItem from "./CartItem";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.calculateAmount = this.calculateAmount.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.getUniqueProducts = this.getUniqueProducts.bind(this);
    }

    calculateTotal() {
        let total = this.props.productsToCart.reduce((total, product) => total + parseFloat(product.price), 0);
        return total + " EUR ";
    }

    calculateAmount() {
        return this.props.productsToCart.length;
    }

    render() {
        return <ProductList productsToCart={this.getUniqueProducts()}
                            onRemoveFromCartHandler={this.props.onRemoveFromCartHandler}
                            footer={this.renderFooter()}/>
    }

    getUniqueProducts() {
        let uniqProducts = this.props.productsToCart.filter(
            (elt, i, a) => i === a.findIndex(elt2 => elt.id === elt2.id)
        );

        //calculate products amount and fill to displayed product list
        return uniqProducts.map(entry => {
            let occurrences = this.props.productsToCart.filter(item => item.id === entry.id).length;
            if (occurrences > 1) {
                entry.amount = occurrences;
            } else {
                entry.amount = 1;
            }

            return entry;
        });
    }

    renderFooter() {
        return (
            <Row>
                <FormGroup style={{fontWeight: 700, fontSize: "1.5em", paddingRight: "15px"}}
                           className="pull-right col-sm-6 col-md-7">
                    <Col sm={2} md={3}>
                        <ControlLabel>Total:</ControlLabel>
                    </Col>
                    <Col sm={5} md={5}>
                        {this.calculateTotal()}
                    </Col>
                    <Col sm={2} md={2}>
                        <Button bsStyle="primary" onClick={this.props.onCheckout}>Checkout</Button>
                    </Col>
                </FormGroup>
            </Row>
        );
    }
}

export default Cart;

const ProductList = ({productsToCart, onRemoveFromCartHandler, footer: Footer}) =>
    <PanelGroup>
        <Panel collapsible header="Shopping Cart" footer={Footer}>
            <FormGroup>
                {productsToCart.length > 0
                    ? productsToCart.map((item, index) =>
                        <CartItem key={index}
                                  product={item}
                                  onRemoveFromCartHandler={onRemoveFromCartHandler}/>
                    )
                    : <Alert bsStyle="info">No products in the cart</Alert>
                }
            </FormGroup>
        </Panel>
    </PanelGroup>
;