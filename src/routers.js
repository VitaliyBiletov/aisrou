import React from 'react'
import {ADMIN_ROUTE, DIAGNOSTIC_ROUTE, LOGIN_ROUTE, APP_ROUTE} from "./utils/consts";
import Auth from "./pages/auth/Auth";
import Diag from "./pages/diag/Diag";
import Admin from "./pages/admin/Admin";

export const authRouters = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    }
]

export const publicRouters = [
    {
        path: APP_ROUTE,
        element: <Auth/>
    },
    {
        path: LOGIN_ROUTE,
        element: <Auth/>
    },
    {
        path: DIAGNOSTIC_ROUTE,
        element: <Diag/>
    }
]