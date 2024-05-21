import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import { Header as LayoutHeader } from '../../shared/header/Header';
import {
  Center,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  ListItem,
  List,
  Text,
  Flex,
} from '@chakra-ui/react';
import { CourseContentInfo } from '../content/CourseContentInfo';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { FaLock } from 'react-icons/fa';
import { SelectionMaterials } from '../test/SelectionMaterials';
type TProps = {
  headerTitle?: string;
  items: string[];
  subitems: string[][];
};

export const CourseContentLayout: FC<PropsWithChildren<TProps>> = ({
  headerTitle,
  children,
  items,
  subitems,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isSelectionMaterialsOpen, setIsSelectionMaterialsOpen] =
    useState(false);

  return (
    <>
      <LayoutHeader title={headerTitle ?? 'Сторінка матеріалу'} />
      <Button onClick={() => setIsSelectionMaterialsOpen(true)}>
        Вибір матеріалу
      </Button>
      <SelectionMaterials
        isOpen={isSelectionMaterialsOpen}
        onClose={() => setIsSelectionMaterialsOpen(false)}
      />
      <Button
        ref={btnRef}
        colorScheme='teal'
        onClick={onOpen}>
        Список
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Назва курса</DrawerHeader>

          <DrawerBody>
            <List spacing='20px'>
              {items.map((item, index) => (
                <ListItem key={index}>
                  <Text fontWeight='bold'>{`${index + 1}. ${item}`}</Text>
                  <List marginLeft='20px'>
                    {subitems[index].map((subitem, subindex) => (
                      <ListItem key={`${index}.${subindex}`}>
                        <Flex
                          alignItems='center'
                          justifyContent='space-between'>
                          <Text>{`${index + 1}.${
                            subindex + 1
                          }. ${subitem}`}</Text>
                          {subindex === 0 ? (
                            <IoIosCheckmarkCircle color='green' />
                          ) : null}
                          {subindex === 1 ? <FaLock color='gray' /> : null}
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              ))}
            </List>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Center>
        <CourseContentInfo
          courseName='Назва курса буде'
          moduleName='Назва модуля буде'
          materialName='Назва матеріалу буде'
        />
      </Center>
      {children}
    </>
  );
};
