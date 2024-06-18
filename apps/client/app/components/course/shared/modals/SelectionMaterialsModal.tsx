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
import { LectureForm } from '../forms/LectureForm';
import { DefaultCourseModal } from './DefaultCourseModal';
import { useDisclosure } from '@chakra-ui/react';
import { VideoLectureForm } from '../forms/VideoLectureForm';
import { TestForm } from '../forms/TestForm';

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
};

export const SelectionMaterialsModal: FC<TProps> = ({
  isOpen,
  onClose,
  sectionId,
}) => {
  const {
    isOpen: isLectureModalOpen,
    onOpen: onLectureModalOpen,
    onClose: onLectureModalClose,
  } = useDisclosure();
  const {
    isOpen: isVideoModalOpen,
    onOpen: onVideoModalOpen,
    onClose: onVideoModalClose,
  } = useDisclosure();
  const {
    isOpen: isTestModalOpen,
    onOpen: onTestModalOpen,
    onClose: onTestModalClose,
  } = useDisclosure();

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
                  onClick={onLectureModalOpen}
                  mb='15px'>
                  <IoDocumentText size='30px' />
                  <Box ml='3'>
                    <Text fontWeight='bold'>Лекція</Text>
                    <Text fontSize='sm'>Текст з форматуванням</Text>
                  </Box>
                </Flex>

                <DefaultCourseModal
                  headerTitle='Створіть лекцію'
                  onClose={onLectureModalClose}
                  isOpen={isLectureModalOpen}>
                  <LectureForm
                    sectionId={sectionId}
                    onClose={onLectureModalClose}
                  />
                </DefaultCourseModal>

                <Divider borderWidth='1px' />
                <Flex
                  alignItems='center'
                  mt='15px'
                  mb='15px'
                  _hover={{ cursor: 'pointer' }}
                  onClick={onVideoModalOpen}>
                  <FaFileVideo size='30px' />
                  <Box ml='3'>
                    <Text fontWeight='bold'>Відео</Text>
                    <Text fontSize='sm'>Діліться відео</Text>
                  </Box>
                </Flex>
                <DefaultCourseModal
                  headerTitle='Додайте відео'
                  onClose={onVideoModalClose}
                  isOpen={isVideoModalOpen}>
                  <VideoLectureForm
                    sectionId={sectionId}
                    onClose={onVideoModalClose}
                  />
                </DefaultCourseModal>

                <Divider borderWidth='1px' />
                <Flex
                  alignItems='center'
                  mt='15px'
                  mb='15px'
                  _hover={{ cursor: 'pointer' }}
                  onClick={onTestModalOpen}>
                  <MdAdsClick size='30px' />
                  <Box ml='3'>
                    <Text fontWeight='bold'>Тест</Text>
                    <Text fontSize='sm'>Виберіть відповіді зі списку</Text>
                  </Box>
                </Flex>
                <DefaultCourseModal
                  headerTitle='Додайте тестування'
                  onClose={onTestModalClose}
                  isOpen={isTestModalOpen}>
                  <TestForm
                    sectionId={sectionId}
                    onClose={onTestModalClose}
                  />
                </DefaultCourseModal>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
