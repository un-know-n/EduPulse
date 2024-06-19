import React, { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useDisclosure } from '@chakra-ui/react';

const HeaderMenuDrawerContext = createContext({
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
});

export const HeaderMenuDrawerProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HeaderMenuDrawerContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </HeaderMenuDrawerContext.Provider>
  );
};

export const useHeaderMenuDrawer = () => useContext(HeaderMenuDrawerContext);
