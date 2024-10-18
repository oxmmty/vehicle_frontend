import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export default function CustomModal({ title, isOpen, toggle, children }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}
