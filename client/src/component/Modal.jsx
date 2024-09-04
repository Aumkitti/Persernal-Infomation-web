import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p className="text-center text-gray-700">{message}</p>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
