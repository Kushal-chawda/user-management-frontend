import { z } from 'zod'

export const registerSchema = z.object({

   name: z
      .string()
      .min(3, 'Name minimum 3 characters'),

   email: z
      .string()
      .email('Invalid email'),

   password: z
      .string()
      .min(6, 'Password minimum 6 characters'),

   password_confirmation: z
      .string()

}).refine(

   (data) =>
      data.password ===
      data.password_confirmation,

   {
      message: 'Passwords do not match',

      path: ['password_confirmation']
   }
)