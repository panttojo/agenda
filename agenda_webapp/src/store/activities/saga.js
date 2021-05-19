import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

import {
	GET_ALL_ACTIVITIES_REQUEST,
	GET_ALL_OPTIONS_ACTIVITIES_REQUEST,
	CREATE_ACTIVITY_REQUEST,
	RETRIEVE_ACTIVITY_REQUEST,
	UPDATE_ACTIVITY_REQUEST,
	DESTROY_ACTIVITY_REQUEST,
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

export function* watchActivityGetAll() {
	yield takeEvery(GET_ALL_ACTIVITIES_REQUEST, getAll)
}

export function* watchActivityGetAllOptions() {
	yield takeEvery(GET_ALL_OPTIONS_ACTIVITIES_REQUEST, getAllOptions)
}

export function* watchActivityCreate() {
	yield takeEvery(CREATE_ACTIVITY_REQUEST, create)
}

export function* watchActivityRetrieve() {
	yield takeEvery(RETRIEVE_ACTIVITY_REQUEST, retrieve)
}

export function* watchActivityUpdate() {
	yield takeEvery(UPDATE_ACTIVITY_REQUEST, update)
}

export function* watchActivityDestroy() {
	yield takeEvery(DESTROY_ACTIVITY_REQUEST, destroy)
}

function* sagas() {
	yield all([
		fork(watchActivityGetAll),
		fork(watchActivityGetAllOptions),
		fork(watchActivityCreate),
		fork(watchActivityRetrieve),
		fork(watchActivityUpdate),
		fork(watchActivityDestroy),
	])
}

export default sagas
