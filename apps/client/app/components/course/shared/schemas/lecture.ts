import { object, string } from 'zod';

export type TInitialLectureValues = {
  title: string;
  content: string;
};

export const lectureSchema = object({
  title: string({
    required_error: 'Введіть назву лекції',
  })
    .trim()
    .min(1, {
      message: 'Назва не може бути порожнью',
    })
    .max(64, {
      message: 'Назва занадто довга',
    }),
  content: string({
    required_error: 'Введіть вміст лекції',
  })
    .trim()
    .min(1, {
      message: 'Вміст не може бути порожнім',
    })
    .max(1028, {
      message: 'Вміст занадто довгий',
    }),
});
