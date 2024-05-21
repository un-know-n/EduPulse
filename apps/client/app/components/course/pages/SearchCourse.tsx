import { Center } from '@chakra-ui/react';
import { FC } from 'react';
import { Header } from '../../shared/header/Header';
import { Search } from '../search/Search';

export const SearchCourse: FC = () => {
  return (
    <Header title={'Пошук курсів'}>
      <Center>
        <Search />
      </Center>
    </Header>
  );
};
