import { useContext } from 'react';
import ModalContext from '../providers/ModalProvider';

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  const { user, openModal, closeModal } = context;

  return { user, openModal, closeModal };
};
