import { FC } from 'react';
import {
  Alert,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';

interface IProps extends AlertProps {
  text: string;
}

const AuthAlert: FC<IProps> = ({ text }) => {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert
      status='error'
      justifyContent='space-between'>
      <Flex>
        <AlertIcon />
        <Box>
          <AlertTitle>{text}</AlertTitle>
        </Box>
      </Flex>

      <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : null;
};

export default AuthAlert;
