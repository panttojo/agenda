import React from "react"
import { Redirect } from "react-router-dom"


import { Login, Logout } from "../pages/Authentication"
import { Dashboard } from "../pages/Dashboard"


const authProtectedRoutes = [
	{ path: "/dasboard", component: Dashboard },
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
	{ path: "/login", component: Login },
	{ path: "/logout", component: Logout },
]

export { authProtectedRoutes, publicRoutes }
