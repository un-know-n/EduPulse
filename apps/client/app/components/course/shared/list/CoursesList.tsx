import { FC, ReactElement } from 'react';
import { Center, Flex } from '@chakra-ui/react';
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
    <>
      {courses?.length ? (
        <Flex
          alignItems='center'
          justifyContent='center'
          my={5}
          gap={4}
          flexWrap='wrap'>
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
        </Flex>
      ) : (
        poster
      )}
    </>
  );
};
