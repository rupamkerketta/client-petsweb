import setToken from './setToken';
import isLoggedIn from './isLoggedIn';
import setUser from './setUser';
import setEmail from './setEmail';
import showNav from './showNav';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
        token: setToken,
        loggedIN: isLoggedIn,
        user: setUser,
        userEmail: setEmail,
        showNav: showNav
    });

export default allReducers;