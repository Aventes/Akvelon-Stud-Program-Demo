import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';

import {Button, Col, Grid, Row} from "react-bootstrap";
import ProductList from "../components/products/ProductList";
import ShoppingCart from "../components/cart/ShoppingCart";
import CreateProductModal from "../modals/CreateProductModal";

import {loadAllProducts} from './products/actions/products';
import {loadShoppingCartProductsRequest} from "../api/cart";
import {createProductRequest} from "../api/products";

class ProductContainer extends Component {
    static propTypes = {
        loadAllProducts: PropTypes.func.isRequired,
        productsShouldBeReloaded: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            showCreateModal: false,
            showCheckoutConfirmation: false,
            reloadShoppingCartProducts: false
        };

        this.loadProductListProducts = this.loadProductListProducts.bind(this);
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.productsShouldBeReloaded && !this.props.productsShouldBeReloaded) {
            debugger;
            this.reloadAllProducts();

            this.setState({
                reloadShoppingCartProducts: true
            })
        }
    }

    componentDidMount() {
        this.props.loadAllProducts();
    }

    reloadAllProducts() {
        this.props.loadAllProducts();
        this.setState({
            reloadShoppingCartProducts: false
        })
    }

    loadProductListProducts() {
        this.props.loadAllCartProducts();
    }

    //TODO: Move to redux
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
                        <ProductList products={this.props.products}/>
                    </Col>
                    <Col md={5}>
                        <ShoppingCart reloadAllProducts={this.reloadAllProducts.bind(this)}
                                      reloadShoppingCartProducts={this.state.reloadShoppingCartProducts}/>
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

const mapStateToProps = (state, ownProps) => {
    debugger;
    return {
        products: state.productsReducers.products,
        productsShouldBeReloaded: state.productsReducers.productsShouldBeReloaded
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    debugger;
    return {
        loadAllProducts: () => dispatch(loadAllProducts())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);