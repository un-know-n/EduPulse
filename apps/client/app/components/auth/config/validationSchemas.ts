import { string } from 'zod';

const minPasswordLength = 8;
const maxPasswordLength = 32;

export const emailValidator = string({
  required_error: 'Enter your email',
})
  .email('Please enter a valid email')
  .trim();

export const passwordValidator = string({
  required_error: 'Enter password',
})
  .min(minPasswordLength, `Minimum password length is ${minPasswordLength}`)
  .max(maxPasswordLength, `Maximum password length is ${maxPasswordLength}`)
  .refine(
    (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=\S+$).*$/.test(password),
    {
      message:
        'Password must meet the specified criteria (Uppercase, lowercase, digit, no spaces)',
    },
  );
// .refine((password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(password), {
//   message:
//     'Password must contain at least one uppercase letter, one lowercase letter, and one digit',
// });
