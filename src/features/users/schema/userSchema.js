import { z } from 'zod'

export const userSchema = z.object({

   name: z
      .string()
      .min(3, 'Name minimum 3 characters'),

   email: z
      .string()
      .email('Invalid email'),

   password: z
      .string()
      .min(6, 'Password minimum 6 characters')
})