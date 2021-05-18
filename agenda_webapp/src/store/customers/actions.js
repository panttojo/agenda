import {
	GET_ALL_CUSTOMERS_REQUEST,
	GET_ALL_CUSTOMERS_SUCCESS,
	GET_ALL_CUSTOMERS_ERRORS,

	GET_ALL_OPTIONS_CUSTOMERS_REQUEST,
	GET_ALL_OPTIONS_CUSTOMERS_SUCCESS,
	GET_ALL_OPTIONS_CUSTOMERS_ERRORS,

	CREATE_CUSTOMER_REQUEST,
	CREATE_CUSTOMER_SUCCESS,
	CREATE_CUSTOMER_ERRORS,

	RETRIEVE_CUSTOMER_REQUEST,
	RETRIEVE_CUSTOMER_SUCCESS,
	RETRIEVE_CUSTOMER_ERRORS,

	UPDATE_CUSTOMER_REQUEST,
	UPDATE_CUSTOMER_SUCCESS,
	UPDATE_CUSTOMER_ERRORS,

	DESTROY_CUSTOMER_REQUEST,
	DESTROY_CUSTOMER_SUCCESS,
	DESTROY_CUSTOMER_ERRORS,
} from "./actionTypes";


/*----------------------------------------------------------------------
| GET ALL
----------------------------------------------------------------------*/
const getAllRequest = params => {
	return {
		type: GET_ALL_CUSTOMERS_REQUEST,
		payload: params
	}
}

const getAllSuccess = data => {
	return {
		type: GET_ALL_CUSTOMERS_SUCCESS,
		payload: data
	}
}

const getAllErrors = errors => {
	return {
		type: GET_ALL_CUSTOMERS_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| GET ALL OPTIONS
----------------------------------------------------------------------*/
const getAllOptionsRequest = params => ({
	type: GET_ALL_OPTIONS_CUSTOMERS_REQUEST,
	payload: params
})

const getAllOptionsSuccess = data => ({
	type: GET_ALL_OPTIONS_CUSTOMERS_SUCCESS,
	payload: data
})

const getAllOptionsErrors = errors => {
	return {
		type: GET_ALL_OPTIONS_CUSTOMERS_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| CREATE
----------------------------------------------------------------------*/
const createRequest = (data, history) => {
	return {
		type: CREATE_CUSTOMER_REQUEST,
		payload: { data, history }
	}
}

const createSuccess = data => {
	return {
		type: CREATE_CUSTOMER_SUCCESS,
		payload: data
	}
}

const createErrors = errors => {
	return {
		type: CREATE_CUSTOMER_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| RETRIEVE
----------------------------------------------------------------------*/
const retrieveRequest = id => {
	return {
		type: RETRIEVE_CUSTOMER_REQUEST,
		payload: { id }
	}
}

const retrieveSuccess = data => {
	return {
		type: RETRIEVE_CUSTOMER_SUCCESS,
		payload: data
	}
}

const retrieveErrors = errors => {
	return {
		type: RETRIEVE_CUSTOMER_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| UPDATE
----------------------------------------------------------------------*/
const updateRequest = (id, data) => {
	return {
		type: UPDATE_CUSTOMER_REQUEST,
		payload: { id, data }
	}
}

const updateSuccess = data => {
	return {
		type: UPDATE_CUSTOMER_SUCCESS,
		payload: data
	}
}

const updateErrors = errors => {
	return {
		type: UPDATE_CUSTOMER_ERRORS,
		payload: errors
	}
}

/*----------------------------------------------------------------------
| DESTROY
----------------------------------------------------------------------*/
const destroyRequest = id => {
	return {
		type: DESTROY_CUSTOMER_REQUEST,
		payload: { id }
	}
}

const destroySuccess = () => {
	return {
		type: DESTROY_CUSTOMER_SUCCESS,
		payload: {}
	}
}

const destroyErrors = errors => {
	return {
		type: DESTROY_CUSTOMER_ERRORS,
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
