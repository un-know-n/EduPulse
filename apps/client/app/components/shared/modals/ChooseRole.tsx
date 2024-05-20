import { FC, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { BiUserCheck } from 'react-icons/bi';
import { baseRoles, TRoles } from '../../auth/config/constants';
import { RoleRadioGroup } from '../inputs/RoleRadioGroup';

interface IProps {
  chooseRole: (role: string) => void;
  title?: string;
}

const defaultChosenRole = baseRoles[0];

export const ChooseRole: FC<IProps> = ({ chooseRole, title }) => {
  const [role, setRole] = useState<TRoles>(defaultChosenRole);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={true}
      onClose={() => 0}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex
            alignItems='center'
            gap={3}>
            <Heading size='lg'>{title || 'Оберіть хто ви'}</Heading>
            <BiUserCheck size={35} />
          </Flex>
        </ModalHeader>

        <ModalBody>
          <RoleRadioGroup
            onChooseRole={(role) => setRole(role as TRoles)}
            defaultChosenRole={defaultChosenRole}
            options={[...baseRoles]}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => chooseRole(role)}
            colorScheme='blue'
            variant='outline'>
            Обрати
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
