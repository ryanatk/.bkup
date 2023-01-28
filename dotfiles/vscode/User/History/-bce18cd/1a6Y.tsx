import { Skeleton } from '@material-ui/lab';
import Head from 'next/head';
import { ReactElement } from 'react';
import Modal from '../../../sormus/Modal';
import styles from './ContactModal.scss'

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ id, isOpen, onClose }: Props): ReactElement => {
  return (
    <Modal open={isOpen} onClose={onClose} maxWidth="md">
      <Head>{</Head>
      <div id={id} className="business-contact-modal-form">
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
        <Skeleton height={30} width={100} />
        <Skeleton height={50} width={250} />
      </div>
    </Modal>
  );
};

export default ContactModal;