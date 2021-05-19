import React from "react"
import { Redirect } from "react-router-dom"

import { Login, Logout } from "../pages/Authentication"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import Customers from "../pages/Customers"
import { CalendarView, TableView } from "../pages/Activities"
import ActivityTypes from "../pages/ActivityTypes"


const authProtectedRoutes = [
	{ path: "/dasboard", component: Dashboard },
	{ path: "/vendedores", component: Users },
	{ path: "/clientes", component: Customers },
	{ path: "/calendario-de-actividades", component: CalendarView },
	{ path: "/tabla-de-actividades", component: TableView },
	{ path: "/tipos-de-actividad", component: ActivityTypes },

	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
	{ path: "/login", component: Login },
	{ path: "/logout", component: Logout },
]

export { authProtectedRoutes, publicRoutes }
