import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {compose} from 'redux'; //just makes code more readable, allows to chain functions together.

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

const CollectionsOverviewContainer = compose (
    connect(mapStateToProps),
    WithSpinner    
)(CollectionsOverview);

export default CollectionsOverviewContainer;