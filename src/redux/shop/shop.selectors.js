import {createSelector} from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = (state ) => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key]) //convert object to array and map over keys to get the value at that key
)

export const selectCollection = memoize(collectionUrlParam => 
createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
));