import _ from 'lodash'

//Считает общее количество заполненных упражнений в разделе
export function getCountOfCompleted(data, type) {
  switch (type) {
    case 'info': {
      return Object.values(data).filter(i => i).length
    }
    case 'analysis': {
      return Object.values(Object.values(data.skills)).reduce((sum, current) => {
        let tmp = Object.values(current).includes(true) ? 1 : 0
        return sum + tmp
      }, 0)
    }
    case 'tasks': {
      return _.concat([], ...Object.values(data)).filter(i => Number.isInteger(i.value)).length
    }
    default:
      return 0
  }
}