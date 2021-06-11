import {createStore, applyMiddleware} from 'redux'; //middleware added to catch actions and display them, functions that receive actions in and then pass them to root reducer. redux logger library catches action, console logs it and moves action along

import logger from 'redux-logger';

import rootReducer from './root-reducer';

//set up middlewares
const middlewares = [logger];

//function gets a root reducer and return value of applied middlewares
const store  = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;