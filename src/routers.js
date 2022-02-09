import React from 'react'
import { ADMIN_ROUTE,
    DIAGNOSTIC_ROUTE,
    LOGIN_ROUTE,
    APP_ROUTE,
    DIAGNOSTIC_MENU_ROUTE} from "./utils/const";
import Auth from "./pages/auth/Auth";
import Diagnostic from "./pages/diagnostic/Diagnostic";
import DiagnosticMenu from "./pages/diagnostic-menu/DiagnosticMenu";
import Admin from "./pages/admin/Admin";

export const authRouters = [
    {
        path: ADMIN_ROUTE,
        element: <Admin/>
    },
    {
        path: DIAGNOSTIC_MENU_ROUTE,
        element: <DiagnosticMenu/>
    },
    {
        path: DIAGNOSTIC_ROUTE,
        element: <Diagnostic/>
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
    }
]