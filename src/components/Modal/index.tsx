import { useEffect, useRef } from 'react';
import { useModal } from '../../hooks/useModal';
import Button from '../Button';
import Card from '../Card';
import classes from './styles.module.css';

const Modal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { user, closeModal } = useModal();

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (user) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [user]);

  return (
    <dialog closedby='any' ref={modalRef} className={classes.modal} onClose={closeModal}>
      {user && <Card user={user} mode='detailed' />}
      <Button label='Close' className={classes.button} onClick={closeModal} />
    </dialog>
  );
};

export default Modal;
