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
} from './actionTypes';

const singleObj = {
	loading: false,
	data: {},
	errors: {},
	success: false
}

const initialState = {
	options: { ...singleObj, data: [] },
	list: { ...singleObj },
	original: { ...singleObj },
	detail: { ...singleObj },
	edit: { ...singleObj },
	remove: { ...singleObj },
}

const users = (state = initialState, action) => {
	switch (action.type) {
		/*----------------------------------------------------------------------
		| GET ALL
		----------------------------------------------------------------------*/
		case GET_ALL_CUSTOMERS_REQUEST:
			state = {
				...initialState,
				list: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case GET_ALL_CUSTOMERS_SUCCESS:
			state = {
				...state,
				list: {
					...singleObj,
					data: action.payload,
					loading: false,
					success: true,
				}
			}
			break;
		case GET_ALL_CUSTOMERS_ERRORS:
			state = {
				...state,
				list: {
					...singleObj,
					loading: false,
					errors: action.payload,
					success: false,
				}
			}
			break;

		/*----------------------------------------------------------------------
		| GET ALL OPTIONS
		----------------------------------------------------------------------*/
		case GET_ALL_OPTIONS_CUSTOMERS_REQUEST:
			state = {
				...state,
				options: {
					...state.options,
					loading: true,
					success: false,
				}
			}
			break;
		case GET_ALL_OPTIONS_CUSTOMERS_SUCCESS:
			state = {
				...state,
				options: {
					...state.options,
					data: action.payload,
					loading: false,
					success: true,
				}
			}
			break;
		case GET_ALL_OPTIONS_CUSTOMERS_ERRORS:
			state = {
				...state,
				options: {
					...state.options,
					loading: false,
					errors: action.payload,
					success: false,
				}
			}
			break;

		/*----------------------------------------------------------------------
		| CREATE
		----------------------------------------------------------------------*/
		case CREATE_CUSTOMER_REQUEST:
			state = {
				...state,
				original: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case CREATE_CUSTOMER_SUCCESS:
			state = {
				...state,
				original: {
					...singleObj,
					loading: false,
					data: action.payload,
					success: true,
				}
			}
			break;
		case CREATE_CUSTOMER_ERRORS:
			state = {
				...state,
				original: {
					...singleObj,
					loading: false,
					errors: action.payload,
					success: false,
				}
			}
			break;

		/*----------------------------------------------------------------------
		| RETRIEVE
		----------------------------------------------------------------------*/
		case RETRIEVE_CUSTOMER_REQUEST:
			state = {
				...state,
				detail: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case RETRIEVE_CUSTOMER_SUCCESS:
			state = {
				...state,
				detail: {
					...singleObj,
					loading: false,
					data: action.payload,
					success: true,
				}
			}
			break;
		case RETRIEVE_CUSTOMER_ERRORS:
			state = {
				...state,
				detail: {
					...singleObj,
					loading: false,
					errors: action.payload,
					success: false,
				}
			}
			break;

		/*----------------------------------------------------------------------
		| UPDATE
		----------------------------------------------------------------------*/
		case UPDATE_CUSTOMER_REQUEST:
			state = {
				...state,
				edit: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case UPDATE_CUSTOMER_SUCCESS:
			state = {
				...state,
				edit: {
					...singleObj,
					loading: false,
					data: action.payload,
					success: true,
				}
			}
			break;
		case UPDATE_CUSTOMER_ERRORS:
			state = {
				...state,
				edit: {
					...singleObj,
					loading: false,
					errors: action.payload,
					success: false,
				}
			}
			break;

		/*----------------------------------------------------------------------
		| DESTROY
		----------------------------------------------------------------------*/
		case DESTROY_CUSTOMER_REQUEST:
			state = {
				...state,
				remove: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case DESTROY_CUSTOMER_SUCCESS:
			state = {
				...state,
				remove: {
					...singleObj,
					loading: false,
					success: true,
				}
			}
			break;
		case DESTROY_CUSTOMER_ERRORS:
			state = {
				...state,
				remove: {
					...singleObj,
					loading: false,
					errors: action.payload,
					success: false,
				}
			}
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
}

export default users;
