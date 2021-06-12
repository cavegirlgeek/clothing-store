//functions that return objects
//each object is in correct format that action expects

import {UserActionTypes} from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER, 
    payload: user
})