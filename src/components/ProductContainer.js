import React, {Component} from "react";

import {Button, Col, Grid, Row} from "react-bootstrap";
import ProductList from "../components/products/ProductList";
import Cart from "../components/cart/Cart";
import CreateProductModal from "../modals/CreateProductModal";
import CheckoutConfirmation from "../modals/CheckoutConfirmation";
import {loadAllProducts} from "../api/cart";

class ProductContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            productsToCart: [],
            showCreateModal: false,
            showCheckoutConfirmation: false
        }
    }

    componentDidMount() {
        loadAllProducts()
            .then((response) => { //successCallback
                let products = response;
                let productsToCart = response.filter(item => item.addedToCart);

                this.setState({
                    products: products,
                    productsToCart: productsToCart
                })
            })
            .catch((error) => { //errror callback
                console.error(error);
            });
    }

    addToCartHandler(product) {
        let newProduct = Object.assign({}, product, {addedToCart: true});

        let productsToCart = this.state.productsToCart.concat(newProduct);

        this.setState({
            productsToCart: productsToCart
        })
    }

    removeFromCartHandler(productId) {
        if (productId) {
            this.setState({
                productsToCart: this.updateProductsToCartList(productId),
                products: this.removeProductFromProductList(productId)
            })
        }
    }

    onCheckout(e) {
        this.setState({
            productsToCart: [],
            showCheckoutConfirmation: true
        });
    }

    showCreateModal(e) {
        this.setState({
            showCreateModal: true
        });
    }

    onCloseCreateModal(e) {
        this.setState({
            showCreateModal: false
        })
    }

    onCloseCheckoutConfirmation() {
        this.setState({
            showCheckoutConfirmation: false
        })
    }

    createProductHandler(e, product) {
        if (product) {
            product.id = this.state.products.length + 1;

            this.setState({
                products: this.state.products.concat(product)
            });
        }
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col md={7}>
                        <ProductList
                            products={this.state.products}
                            onAddToCartHandler={this.addToCartHandler.bind(this)}
                        />
                    </Col>
                    <Col md={5}>
                        <Cart productsToCart={this.state.productsToCart}
                              onCheckout={this.onCheckout.bind(this)}
                              onRemoveFromCartHandler={this.removeFromCartHandler.bind(this)}/>
                    </Col>
                </Row>

                <Button bsStyle="primary" onClick={this.showCreateModal.bind(this)}>Create New Product</Button>

                <CreateProductModal
                    onClose={this.onCloseCreateModal.bind(this)}
                    showModal={this.state.showCreateModal}
                    createProductHandler={this.createProductHandler.bind(this)}/>

                <CheckoutConfirmation showModal={this.state.showCheckoutConfirmation}
                                      onClose={this.onCloseCheckoutConfirmation.bind(this)}/>
            </Grid>
        );
    }

    updateProductsToCartList = (productId) =>
        this.state.productsToCart.filter((item) => item.id !== productId);

    removeProductFromProductList = (productId) =>
        this.state.products.map((item, index) => {
            if (item.id === productId) {
                item.addedToCart = false;
            }
            return item;
        });
}

export default ProductContainer;