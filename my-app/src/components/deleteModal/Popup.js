import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Popup({ handleDeleteTrue, handleShow, show }) {
    return (
        <Modal show={show} onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleShow}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>{handleDeleteTrue();handleShow();}}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup;