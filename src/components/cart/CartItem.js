import React from "react";
import {Col, ControlLabel, FormGroup, Glyphicon, InputGroup} from "react-bootstrap";

const CartItem = ({product, onRemoveFromCartHandler}) =>
    <FormGroup style={{fontWeight: 700, fontSize: "1.1em"}}>
        <Col sm={4} md={4}>
            <ControlLabel>{product.amount > 1 ? product.name + ' x ' + product.amount : product.name}</ControlLabel>
        </Col>
        <InputGroup className="col-md-8 col-sm-8">
            <Col sm={4} md={5}>
                <ControlLabel >{product.price} EUR</ControlLabel>
            </Col>
            <Col sm={5} md={5}>
                {' (Total:'}{product.price * product.amount}{') '}
            </Col>
            <Col sm={1} md={1}>
                <Glyphicon title="Remove from cart" glyph="trash" role="button"
                           onClick={() => onRemoveFromCartHandler(product.id)}/>
            </Col>
        </InputGroup>
    </FormGroup>
;

export default CartItem;