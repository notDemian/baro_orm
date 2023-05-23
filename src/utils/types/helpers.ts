import type { RequestHandler } from 'express'
import { QueryFailedError } from 'typeorm'

export type HandleRequest<body = unknown, params = unknown> = RequestHandler<
  params,
  unknown,
  body,
  unknown
>

export type HandleReqWithMulter<
  body = unknown,
  params = unknown
> = HandleRequest<body, params> extends (
  req: infer Req,
  res: infer Res,
  next: infer Next
) => infer Ret
  ? (req: Req & { file: Express.Multer.File }, res: Res, next: Next) => Ret
  : never

export function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

export const queryFailedGuard = (
  err: any
): err is QueryFailedError & { code: string } => err instanceof QueryFailedError
