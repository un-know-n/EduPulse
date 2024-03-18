import { FC, ReactElement } from 'react';
import { Center, Flex, Grid } from '@chakra-ui/react';
import Loading from '../../../../loading';
import { CourseCard } from '../../cards/CourseCard';
import { TCourseWithAuthorResponse } from '../../@types/course';

type TProps = {
  isLoading?: boolean;
  poster: ReactElement;
  courses?: TCourseWithAuthorResponse[];
};

export const CoursesList: FC<TProps> = ({ isLoading, poster, courses }) => {
  if (isLoading) return <Loading />;

  return (
    <Center>
      <Flex
        alignItems='center'
        justifyContent='center'
        maxW='80%'
        mt={5}
        px='10px'>
        {courses?.length ? (
          <Grid
            templateColumns='repeat(2,minmax(450px, 1fr))'
            gap={5}>
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                {...course}
                author={course.user.name}
                progress={
                  course?.UsersAssignedToCourse?.[0]?.isCompleted ? 100 : 0
                }
                enrollment={course?.UsersAssignedToCourse?.[0]}
              />
            ))}
          </Grid>
        ) : (
          poster
        )}
      </Flex>
    </Center>
  );
};
