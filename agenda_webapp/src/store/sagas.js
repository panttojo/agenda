import { all } from "redux-saga/effects"

import LayoutSaga from "./layout/saga"
import authSaga from "./auth/saga"
import usersSaga from "./users/saga"
import customersSaga from "./customers/saga"
import activitiesSaga from "./activities/saga"
import activityTypesSaga from "./activity_types/saga"


export default function* rootSaga() {
    yield all([
        LayoutSaga(),
        authSaga(),
        usersSaga(),
        customersSaga(),
        activitiesSaga(),
        activityTypesSaga(),
    ])
}
