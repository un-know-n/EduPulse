import { object, string } from 'zod';

export type TInitialSectionValues = {
  title: string;
};

export const sectionSchema = object({
  title: string({
    required_error: 'Введіть назву модуля',
  })
    .trim()
    .min(1, {
      message: 'Назва не може бути порожнью',
    })
    .max(64, {
      message: 'Назва занадто довга',
    }),
});
