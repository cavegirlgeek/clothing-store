import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {selectCurrentUser} from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions'; 

import {createStructuredSelector} from 'reselect';

class App extends React.Component {

  unsubscribeFromAuth = null

//connected as long as component is mounted:
  componentDidMount() {
    const {checkUserSession} = this.props;
    checkUserSession();
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
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
