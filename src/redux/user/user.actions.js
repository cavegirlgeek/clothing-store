//functions that return objects
//each object is in correct format that action expects


export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER', 
    payload: user
})