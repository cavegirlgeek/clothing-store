import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import {selectCollectionForPreview} from './redux/shop/shop.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null

//connected as long as component is mounted:
  componentDidMount() {
    const {setCurrentUser, collectionsArray} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {      

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser( {
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
        
      } else {
        setCurrentUser(userAuth);
        //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})));   
      } 
      
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //close the above subscription to firebase backend
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>     
          <Route exact path='/' component={HomePage}  />
          <Route exact path='/shop' component={ShopPage}  />
          <Route exact path='/signIn' render={() => this.props.currentUser ? (<Redirect to='./' />) : (<SignInAndSignUpPage />)} />
          <Route exact path='/checkout' component={CheckoutPage}  />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
  collectionsArray: selectCollectionForPreview
})

const mapDispatchToProps= dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
