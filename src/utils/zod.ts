import { z } from 'zod'

export const z_UserToken = z.object({
  usuId: z.number(),
  dataUser: z.object({
    datId: z.number(),
  }),
})
export type UserToken = z.infer<typeof z_UserToken>
