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
		case GET_ALL_USERS_REQUEST:
			state = {
				...initialState,
				list: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case GET_ALL_USERS_SUCCESS:
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
		case GET_ALL_USERS_ERRORS:
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
		case GET_ALL_OPTIONS_USERS_REQUEST:
			state = {
				...state,
				options: {
					...state.options,
					loading: true,
					success: false,
				}
			}
			break;
		case GET_ALL_OPTIONS_USERS_SUCCESS:
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
		case GET_ALL_OPTIONS_USERS_ERRORS:
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
		case CREATE_USER_REQUEST:
			state = {
				...state,
				original: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case CREATE_USER_SUCCESS:
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
		case CREATE_USER_ERRORS:
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
		case RETRIEVE_USER_REQUEST:
			state = {
				...state,
				detail: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case RETRIEVE_USER_SUCCESS:
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
		case RETRIEVE_USER_ERRORS:
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
		case UPDATE_USER_REQUEST:
			state = {
				...state,
				edit: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case UPDATE_USER_SUCCESS:
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
		case UPDATE_USER_ERRORS:
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
		case DESTROY_USER_REQUEST:
			state = {
				...state,
				remove: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case DESTROY_USER_SUCCESS:
			state = {
				...state,
				remove: {
					...singleObj,
					loading: false,
					success: true,
				}
			}
			break;
		case DESTROY_USER_ERRORS:
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
