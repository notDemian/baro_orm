// make Express.Response.Locals have a user property type UserToken
import { UserToken } from '@utils/zod'

declare global {
  namespace Express {
    interface Locals {
      user?: UserToken
    }
  }
}
