import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRouters, publicRouters} from "../../routers";

function AppRouter(){
    const isAuth = true
    return(
        <Routes>
            {isAuth &&authRouters.map(({path, element})=>
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