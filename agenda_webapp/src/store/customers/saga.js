import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

import {
	GET_ALL_CUSTOMERS_REQUEST,
	GET_ALL_OPTIONS_CUSTOMERS_REQUEST,
	CREATE_CUSTOMER_REQUEST,
	RETRIEVE_CUSTOMER_REQUEST,
	UPDATE_CUSTOMER_REQUEST,
	DESTROY_CUSTOMER_REQUEST,
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

export function* watchCustomerGetAll() {
	yield takeEvery(GET_ALL_CUSTOMERS_REQUEST, getAll)
}

export function* watchCustomerGetAllOptions() {
	yield takeEvery(GET_ALL_OPTIONS_CUSTOMERS_REQUEST, getAllOptions)
}

export function* watchCustomerCreate() {
	yield takeEvery(CREATE_CUSTOMER_REQUEST, create)
}

export function* watchCustomerRetrieve() {
	yield takeEvery(RETRIEVE_CUSTOMER_REQUEST, retrieve)
}

export function* watchCustomerUpdate() {
	yield takeEvery(UPDATE_CUSTOMER_REQUEST, update)
}

export function* watchCustomerDestroy() {
	yield takeEvery(DESTROY_CUSTOMER_REQUEST, destroy)
}

function* sagas() {
	yield all([
		fork(watchCustomerGetAll),
		fork(watchCustomerGetAllOptions),
		fork(watchCustomerCreate),
		fork(watchCustomerRetrieve),
		fork(watchCustomerUpdate),
		fork(watchCustomerDestroy),
	])
}

export default sagas
