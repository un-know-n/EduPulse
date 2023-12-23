import React, { ChangeEvent, FC, ForwardedRef, useRef, useState } from 'react';
import { useField } from 'formik';
import {
  AspectRatio,
  Avatar,
  Button,
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  forwardRef,
  Input,
  InputGroup,
} from '@chakra-ui/react';
import { CiImageOn } from 'react-icons/ci';

interface IImageUploadProps extends FormControlProps {
  errorMessage: string[];
  name: string;
}

export type ImageControlProps = FormControlProps & IImageUploadProps;

export const ImageUpload: FC<ImageControlProps> = forwardRef(
  (props: ImageControlProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, label, errorMessage, ...rest } = props;
    const [{ onChange, value: imageValue, ...field }, , { setValue }] =
      useField(name);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imageURL, setImageURL] = useState('');

    const handleClick = () => {
      inputRef.current?.click();
    };

    const handleChange = (value: ChangeEvent<HTMLInputElement>) => {
      const imageValue = value.target?.files?.[0];
      setValue(imageValue);
      setImageURL(
        value.target.files?.[0]
          ? URL.createObjectURL(value.target.files[0])
          : '',
      );
      console.log('VALUE: ', value, 'Image value: ', imageValue);
    };

    return (
      <FormControl
        name={name}
        label={label}
        {...rest}
        {...ref}>
        <InputGroup onClick={handleClick}>
          <Flex
            flexDirection='column'
            textAlign='center'
            alignItems='center'>
            <AspectRatio
              width='48'
              ratio={1}>
              <Avatar
                boxSize='100px'
                src={imageURL}
                icon={<CiImageOn fontSize={70} />}
                mb='10px'
                borderRadius='8px'
              />
            </AspectRatio>
            <Button
              variant={'secondary'}
              {...field}
              leftIcon={<CiImageOn />}
              paddingX={2}>
              {'Завантажте зображення'}
            </Button>
          </Flex>

          <Input
            onChange={handleChange}
            type='file'
            accept={'image/jpeg, image/png, image/jpg'}
            multiple={false}
            id={name}
            ref={inputRef}
            onClick={() => 0}
            hidden
          />
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  },
);

export default ImageUpload;
