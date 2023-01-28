import { Skeleton } from '@material-ui/lab';
import { ReactElement } from 'react';
import Modal from '../../../sormus/Modal';
import styles from './ContactModal.module.scss';
import Typ from './Typ';

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ id, isOpen, onClose }: Props): ReactElement => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Typ
        Element="div"
        id={id}
        className={styles['business-contact-modal-form']}
      >
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
      </Typ>
    </Modal>
  );
};

export default ContactModal;
