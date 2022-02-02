
//Считает общее количество заполненных упражнений в разделе
export function getCountOfCompleted(result) {
  if (Array.isArray(result)) return result.length
  if (typeof result === 'string' && result.length > 0) return 1
  let count = 0
  for(let i of Object.values(result)){
    count = count + getCountOfCompleted(i)
  }
  return count
}