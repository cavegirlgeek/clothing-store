import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'; //lets us modify our component to access redux-related data
import {auth} from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({currentUser}) => (
    <div className='header'>
        <Link className='logo-container' to="/">
             <img src='../header.png' alt='logo' className='logo' />
        </Link>
        <div className='options'>
            <Link to='/shop' className='option'>
                SHOP
            </Link>
            <Link to='/shop' className='option'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signIn'>SIGN IN</Link>
            }
        </div>
    </div>
)

const mapStateToProps = state => ({ //state = root reducer
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);