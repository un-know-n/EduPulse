import { Step } from 'apps/client/app/store/reducers/test.slice';
import { object, string, number, array, boolean } from 'zod';
import { TTestResponse } from '../../@types/course';

export type TInitialTestValues = {
  testName: string;
  timeToPass: number;
  totalAttempts: number;
  steps: Step[];
};

export const [minTestNameLength, maxTestNameLength] = [2, 128];
export const [minTimeToPassAmount, maxTimeToPassAmount] = [10, 120];
export const [minTotalAttempts, maxTotalAttempts] = [1, 5];
export const [minStepQuestionLength, maxStepQuestionLength] = [2, 512];
export const [minPointsPerQuestion, maxPointsPerQuestion] = [1, 10];
export const [minAnswersLength, maxAnswersLength] = [2, 128];
export const minCorrectAnswersAmount = 1;

export const testSchema = object({
  testName: string({ required_error: 'Введіть назву тесту' })
    .min(minTestNameLength)
    .max(maxTestNameLength),
  timeToPass: number({
    required_error: 'Введіть кількість хвилин для проходження тесту',
  })
    .min(minTimeToPassAmount)
    .max(maxTimeToPassAmount),
  totalAttempts: number({
    required_error: 'Введіть кількість спроб для проходження тесту',
  })
    .min(minTotalAttempts)
    .max(maxTotalAttempts),
  steps: array(
    object({
      stepQuestion: string({ required_error: 'Це поле не може бути порожнім' })
        .min(minStepQuestionLength)
        .max(maxStepQuestionLength),
      pointsPerQuestion: number({ required_error: 'Введені некорректні дані' })
        .min(minPointsPerQuestion)
        .max(maxPointsPerQuestion),
      isSingleAnswer: boolean(),
      answers: array(
        string({ required_error: 'Заповніть поле відповіді' })
          .min(minAnswersLength)
          .max(maxAnswersLength),
      ),
      correctAnswer: array(
        string({
          required_error: 'Повинна бути хоча б одна правильна відповідь',
        }).min(minCorrectAnswersAmount),
        { required_error: 'Повинна бути хоча б одна правильна відповідь' },
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
  ),
});
