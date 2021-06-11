const INITIAL_STATE = {
    currentState: null
}

//redux store passes the state, or defaults to initial state if state is undefined or null 
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state, 
                currentUser: action.payload
            }
        default:
            return state; //return current state by default 
    }
}

export default userReducer;
