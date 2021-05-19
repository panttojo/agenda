import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

import {
	GET_ALL_ACTIVITY_TYPES_REQUEST,
	GET_ALL_OPTIONS_ACTIVITY_TYPES_REQUEST,
	CREATE_ACTIVITY_TYPE_REQUEST,
	RETRIEVE_ACTIVITY_TYPE_REQUEST,
	UPDATE_ACTIVITY_TYPE_REQUEST,
	DESTROY_ACTIVITY_TYPE_REQUEST,
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

export function* watchActivityTypeGetAll() {
	yield takeEvery(GET_ALL_ACTIVITY_TYPES_REQUEST, getAll)
}

export function* watchActivityTypeGetAllOptions() {
	yield takeEvery(GET_ALL_OPTIONS_ACTIVITY_TYPES_REQUEST, getAllOptions)
}

export function* watchActivityTypeCreate() {
	yield takeEvery(CREATE_ACTIVITY_TYPE_REQUEST, create)
}

export function* watchActivityTypeRetrieve() {
	yield takeEvery(RETRIEVE_ACTIVITY_TYPE_REQUEST, retrieve)
}

export function* watchActivityTypeUpdate() {
	yield takeEvery(UPDATE_ACTIVITY_TYPE_REQUEST, update)
}

export function* watchActivityTypeDestroy() {
	yield takeEvery(DESTROY_ACTIVITY_TYPE_REQUEST, destroy)
}

function* sagas() {
	yield all([
		fork(watchActivityTypeGetAll),
		fork(watchActivityTypeGetAllOptions),
		fork(watchActivityTypeCreate),
		fork(watchActivityTypeRetrieve),
		fork(watchActivityTypeUpdate),
		fork(watchActivityTypeDestroy),
	])
}

export default sagas
