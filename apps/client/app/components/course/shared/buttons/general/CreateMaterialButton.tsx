import {
  Button,
  ButtonGroup,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';

import { IoIosAddCircleOutline } from 'react-icons/io';
import { SelectionMaterialsModal } from '../../modals/SelectionMaterialsModal';

type Props = {
  sectionId: string;
};

export const CreateMaterialButton: FC<Props> = ({ sectionId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ButtonGroup
        size='sm'
        isAttached
        onClick={(e: any) => {
          e.stopPropagation();
          onOpen();
        }}
        colorScheme={'purple'}
        variant='outline'>
        <Button>Додати матеріал</Button>
        <IconButton
          aria-label='Add material'
          icon={<IoIosAddCircleOutline />}
        />
      </ButtonGroup>
      <SelectionMaterialsModal
        sectionId={sectionId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
