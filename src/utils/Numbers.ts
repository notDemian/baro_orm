export const isNumber = (value: unknown): value is number => {
  const parsedValue = Number(value)
  return !isNaN(parsedValue) && typeof parsedValue === 'number'
}
