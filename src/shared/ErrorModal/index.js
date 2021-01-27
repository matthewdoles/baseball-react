import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({
  show,
  onHide,
  title,
  children,
  variant,
  link,
  onClick,
  buttonText,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button className={variant} href={link} onClick={onClick}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
