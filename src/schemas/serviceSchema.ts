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

export const uniqueServicesSchema = z.array(serviceSchema).refine((services) => {
  const idSet = new Set()
  for (const obj of services) {
    if (idSet.has(obj.id)) {
      return false
    }
    idSet.add(obj.id)
  }
  return true
}, 'Duplicate service.id found. They must be unique')
