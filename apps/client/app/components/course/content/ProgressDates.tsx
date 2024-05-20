import React, { FC, useState } from 'react';
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

type TProps = {
  moduleName: string[];
  date: string[];
};

export const ProgressDates: FC<TProps> = ({ moduleName, date }) => {
  const steps = [
    { title: date[0], description: 'Курс розпочато' },
    { title: date[1], description: `${moduleName[0]} завершено` },
    { title: date[2], description: `${moduleName[1]} завершено` },
    { title: date[3], description: 'Курс закінчено' },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <Stepper
      index={activeStep}
      orientation='vertical'
      colorScheme='purple'
      h='300px'
      gap='0'>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>
              {step.title}{' '}
              {index === 1 && (
                <Badge
                  ml='1'
                  colorScheme='purple'>
                  Сьогодні
                </Badge>
              )}
            </StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};
