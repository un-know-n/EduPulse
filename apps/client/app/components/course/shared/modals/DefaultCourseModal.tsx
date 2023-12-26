import { FC, useRef } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';

export const DefaultCourseModal: FC<
  ModalProps & {
    headerTitle: string;
  }
> = ({ headerTitle, ...props }) => {
  const initialRef = useRef(null);

  return (
    <Modal
      initialFocusRef={initialRef}
      blockScrollOnMount
      {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
