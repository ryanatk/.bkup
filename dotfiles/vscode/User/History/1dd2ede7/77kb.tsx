import { Dialog as MUIDialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: any;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
}

const Modal = ({
  open = false,
  onClose,
  maxWidth = 'md',
  children,
}: ModalProps) => {
  return (
    <MUIDialog
      open={open}
      keepMounted
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxWidth}
    >
      <div className="tailwind">
        <div className={styles.Modal__Inner}>
          <button
            onClick={onClose}
            className={styles.Modal__CloseButton}
            data-cy="modal-close"
          >
            <CloseIcon fontSize="medium" />
          </button>
          {children}
        </div>
      </div>
    </MUIDialog>
  );
};

export default Modal;
