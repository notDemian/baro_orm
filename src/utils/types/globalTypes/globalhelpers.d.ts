// make Express.Response.Locals have a user property type UserToken
import { Notification } from '@entitys/Notification'

import { UserToken } from '@utils/zod'

declare global {
  namespace Express {
    interface Locals {
      user?: UserToken
      notifications?: Notification[]
    }
  }
}
