import {
	GET_ALL_USERS_REQUEST,
	GET_ALL_USERS_SUCCESS,
	GET_ALL_USERS_ERRORS,

	GET_ALL_OPTIONS_USERS_REQUEST,
	GET_ALL_OPTIONS_USERS_SUCCESS,
	GET_ALL_OPTIONS_USERS_ERRORS,

	CREATE_USER_REQUEST,
	CREATE_USER_SUCCESS,
	CREATE_USER_ERRORS,

	RETRIEVE_USER_REQUEST,
	RETRIEVE_USER_SUCCESS,
	RETRIEVE_USER_ERRORS,

	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERRORS,

	DESTROY_USER_REQUEST,
	DESTROY_USER_SUCCESS,
	DESTROY_USER_ERRORS,
} from "./actionTypes";


/*----------------------------------------------------------------------
| GET ALL
----------------------------------------------------------------------*/
const getAllRequest = params => {
	return {
		type: GET_ALL_USERS_REQUEST,
		payload: params
	}
}

const getAllSuccess = data => {
	return {
		type: GET_ALL_USERS_SUCCESS,
		payload: data
	}
}

const getAllErrors = errors => {
	return {
		type: GET_ALL_USERS_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| GET ALL OPTIONS
----------------------------------------------------------------------*/
const getAllOptionsRequest = params => ({
	type: GET_ALL_OPTIONS_USERS_REQUEST,
	payload: params
})

const getAllOptionsSuccess = data => ({
	type: GET_ALL_OPTIONS_USERS_SUCCESS,
	payload: data
})

const getAllOptionsErrors = errors => {
	return {
		type: GET_ALL_OPTIONS_USERS_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| CREATE
----------------------------------------------------------------------*/
const createRequest = (data, history) => {
	return {
		type: CREATE_USER_REQUEST,
		payload: { data, history }
	}
}

const createSuccess = data => {
	return {
		type: CREATE_USER_SUCCESS,
		payload: data
	}
}

const createErrors = errors => {
	return {
		type: CREATE_USER_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| RETRIEVE
----------------------------------------------------------------------*/
const retrieveRequest = id => {
	return {
		type: RETRIEVE_USER_REQUEST,
		payload: { id }
	}
}

const retrieveSuccess = data => {
	return {
		type: RETRIEVE_USER_SUCCESS,
		payload: data
	}
}

const retrieveErrors = errors => {
	return {
		type: RETRIEVE_USER_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| UPDATE
----------------------------------------------------------------------*/
const updateRequest = (id, data) => {
	return {
		type: UPDATE_USER_REQUEST,
		payload: { id, data }
	}
}

const updateSuccess = data => {
	return {
		type: UPDATE_USER_SUCCESS,
		payload: data
	}
}

const updateErrors = errors => {
	return {
		type: UPDATE_USER_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| DESTROY
----------------------------------------------------------------------*/
const destroyRequest = id => {
	return {
		type: DESTROY_USER_REQUEST,
		payload: { id }
	}
}

const destroySuccess = () => {
	return {
		type: DESTROY_USER_SUCCESS,
		payload: {}
	}
}

const destroyErrors = errors => {
	return {
		type: DESTROY_USER_ERRORS,
		payload: errors
	}
}


const actions = {
	getAllRequest,
	getAllSuccess,
	getAllErrors,

	getAllOptionsRequest,
	getAllOptionsSuccess,
	getAllOptionsErrors,

	createRequest,
	createSuccess,
	createErrors,

	retrieveRequest,
	retrieveSuccess,
	retrieveErrors,

	updateRequest,
	updateSuccess,
	updateErrors,

	destroyRequest,
	destroySuccess,
	destroyErrors,
}
export default actions
