import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

import {
	GET_ALL_USERS_REQUEST,
	GET_ALL_OPTIONS_USERS_REQUEST,
	CREATE_USER_REQUEST,
	RETRIEVE_USER_REQUEST,
	UPDATE_USER_REQUEST,
	DESTROY_USER_REQUEST,
} from './actionTypes'
import actions from './actions'
import services from './services'


function* getAll({ payload: params }) {
	try {
		const response = yield call(services.getAll, params)
		yield put(actions.getAllSuccess(response))
	} catch (error) {
		yield put(actions.getAllErrors(error))
	}
}

function* getAllOptions({ payload: params }) {
	try {
		const response = yield call(services.getAllOptions, params)
		yield put(actions.getAllOptionsSuccess(response))
	} catch (error) {
		yield put(actions.getAllOptionsErrors(error))
	}
}

function* create({ payload: { data } }) {
	try {
		const response = yield call(services.create, data)
		yield put(actions.createSuccess(response))
	} catch (error) {
		yield put(actions.createErrors(error))
	}
}

function* retrieve({ payload: { id } }) {
	try {
		const response = yield call(services.retrieve, id)
		yield put(actions.retrieveSuccess(response))
	} catch (error) {
		yield put(actions.retrieveErrors(error))
	}
}

function* update({ payload: { id, data } }) {
	try {
		const response = yield call(services.update, id, data)
		yield put(actions.updateSuccess(response))
	} catch (error) {
		yield put(actions.updateErrors(error))
	}
}

function* destroy({ payload: { id } }) {
	try {
		const response = yield call(services.destroy, id)
		yield put(actions.destroySuccess(response))
	} catch (error) {
		yield put(actions.destroyErrors(error))
	}
}

export function* watchUserGetAll() {
	yield takeEvery(GET_ALL_USERS_REQUEST, getAll)
}

export function* watchUserGetAllOptions() {
	yield takeEvery(GET_ALL_OPTIONS_USERS_REQUEST, getAllOptions)
}

export function* watchUserCreate() {
	yield takeEvery(CREATE_USER_REQUEST, create)
}

export function* watchUserRetrieve() {
	yield takeEvery(RETRIEVE_USER_REQUEST, retrieve)
}

export function* watchUserUpdate() {
	yield takeEvery(UPDATE_USER_REQUEST, update)
}

export function* watchUserDestroy() {
	yield takeEvery(DESTROY_USER_REQUEST, destroy)
}

function* sagas() {
	yield all([
		fork(watchUserGetAll),
		fork(watchUserGetAllOptions),
		fork(watchUserCreate),
		fork(watchUserRetrieve),
		fork(watchUserUpdate),
		fork(watchUserDestroy),
	])
}

export default sagas
