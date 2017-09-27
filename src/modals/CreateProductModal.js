import React, {Component} from "react";
import {
    Button,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Modal,
    ModalFooter,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";

class CreateProductModal extends Component {
    constructor(props) {
        super(props);

        this.baseState = this.state = {
            name: '',
            price: '',
            showModal: false
        }
    }

    componentWillUpdate(props) {
        if (this.state.showModal !== props.showModal) {
            this.setState({showModal: props.showModal});
        }
    }

    showModal(event) {
        event.preventDefault();
        this.setState({showModal: true});
    }

    closeModal(event) {
        event.preventDefault();

        this.setState({showModal: false});
        if (this.props.onClose) {
            this.props.onClose()
        }
    }

    onCreate(e) {
        let formData = {
            name: this.state.productNameRef.value || '',
            price: this.state.productPriceRef.value || 0
        };

        this.props.createProductHandler(formData);
        this.closeModal(e);
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <ModalHeader closeButton>
                        <ModalTitle>Create New Product</ModalTitle>
                    </ModalHeader>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup>
                                <Col smOffset={2} sm={3}>
                                    <ControlLabel>Name</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <FormControl id="productName"
                                                 placeholder="Product name"
                                                 inputRef={ref => this.state.productNameRef = ref}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={3}>
                                    <ControlLabel>Price</ControlLabel>
                                </Col>
                                <Col sm={6}>
                                    <FormControl id="productPrice"
                                                 type="number"
                                                 placeholder="Product price"
                                                 inputRef={ref => this.state.productPriceRef = ref}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <ModalFooter>
                        <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Cancel</Button>
                        <Button bsStyle="primary" type="button" onClick={this.onCreate.bind(this)}>Create</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CreateProductModal;
