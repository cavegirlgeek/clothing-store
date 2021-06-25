import UserActionTypes from './user.types';
 
const INITIAL_STATE = {
    currentState: null,
    error: null
}

//redux store passes the state, or defaults to initial state if state is undefined or null 
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state, 
                currentUser: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state, 
                currentUser: null,
                error: null
            }        
        case UserActionTypes.SIGN_IN_FAILURE: 
        case UserActionTypes.SIGN_OUT_FAILURE: 
        case UserActionTypes.SIGN_UP_FAILURE: 
            return {
                ...state,
                error: action.payload
            }
        default:
            return state; //return current state by default 
    }
}

export default userReducer;
