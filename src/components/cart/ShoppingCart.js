import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';

import {Button, Col, ControlLabel, FormGroup, Row} from "react-bootstrap";
import CheckoutConfirmation from "../../modals/CheckoutConfirmation";
import {loadAllCartProducts} from './actions/carts'

import {cartCheckoutRequest, removeProductFromCartRequest} from "../../api/cart";
import CartProductList from "./CartProductList";

class ShoppingCart extends Component {
    static propTypes = {
        productsShouldBeReloaded: PropTypes.bool.isRequired, //inner shopping cart proerty from redux
        reloadShoppingCartProducts: PropTypes.bool.isRequired,  //this property comes from ProductContainer
        productsToCart: PropTypes.array.isRequired,
        loadAllCartProducts: PropTypes.func.isRequired,
        reloadAllProducts: PropTypes.func //not required
    };

    constructor(props) {
        super(props);

        this.state = {
            showCheckoutConfirmation: false
        };

        this.props.loadAllCartProducts();

        this.onCheckout = this.onCheckout.bind(this);
        this.calculateAmount = this.calculateAmount.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.renderPanelFooter = this.renderPanelFooter.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.productsShouldBeReloaded && !this.props.productsShouldBeReloaded
        || nextProps.reloadShoppingCartProducts && !this.props.reloadShoppingCartProducts) {
            this.props.loadAllCartProducts();
            this.props.reloadAllProducts()
        }
    }

    calculateTotal() {
        let total = this.props.productsToCart.reduce((total, product) => total + parseFloat(product.price), 0);
        return total + " EUR ";
    }

    calculateAmount() {
        return this.props.productsToCart.length;
    }

    //TODO: Move to redux
    onCheckout() {
        cartCheckoutRequest()
            .then((response) => this.setState({showCheckoutConfirmation: true}))
            .then((response) => this.props.loadAllCartProducts())
    }

    //TODO: Move to redux
    removeProductFromCart(productId) {
        removeProductFromCartRequest(productId)
            .then((response) => this.props.loadAllCartProducts())
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

const mapStateToProps = (state, ownProps) => {
    debugger;
    return {
        productsToCart: state.cartsReducers.products,
        productsShouldBeReloaded: state.cartsReducers.productsShouldBeReloaded
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    debugger;
    return {
        loadAllCartProducts: () => dispatch(loadAllCartProducts())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);