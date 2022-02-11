import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {adminRouters, authRouters, publicRouters} from "../../routers";

function AppRouter(){
  const {isAuth, role} = useSelector(state=>state.user)
  console.log(isAuth)
  return(
      <Routes>
          {isAuth && role === "ADMIN" && adminRouters.map(({path, element})=>
            <Route key={path} path={`${path}`} element={element} />
          )}
          {isAuth && authRouters.map(({path, element})=>
              <Route key={path} path={path} element={element} />
          )}
          {publicRouters.map(({path, element})=>
              <Route key={path} path={path} element={element} />
          )}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
      </Routes>
  )
}

export default AppRouter