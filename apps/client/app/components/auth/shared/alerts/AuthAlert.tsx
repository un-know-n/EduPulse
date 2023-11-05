import { FC } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';

interface IProps extends AlertProps {
  title: string;
  description: string;
}

const AuthAlert: FC<IProps> = ({ description, title, status }) => {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert
      status={status}
      justifyContent='space-between'>
      <Flex>
        <AlertIcon />
        <Box>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
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
