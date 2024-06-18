import React, { FC, useMemo, useState } from 'react';
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Badge,
} from '@chakra-ui/react';
import { useGetCourseDatesQuery } from 'apps/client/app/store/services/courses';
import { useShowError } from 'apps/client/app/lib/hooks/useShowError';
import Loading from 'apps/client/app/loading';
import { coursePrefix } from 'apps/client/app/config/routing/routes';
import {
  getTransformedImportantDate,
  getRelativeTime,
} from 'apps/client/app/lib/utils/time';

type TProps = {
  courseId: string;
};

export const ProgressDates: FC<TProps> = ({ courseId }) => {
  const { data, error } = useGetCourseDatesQuery(courseId);
  useShowError(error, true, `${coursePrefix}/${courseId}`);

  const stepIndex = useMemo(() => {
    const index = data?.dates.findIndex((date) => !date.isActive) ?? 0;
    return index <= 0 ? data?.dates.length ?? 0 : index;
  }, [data]);

  return (
    <>
      {data ? (
        <Stepper
          index={stepIndex}
          orientation='vertical'
          colorScheme='purple'
          gap='0'>
          {data.dates.map((date, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box
                flexShrink='0'
                minH='75px'>
                <StepTitle>
                  {getTransformedImportantDate(date.date)}{' '}
                  {date.isActive ? (
                    <Badge
                      ml='1'
                      colorScheme='purple'>
                      {getRelativeTime(date.date)}
                    </Badge>
                  ) : null}
                </StepTitle>
                <StepDescription>{date.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      ) : (
        <Loading />
      )}
    </>
  );
};
