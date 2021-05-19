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
		case GET_ALL_ACTIVITIES_REQUEST:
			state = {
				...initialState,
				list: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case GET_ALL_ACTIVITIES_SUCCESS:
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
		case GET_ALL_ACTIVITIES_ERRORS:
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
		case GET_ALL_OPTIONS_ACTIVITIES_REQUEST:
			state = {
				...state,
				options: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case GET_ALL_OPTIONS_ACTIVITIES_SUCCESS:
			state = {
				...state,
				options: {
					...singleObj,
					data: action.payload,
					loading: false,
					success: true,
				}
			}
			break;
		case GET_ALL_OPTIONS_ACTIVITIES_ERRORS:
			state = {
				...state,
				options: {
					...singleObj,
					loading: false,
					errors: action.payload,
					success: false,
				}
			}
			break;

		/*----------------------------------------------------------------------
		| CREATE
		----------------------------------------------------------------------*/
		case CREATE_ACTIVITY_REQUEST:
			state = {
				...state,
				original: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case CREATE_ACTIVITY_SUCCESS:
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
		case CREATE_ACTIVITY_ERRORS:
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
		case RETRIEVE_ACTIVITY_REQUEST:
			state = {
				...state,
				detail: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case RETRIEVE_ACTIVITY_SUCCESS:
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
		case RETRIEVE_ACTIVITY_ERRORS:
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
		case UPDATE_ACTIVITY_REQUEST:
			state = {
				...state,
				edit: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case UPDATE_ACTIVITY_SUCCESS:
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
		case UPDATE_ACTIVITY_ERRORS:
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
		case DESTROY_ACTIVITY_REQUEST:
			state = {
				...state,
				remove: {
					...singleObj,
					loading: true,
					success: false,
				}
			}
			break;
		case DESTROY_ACTIVITY_SUCCESS:
			state = {
				...state,
				remove: {
					...singleObj,
					loading: false,
					success: true,
				}
			}
			break;
		case DESTROY_ACTIVITY_ERRORS:
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
