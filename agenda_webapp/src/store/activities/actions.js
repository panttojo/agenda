import {
	GET_ALL_ACTIVITIES_REQUEST,
	GET_ALL_ACTIVITIES_SUCCESS,
	GET_ALL_ACTIVITIES_ERRORS,

	GET_ALL_OPTIONS_ACTIVITIES_REQUEST,
	GET_ALL_OPTIONS_ACTIVITIES_SUCCESS,
	GET_ALL_OPTIONS_ACTIVITIES_ERRORS,

	CREATE_ACTIVITY_REQUEST,
	CREATE_ACTIVITY_SUCCESS,
	CREATE_ACTIVITY_ERRORS,

	RETRIEVE_ACTIVITY_REQUEST,
	RETRIEVE_ACTIVITY_SUCCESS,
	RETRIEVE_ACTIVITY_ERRORS,

	UPDATE_ACTIVITY_REQUEST,
	UPDATE_ACTIVITY_SUCCESS,
	UPDATE_ACTIVITY_ERRORS,

	DESTROY_ACTIVITY_REQUEST,
	DESTROY_ACTIVITY_SUCCESS,
	DESTROY_ACTIVITY_ERRORS,
} from "./actionTypes";


/*----------------------------------------------------------------------
| GET ALL
----------------------------------------------------------------------*/
const getAllRequest = params => {
	return {
		type: GET_ALL_ACTIVITIES_REQUEST,
		payload: params
	}
}

const getAllSuccess = data => {
	return {
		type: GET_ALL_ACTIVITIES_SUCCESS,
		payload: data
	}
}

const getAllErrors = errors => {
	return {
		type: GET_ALL_ACTIVITIES_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| GET ALL OPTIONS
----------------------------------------------------------------------*/
const getAllOptionsRequest = params => ({
	type: GET_ALL_OPTIONS_ACTIVITIES_REQUEST,
	payload: params
})

const getAllOptionsSuccess = data => ({
	type: GET_ALL_OPTIONS_ACTIVITIES_SUCCESS,
	payload: data
})

const getAllOptionsErrors = errors => {
	return {
		type: GET_ALL_OPTIONS_ACTIVITIES_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| CREATE
----------------------------------------------------------------------*/
const createRequest = (data, history) => {
	return {
		type: CREATE_ACTIVITY_REQUEST,
		payload: { data, history }
	}
}

const createSuccess = data => {
	return {
		type: CREATE_ACTIVITY_SUCCESS,
		payload: data
	}
}

const createErrors = errors => {
	return {
		type: CREATE_ACTIVITY_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| RETRIEVE
----------------------------------------------------------------------*/
const retrieveRequest = id => {
	return {
		type: RETRIEVE_ACTIVITY_REQUEST,
		payload: { id }
	}
}

const retrieveSuccess = data => {
	return {
		type: RETRIEVE_ACTIVITY_SUCCESS,
		payload: data
	}
}

const retrieveErrors = errors => {
	return {
		type: RETRIEVE_ACTIVITY_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| UPDATE
----------------------------------------------------------------------*/
const updateRequest = (id, data) => {
	return {
		type: UPDATE_ACTIVITY_REQUEST,
		payload: { id, data }
	}
}

const updateSuccess = data => {
	return {
		type: UPDATE_ACTIVITY_SUCCESS,
		payload: data
	}
}

const updateErrors = errors => {
	return {
		type: UPDATE_ACTIVITY_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| DESTROY
----------------------------------------------------------------------*/
const destroyRequest = id => {
	return {
		type: DESTROY_ACTIVITY_REQUEST,
		payload: { id }
	}
}

const destroySuccess = () => {
	return {
		type: DESTROY_ACTIVITY_SUCCESS,
		payload: {}
	}
}

const destroyErrors = errors => {
	return {
		type: DESTROY_ACTIVITY_ERRORS,
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
