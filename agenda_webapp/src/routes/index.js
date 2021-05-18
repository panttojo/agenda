import React from "react"
import { Redirect } from "react-router-dom"

import { Login, Logout } from "../pages/Authentication"
import Dashboard from "../pages/Dashboard"
import Users from "../pages/Users"
import Customers from "../pages/Customers"


const authProtectedRoutes = [
	{ path: "/dasboard", component: Dashboard },
	{ path: "/vendedores", component: Users },
	{ path: "/clientes", component: Customers },
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
	{ path: "/login", component: Login },
	{ path: "/logout", component: Logout },
]

export { authProtectedRoutes, publicRoutes }
