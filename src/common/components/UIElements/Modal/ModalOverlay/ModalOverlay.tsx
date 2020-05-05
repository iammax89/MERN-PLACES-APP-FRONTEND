import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import "./ModalOverlay.scss";

interface ModalOverlayProps {
  className?: string;
  style?: CSSProperties;
  header: string;
  onSubmit?: () => void;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
  footer: JSX.Element;
}
export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  className,
  style,
  headerClass,
  header,
  onSubmit,
  contentClass,
  children,
  footerClass,
  footer,
}) => {
  const modalHook = document.getElementById("modal-hook");
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form
        onSubmit={
          onSubmit
            ? onSubmit
            : (event: React.FormEvent) => event.preventDefault()
        }
      >
        <div className={`modal__content ${contentClass}`}>{children}</div>
        <footer className={`modal__footer  ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );
  if (modalHook) {
    return ReactDOM.createPortal(content, modalHook);
  }
  return null;
};
