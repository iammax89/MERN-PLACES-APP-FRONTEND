import React, { Fragment } from "react";
import "./Modal.scss";
import { CSSTransition } from "react-transition-group";
import { Backdrop } from "../Backdrop/Backdrop";
import { ModalOverlay } from "./ModalOverlay/ModalOverlay";

interface ModalProps {
  show: boolean;
  onCancel: () => void;
  header: string;
  contentClass?: string;
  footerClass?: string;
  footer: JSX.Element;
}
export const Modal: React.FC<ModalProps> = ({
  show,
  onCancel,
  header,
  contentClass,
  footerClass,
  footer,
  children,
}) => {
  return (
    <Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames="modal"
      >
        <ModalOverlay
          header={header}
          contentClass={contentClass}
          footerClass={footerClass}
          footer={footer}
          children={children}
        />
      </CSSTransition>
    </Fragment>
  );
};
