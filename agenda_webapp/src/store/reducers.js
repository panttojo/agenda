import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"
import auth from "./auth/reducer"
import users from "./users/reducer"
import customers from "./customers/reducer"


const rootReducer = combineReducers({
    Layout,
    auth,
    users,
    customers,
})

export default rootReducer
