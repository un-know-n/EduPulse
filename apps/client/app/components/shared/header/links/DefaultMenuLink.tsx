import { Link } from '@chakra-ui/next-js';
import { FC, PropsWithChildren } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

type TProps = {
  href: string;
};

export const DefaultMenuLink: FC<PropsWithChildren<ButtonProps & TProps>> = ({
  href,
  children,
  ...props
}) => {
  return (
    <Button
      as={Link}
      href={href}
      {...props}>
      {children}
    </Button>
  );
};
