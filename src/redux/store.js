import {createStore, applyMiddleware} from 'redux'; //middleware added to catch actions and display them, functions that receive actions in and then pass them to root reducer. redux logger library catches action, console logs it and moves action along
import {persistStore} from 'redux-persist'; //cache store depending on config options set below
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

//set up middlewares
const middlewares = [thunk];

if(process.env.NODE_ENV==='development') {
    middlewares.push(logger);  //only run console log for development
}

//function gets a root reducer and return value of applied middlewares
export const store  = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store); //persisted version of our store

export default {store, persistor};