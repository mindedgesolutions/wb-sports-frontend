import { z } from 'zod';

export const authSchema = (captchaText: string) =>
  z.object({
    username: z.string().min(1, 'Username is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
    captchaEnter: z
      .string()
      .min(1, 'Captcha is required')
      .refine((val) => val === captchaText, {
        message: 'Captcha does not match',
      }),
  });
export type AuthSchema = z.infer<ReturnType<typeof authSchema>>;
