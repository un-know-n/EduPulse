import React, { FC, useState } from 'react';
import {
  Text,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Divider,
} from '@chakra-ui/react';
import { IoDocumentText } from 'react-icons/io5';
import { FaFileVideo } from 'react-icons/fa';
import { MdAdsClick } from 'react-icons/md';
import { AddLectureModal } from './AddLectureModal';
import { AddVideoModal } from './AddVideoModal';
import { AddTestModal } from './AddTestModal';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SelectionMaterials: FC<TProps> = ({ isOpen, onClose }) => {
  const [isAddLectureModalOpen, setIsAddLectureModalOpen] = useState(false);
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
  const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Виберіть тип матеріалу</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack alignItems='center'>
              <Box>
                <Flex
                  alignItems='center'
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => setIsAddLectureModalOpen(true)}
                  mb='15px'>
                  <IoDocumentText size='30px' />
                  <Box ml='3'>
                    <Text fontWeight='bold'>Лекція</Text>
                    <Text fontSize='sm'>Текст з форматуванням</Text>
                  </Box>
                </Flex>
                <AddLectureModal
                  isOpen={isAddLectureModalOpen}
                  onClose={() => setIsAddLectureModalOpen(false)}
                />
                <Divider borderWidth='1px' />
                <Flex
                  alignItems='center'
                  mt='15px'
                  mb='15px'
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => setIsAddVideoModalOpen(true)}>
                  <FaFileVideo size='30px' />
                  <Box ml='3'>
                    <Text fontWeight='bold'>Відео</Text>
                    <Text fontSize='sm'>Діліться відео</Text>
                  </Box>
                </Flex>
                <AddVideoModal
                  isOpen={isAddVideoModalOpen}
                  onClose={() => setIsAddVideoModalOpen(false)}
                />
                <Divider borderWidth='1px' />
                <Flex
                  alignItems='center'
                  mt='15px'
                  mb='15px'
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => setIsAddTestModalOpen(true)}>
                  <MdAdsClick size='30px' />
                  <Box ml='3'>
                    <Text fontWeight='bold'>Тест</Text>
                    <Text fontSize='sm'>Виберіть усі відповіді зі списку</Text>
                  </Box>
                </Flex>
                <AddTestModal
                  isOpen={isAddTestModalOpen}
                  onClose={() => setIsAddTestModalOpen(false)}
                />
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
