import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import './ModalContext.css';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modals, setModals] = useState([]);

  const showModal = (modal) => {
    setModals(prev => [...prev, modal]);
  };

  const hideModal = () => {
    setModals(prev => prev.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modals.length > 0 && createPortal(
        <div className="modal-container">
          {modals.map((modal, index) => (
            <React.Fragment key={index}>
              {modal}
            </React.Fragment>
          ))}
        </div>,
        document.body
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext); 