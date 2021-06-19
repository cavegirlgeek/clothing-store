import React from 'react';
import {connect} from 'react-redux'; //lets us modify our component to access redux-related data
import {createStructuredSelector} from 'reselect';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, LogoContainerImage } from './header.styles';

import {auth} from '../../firebase/firebase.utils';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';



const Header = ({currentUser, hidden}) => (
    <HeaderContainer>
        <LogoContainer to="/">
             <LogoContainerImage src='../header.png' alt='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                :
                <OptionLink to='/signIn'>SIGN IN</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null :
            <CartDropdown />
        }        
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({ //state = root reducer
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);