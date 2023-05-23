import { User } from '@entitys/User'

export async function getBalance(
  userId: number
): Promise<
  [balance: number | undefined, error?: string, user?: User | undefined]
> {
  const user = await User.findOne({
    where: { usuId: userId },
    relations: {
      dataUser: true,
    },
  })

  console.log({ userId })
  console.log({ user })

  if (!user) return [undefined, 'Usuario no encontrado']

  return [user.dataUser.datBalance, undefined, user]
}
