//base reducer object that represents all of the state of the application

//import object reducers
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //local storage, use sessionStorage for session storage, see docs

import userReducer from './user/user-reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //redux-persist will persist the cart
}

const rootReducer =  combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer, 
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer); //persistance capabilities
