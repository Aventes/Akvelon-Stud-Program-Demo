import React, {Component} from "react";
import {Button, Col, ControlLabel, FormGroup, Row} from "react-bootstrap";

import CheckoutConfirmation from "../../modals/CheckoutConfirmation";
import {cartCheckoutRequest, removeProductFromCartRequest} from "../../api/cart";
import CartProductList from "./CartProductList";

class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCheckoutConfirmation: false
        };

        this.onCheckout = this.onCheckout.bind(this);
        this.calculateAmount = this.calculateAmount.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.renderPanelFooter = this.renderPanelFooter.bind(this);
    }

    calculateTotal() {
        let total = this.props.productsToCart.reduce((total, product) => total + parseFloat(product.price), 0);
        return total + " EUR ";
    }

    calculateAmount() {
        return this.props.productsToCart.length;
    }

    onCheckout() {
        cartCheckoutRequest()
            .then((response) => this.setState({showCheckoutConfirmation: true}))
            .then((response) => this.props.reloadAllProducts())
    }

    removeProductFromCart(productId) {
        removeProductFromCartRequest(productId)
            .then((response) => this.props.reloadAllProducts())
    }

    onCloseCheckoutConfirmation() {
        this.setState({
            showCheckoutConfirmation: false
        })
    }

    render() {
        return (
            <div>
                <CartProductList productsToCart={this.props.productsToCart}
                                 onRemoveFromCartHandler={this.removeProductFromCart.bind(this)}
                                 footer={this.renderPanelFooter()}/>

                <CheckoutConfirmation showModal={this.state.showCheckoutConfirmation}
                                      onClose={this.onCloseCheckoutConfirmation.bind(this)}/>
            </div>
        );
    }

    renderPanelFooter() {
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
                        <Button bsStyle="primary" onClick={this.onCheckout}>Checkout</Button>
                    </Col>
                </FormGroup>
            </Row>
        );
    }
}

export default ShoppingCart;