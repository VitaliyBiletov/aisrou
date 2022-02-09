import React, {useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setUser} from '../../redux/actions/userActions'
import {check} from '../../http/userAPI'
import AppRouter from "./AppRouter";

export default function App(){
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(localStorage.getItem('token')){
      check().then(data=>{
        console.log(data)
        dispatch(setUser(data))
      }).finally(()=>setLoading(false))
    } else{
      setLoading(false)
    }

  }, [])

  if(loading){
    return <div>Загрузка</div>
  }

  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  )
}
