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

  const onModalClose = () => {
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  return (
    <dialog closedby='any' ref={modalRef} className={classes.modal} onClose={onModalClose}>
      {user && <Card user={user} mode='detailed' />}
      <form className={classes.form} method='dialog'>
        <Button label='Close' className={classes.button} type='submit' />
      </form>
    </dialog>
  );
};

export default Modal;
