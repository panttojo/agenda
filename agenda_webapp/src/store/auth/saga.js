import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import {
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
} from "./actionTypes"
import actions from "./actions"
import services from "./services"


function* login({ payload: { user } }) {
	try {
		const response = yield call(services.login, user)
		yield put(actions.loginSuccess(response))
	} catch (error) {
		yield put(actions.loginError(error))
	}
}

function* logout({ payload: { user, history } }) {
	try {
		const response = yield call(services.logout, user)
		yield put(actions.logoutSuccess(response))
		history.push("/login")
	} catch (error) {
		yield put(actions.logoutError(error))
	}
}

export function* watchUserLogin() {
	yield takeEvery(LOGIN_REQUEST, login)
}

export function* watchUserLogout() {
	yield takeEvery(LOGOUT_REQUEST, logout)
}

function* saga() {
	yield all([
		fork(watchUserLogin),
		fork(watchUserLogout),
	])
}

export default saga
