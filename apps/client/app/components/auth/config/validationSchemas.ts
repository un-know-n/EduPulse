import { string } from 'zod';

const minPasswordLength = 8;
const maxPasswordLength = 32;

export const emailValidator = string({
  required_error: 'Введіть електронну адресу',
})
  .email('Введіть дійсну електронну адресу')
  .trim();

export const passwordValidator = string({
  required_error: 'Введіть пароль',
})
  .min(
    minPasswordLength,
    `Мінімальна довжина пароля повинна бути ${minPasswordLength}`,
  )
  .max(
    maxPasswordLength,
    `Максимальна довжина пароля повинна бути ${maxPasswordLength}`,
  )
  .refine(
    (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=\S+$).*$/.test(password),
    {
      message:
        'Пароль має відповідати наступним критеріям - великі/малі символи, цифри, відсутність пробілів',
    },
  );
