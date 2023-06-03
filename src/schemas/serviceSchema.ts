import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string().url(),
  type: z.union([z.string(), z.array(z.string())]),
  serviceEndpoint: z.union([
    z.string().url(),
    z.array(z.string().url()),
    z.object({}),
  ]),
})
