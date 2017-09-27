import React, {Component} from "react";

import {Button, Col, Grid, Row} from "react-bootstrap";
import ProductList from "../components/products/ProductList";
import ShoppingCart from "../components/cart/ShoppingCart";
import CreateProductModal from "../modals/CreateProductModal";

import {addProductToCartRequest, loadShoppingCartProductsRequest} from "../api/cart";
import {loadAllProductsRequest, deleteProductRequest, editProductRequest, createProductRequest} from "../api/products";

class ProductContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            productsToCart: [],
            showCreateModal: false,
            showCheckoutConfirmation: false
        };

        this.loadProductListProducts = this.loadProductListProducts.bind(this);
        this.loadCartProducts = this.loadCartProducts.bind(this);
    }

    componentDidMount() {
        this.loadProductListProducts();
        this.loadCartProducts();
    }

    reloadAllProducts() {
        this.loadProductListProducts();
        this.loadCartProducts();
    }

    loadCartProducts() {
        loadShoppingCartProductsRequest()
            .then((products) => { //successCallback
                this.setState({
                    productsToCart: products
                });

                return null;
            })
            .catch((error) => { //errror callback
                console.error(error);
            });
    }

    loadProductListProducts() {
        loadAllProductsRequest()
            .then((products) => { //successCallback
                this.setState({
                    products: products
                });
                return null;
            })
            .catch((error) => { //errror callback
                console.error(error);
            });
    }

    addToCartHandler(productId) {
        if (productId) {
            addProductToCartRequest(productId)
                .then((response) => this.reloadAllProducts());
        }
    }

    createProductHandler(product) {
        if (product) {
            createProductRequest(product)
                .then((response) => this.reloadAllProducts());
        }
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
                        <ShoppingCart productsToCart={this.state.productsToCart}
                                      reloadAllProducts={this.reloadAllProducts.bind(this)}/>
                    </Col>
                </Row>

                <Button bsStyle="primary" onClick={this.showCreateModal.bind(this)}>Create New Product</Button>

                <CreateProductModal
                    onClose={this.onCloseCreateModal.bind(this)}
                    showModal={this.state.showCreateModal}
                    createProductHandler={this.createProductHandler.bind(this)}/>
            </Grid>
        );
    }
}

export default ProductContainer;