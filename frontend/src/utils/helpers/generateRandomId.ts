export const generateRandomId = () => {
  const RANGE = 50
  const { floor, random } = Math
  return floor(random() * RANGE)
}
