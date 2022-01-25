import React, {useState ,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {getCountOfCompleted} from './selectors'
import LexicData from '../../pages/diag/sections/lexis/lexisData'
import SensmotorData from '../../pages/diag/sections/sensmotor/sensmotorData'
import grammaticData from '../../pages/diag/sections/grammatic/grammaticData'
import Fields from '../../pages/diag/sections/stateFunc/Fields'
import './style.sass'

const sectionsData = [LexicData, SensmotorData, grammaticData]

export default function Progress(){
  const dataOfSubsections = useSelector((state)=> state.diag.subsections)
  const count = getCountOfCompleted(dataOfSubsections)
  const [countAll, setCountAll] = useState(0)
  useEffect(()=>{
    let c = 0
    sectionsData.forEach(s=>{
      s.forEach(d=>c = c + d.data.length)
    })
    setCountAll(c + Fields.length)
    },[])
  const countOfPercent = count && countAll ? count/countAll * 100 : 0
  return(
    <div className="progress">
      <span>Прогресс заполнения: </span>
      <progress className="progress__bar" max={countAll} value={count} title={`${countOfPercent.toFixed(2)}%`}/>
    </div>
  )
}

function getCountAll(arr){

}


