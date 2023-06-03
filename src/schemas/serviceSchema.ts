import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string().url(),
  type: z.string().or(z.array(z.string())),
  serviceEndpoint: z
    .string()
    .url()
    .or(z.array(z.string().url()))
    .or(z.object({})),
})
