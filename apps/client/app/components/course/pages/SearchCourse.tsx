import { FC } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { levelsDictionary } from '../labels/DifficultyLabel';
import { DefaultButton } from '../../auth/shared/buttons/DefaultButton';
import { Header } from '../../shared/header/Header';

type TProps = {};

export const SearchCourse: FC<TProps> = () => {
  return (
    <Header title={'Пошук курсів'}>
      <Box
        justifyContent='center'
        alignItems='center'
        minHeight='100%'
        minWidth='100%'>
        <Flex
          px='10px'
          mt='2rem'
          justifyContent='center'
          alignItems='center'>
          <Heading textAlign='center'>Знайди свій найкращий курс!</Heading>
        </Flex>

        <Flex
          px='10px'
          mt='2rem'
          flexWrap='wrap'
          justifyContent='center'
          alignItems='center'
          gap={15}>
          <InputGroup maxWidth='400px'>
            <InputLeftElement pointerEvents='none'>
              <FiSearch color='gray' />
            </InputLeftElement>
            <Input placeholder='Назва курсу' />
          </InputGroup>
          <Select w={'fit-content'}>
            {Object.entries(levelsDictionary).map((level) => (
              <option
                key={level[1].text}
                value={level[0]}>
                {level[1].text}
              </option>
            ))}
          </Select>
          <DefaultButton w={'fit-content'}>Пошук</DefaultButton>
        </Flex>
        <Flex
          alignItems='center'
          justifyContent='center'
          mt='8rem'
          px='10px'>
          {/*<NotFindCourses></NotFindCourses>*/}
          {/* <Grid
            templateColumns='repeat(3, 1fr)'
            gap={8}>
            <CourseCard
              title='Курс проагрмировани жотскоки пизд иенмле'
              students={34}
              content={[23, 34, 54]}
              progress={0}
              time='12.1.2001-12.3.3212'
              author='Alex'></CourseCard>

            <CourseCard
              title='Курс проагрмировани жотскоки пизд иенмле'
              students={34}
              content={[23, 34, 54]}
              progress={0}
              time='12.1.2001-12.3.3212'
              author='Alex'></CourseCard>

            <CourseCard
              title='Курс проагрмировани жотскоки пизд иенмле'
              students={34}
              content={[23, 34, 54]}
              progress={0}
              time='12.1.2001-12.3.3212'
              author='Alex'></CourseCard>
          </Grid> */}
        </Flex>
      </Box>
    </Header>
  );
};
