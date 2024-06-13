import React, { FC } from 'react';
import { MaterialTypes } from '../../config/constants';
import { FaBookBookmark, FaVideo } from 'react-icons/fa6';
import { FaPencilAlt } from 'react-icons/fa';
import { IconBaseProps, IconType } from 'react-icons/lib';

type Props = {
  type: keyof typeof MaterialTypes;
};

export const MaterialIcon: FC<Props & IconBaseProps> = ({ type, ...props }) => {
  switch (type) {
    case 'LECTURE':
      return <FaBookBookmark {...props} />;
    case 'TEST':
      return <FaPencilAlt {...props} />;
    case 'VIDEO':
      return <FaVideo {...props} />;
  }
};
