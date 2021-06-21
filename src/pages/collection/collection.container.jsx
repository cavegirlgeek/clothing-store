import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {compose} from 'redux'; //just makes code more readable, allows to chain functions together.

import {selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading: (state) => !selectIsCollectionsLoaded(state) //will still memoize our selector
});

const CollectionPageContainer = compose (
    connect(mapStateToProps),
    WithSpinner    
)(CollectionPage);

export default CollectionPageContainer;