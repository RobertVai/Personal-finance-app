import styles from "./Modal.module.css";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};
const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div>
      <div>
        <div>
          <h2>{title}</h2>

          <button onClick={onClose}>X</button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
