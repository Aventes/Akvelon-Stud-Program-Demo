import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';

import {Button} from "react-bootstrap";
import {addProductToCart} from './actions/products';

class ProductTableItem extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        addProductToCart: PropTypes.func.isRequired
    };

    render() {
        return (
            <tr>
                <td>{this.props.product.id}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
                <td>
                    <Button bsStyle="success"
                            onClick={() => this.props.addProductToCart(this.props.product.id)}>
                        Add to Cart
                    </Button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    debugger;
    return {
        addProductToCart: state.cartsReducers.addProductToCart
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    debugger;
    return {
        addProductToCart: (productId) => dispatch(addProductToCart(productId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTableItem);