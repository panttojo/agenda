import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"
import auth from "./auth/reducer"
import users from "./users/reducer"
import customers from "./customers/reducer"
import activities from "./activities/reducer"
import activity_types from "./activity_types/reducer"


const rootReducer = combineReducers({
    Layout,
    auth,
    users,
    customers,
    activities,
    activity_types,
})

export default rootReducer
