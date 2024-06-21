import { object, string, number, array, boolean } from 'zod';

import { getUkrainianPluralWord } from 'apps/client/app/lib/utils/getUkrainianPluralWord';

export type TInitialTestValues = {
  testName: string;
  timeToPass: number;
  totalAttempts: number;
  steps: {
    stepQuestion: string;
    pointsPerQuestion: number;
    isSingleAnswer: boolean;
    answers: string[];
    stepNumber: number;
    correctAnswer: string[];
    active?: boolean;
  }[];
};

export const minTestNameLength = 3;
export const maxTestNameLength = 128;
export const minTimeToPassAmount = 1;
export const maxTimeToPassAmount = 180;
export const minTotalAttempts = 1;
export const maxTotalAttempts = 5;
export const minStepQuestionLength = 5;
export const maxStepQuestionLength = 512;
export const minPointsPerQuestion = 1;
export const maxPointsPerQuestion = 10;
export const minAnswersLength = 1;
export const maxAnswersLength = 200;
export const minCorrectAnswersAmount = 1;
export const minStepsAmount = 1;

export const testSchema = object({
  testName: string({ required_error: 'Введіть назву тесту' })
    .min(minTestNameLength, {
      message: `Назва тесту має містити щонайменше ${minTestNameLength} ${getUkrainianPluralWord(
        'символи',
        minTestNameLength,
      )}`,
    })
    .max(maxTestNameLength, {
      message: `Назва тесту має містити щонайбільше ${maxTestNameLength} ${getUkrainianPluralWord(
        'символи',
        maxTestNameLength,
      )}`,
    }),
  timeToPass: number({
    required_error: 'Введіть кількість хвилин для проходження тесту',
  })
    .min(minTimeToPassAmount, {
      message: `Час для проходження тесту має бути не менше ${minTimeToPassAmount} ${getUkrainianPluralWord(
        'хвилини',
        minTimeToPassAmount,
      )}`,
    })
    .max(maxTimeToPassAmount, {
      message: `Час для проходження тесту має бути не більше ${getUkrainianPluralWord(
        'хвилини',
        maxTimeToPassAmount,
      )}`,
    }),
  totalAttempts: number({
    required_error: 'Введіть кількість спроб для проходження тесту',
  })
    .min(minTotalAttempts, {
      message: `Кількість спроб має бути не менше ${minTotalAttempts}`,
    })
    .max(maxTotalAttempts, {
      message: `Кількість спроб має бути не більше ${maxTotalAttempts}`,
    }),
  steps: array(
    object({
      stepQuestion: string({ required_error: 'Це поле не може бути порожнім' })
        .min(minStepQuestionLength, {
          message: `Питання має містити щонайменше ${minStepQuestionLength} ${getUkrainianPluralWord(
            'символи',
            minStepQuestionLength,
          )}`,
        })
        .max(maxStepQuestionLength, {
          message: `Питання має містити щонайбільше ${maxStepQuestionLength} ${getUkrainianPluralWord(
            'символи',
            maxStepQuestionLength,
          )}`,
        }),
      pointsPerQuestion: number({ required_error: 'Введені некоректні дані' })
        .min(minPointsPerQuestion, {
          message: `Кількість балів за питання має бути не менше ${minPointsPerQuestion}`,
        })
        .max(maxPointsPerQuestion, {
          message: `Кількість балів за питання має бути не більше ${maxPointsPerQuestion}`,
        }),
      isSingleAnswer: boolean(),
      answers: array(
        string({ required_error: 'Заповніть поле відповіді' })
          .min(minAnswersLength, {
            message: `Відповідь має містити щонайменше ${minAnswersLength} ${getUkrainianPluralWord(
              'символи',
              minAnswersLength,
            )}`,
          })
          .max(maxAnswersLength, {
            message: `Відповідь має містити щонайбільше ${maxAnswersLength} ${getUkrainianPluralWord(
              'символи',
              maxAnswersLength,
            )}`,
          }),
      ),
      correctAnswer: array(
        string({
          required_error: 'Повинна бути хоча б одна правильна відповідь',
        }).min(minCorrectAnswersAmount, {
          message: `Повинна бути хоча б одна правильна відповідь`,
        }),
      ).min(
        minCorrectAnswersAmount,
        'Повинна бути хоча б одна правильна відповідь',
      ),
    }).refine(
      (data) => {
        const answers = data.answers;
        return data.correctAnswer.some((answer) => answers.includes(answer));
      },
      {
        message: 'Повинна бути хоча б одна правильна відповідь',
        path: ['correctAnswer'],
      },
    ),
  ).min(minStepsAmount, {
    message: `Має бути щонайменше ${minStepsAmount} ${getUkrainianPluralWord(
      'кроки',
      minStepsAmount,
    )}`,
  }),
});

// export const [minTestNameLength, maxTestNameLength] = [1, 128];
// export const [minTimeToPassAmount, maxTimeToPassAmount] = [10, 120];
// export const [minTotalAttempts, maxTotalAttempts] = [1, 5];
// export const [minStepQuestionLength, maxStepQuestionLength] = [1, 512];
// export const [minPointsPerQuestion, maxPointsPerQuestion] = [1, 10];
// export const [minAnswersLength, maxAnswersLength] = [1, 128];
// export const minCorrectAnswersAmount = 1;

// export const testSchema = object({
//   testName: string({ required_error: 'Введіть назву тесту' })
//     .min(minTestNameLength)
//     .max(maxTestNameLength),
//   timeToPass: number({
//     required_error: 'Введіть кількість хвилин для проходження тесту',
//   })
//     .min(minTimeToPassAmount)
//     .max(maxTimeToPassAmount),
//   totalAttempts: number({
//     required_error: 'Введіть кількість спроб для проходження тесту',
//   })
//     .min(minTotalAttempts)
//     .max(maxTotalAttempts),
//   steps: array(
//     object({
//       stepQuestion: string({ required_error: 'Це поле не може бути порожнім' })
//         .min(minStepQuestionLength)
//         .max(maxStepQuestionLength),
//       pointsPerQuestion: number({ required_error: 'Введені некорректні дані' })
//         .min(minPointsPerQuestion)
//         .max(maxPointsPerQuestion),
//       isSingleAnswer: boolean(),
//       answers: array(
//         string({ required_error: 'Заповніть поле відповіді' })
//           .min(minAnswersLength)
//           .max(maxAnswersLength),
//       ),
//       correctAnswer: array(
//         string({
//           required_error: 'Повинна бути хоча б одна правильна відповідь',
//         }).min(minCorrectAnswersAmount),
//         { required_error: 'Повинна бути хоча б одна правильна відповідь' },
//       ).min(
//         minCorrectAnswersAmount,
//         'Повинна бути хоча б одна правильна відповідь',
//       ),
//     }).refine(
//       (data) => {
//         const answers = data.answers;
//         return data.correctAnswer.some((answer) => answers.includes(answer));
//       },
//       {
//         message: 'Повинна бути хоча б одна правильна відповідь',
//         path: ['correctAnswer'],
//       },
//     ),
//   ),
// });
