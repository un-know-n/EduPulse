import { object, string } from 'zod';

export type TInitialVideoLectureValues = {
  title: string;
  content: string;
  videoUrl: string;
};

export const videoLectureSchema = object({
  title: string({
    required_error: 'Введіть назву відеоматеріалу',
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
  videoUrl: string({
    required_error: 'Введіть посилання на відео',
  })
    .trim()
    .url({ message: 'Некорректне посилання на відео' }),
});
