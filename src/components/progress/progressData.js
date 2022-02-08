import DIAG_DATA from '../../pages/diagnostic/diagData'

//Количество заданий в каждом типе
export const TASKS_COUNT = DIAG_DATA.map(section=>{
    if (section.type === "info"){
        return {name: section.name, title: section.title, count: section.data.length}
    }

    if (section.type === 'tasks'){
        return {name: section.name, title: section.title, count: section.data.reduce((count, elem)=>count + elem.data.length, 0)}
    }
})

