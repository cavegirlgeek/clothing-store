//move the functionality fetch collection asyncs here, using generator style that sagas expect

//sagas function is to run these functions concurrently

//previously started sagas can be cancelled to avoid running same action at same time

import { takeLatest, call,put, all } from "@redux-saga/core/effects"; //listens to every action of a type we pass into it. call calls callback? "put" replaces "dispatch" syntax

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import {fetchCollectionsSuccess, fetchCollectionsFailure} from '../../redux/shop/shop.actions';

import ShopActionTypes from "./shop.types";

export function* fetchCollectionAsync() {
    try {
        const collectionRef = firestore.collection('collections');
        //use a generator function rather than a promise and then functions
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot); //takes function then parameters
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    //pause when ever a specific action types come in
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync); //take latest, fire once,not multipole times
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}