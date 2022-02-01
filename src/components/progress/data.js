import LEXIC_DATA from '../../pages/diag/sections/lexis/lexisData'
import SENSMOTOR_DATA from '../../pages/diag/sections/sensmotor/sensmotorData'
import GRAMMATIC_DATA from '../../pages/diag/sections/grammatic/grammaticData'
import STATE_OF_FUNC_DATA from '../../pages/diag/sections/stateFunc/Fields'

let DATA = [
    {name: "stateOfFunc", title:"Состояние функций", data: STATE_OF_FUNC_DATA},
    {name: "sensMotor", title:"Сенсо-моторный уровень", data: SENSMOTOR_DATA},
    {name: "grammatic", title:"Грамматика", data: GRAMMATIC_DATA},
    {name: "lexis", title:"Лексика", data: LEXIC_DATA},
]

export const SECTIONS_DATA = DATA.map(section=>{
    const sectionCount = section.data.reduce(
      (count, elem)=>count + elem.data.length, 0)
    return {name: section.name, title: section.title, sectionCount: sectionCount}
})
