import { PublicKeyMultibase } from '../publicKeyMultibase'
import { z } from 'zod'

export const publicKeyMultibaseSchema = z.union([
  z.string(),
  z.custom<PublicKeyMultibase>(
    (publicKeyMultibase) => publicKeyMultibase instanceof PublicKeyMultibase
  ),
])
