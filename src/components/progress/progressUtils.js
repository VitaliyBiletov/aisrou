import _ from 'lodash'
//Считает общее количество заполненных упражнений в разделе
export function getCountOfCompleted(data, type) {
  switch (type){
    case 'info':{
      return Object.values(data).filter(i=>i).length
    }
    case 'analysis':{
      return Object.values(data.skills).includes(true) ? 1 : 0
    }
    case 'tasks':{
      return getCountOfTasks(data)
    }
    default: return 0
  }
}

function getCountOfTasks(data) {
  let count = 0
  count = _.concat([],...Object.values(data)).filter(i=>i.value).length
  // const count = Object.values(data).reduce((previousValue, currentValue)=> previousValue + currentValue.length, 0)
  return count
}