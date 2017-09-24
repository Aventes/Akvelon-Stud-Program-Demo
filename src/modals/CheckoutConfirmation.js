import React, {Component} from "react";
import {Button, Modal, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";

class CheckoutConfirmation extends Component {
    constructor(props) {
        super(props);

        this.state = {
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

        if(this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <ModalHeader closeButton>
                        <ModalTitle>Payment confirmed</ModalTitle>
                    </ModalHeader>
                    <Modal.Body>
                        All products were sold successfully!
                    </Modal.Body>
                    <ModalFooter>
                        <Button bsStyle="default" onClick={this.closeModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CheckoutConfirmation;
