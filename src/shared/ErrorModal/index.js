import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant={props.variant} href={props.link} onClick={props.onClick}>
          {props.buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
