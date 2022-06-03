import DIAG_DATA from '../../pages/diagnostic/diagnosticData'

//Количество заданий в каждом типе
export const TASKS_COUNT = DIAG_DATA.map(section => {
  if (section.type === "info") {
    return {name: section.name, title: section.title, type: section.type, count: section.data.length}
  }

  if (section.type === 'tasks') {
    return {
      name: section.name,
      title: section.title,
      type: section.type,
      count: section.data.reduce((count, elem) => count + elem.data.length, 0)
    }
  }

  if (section.type === 'analysis') {
    return {name: section.name, title: section.title, type: section.type, count: section.options.length}
  }
})

