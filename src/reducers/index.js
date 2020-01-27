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

const rootReducer = (state, action) => {
    // Clear all data in redux store to initial.
   if(action.type === 'DESTROY_SESSION'){
       state = undefined;
   }
   
   return allReducers(state, action);
}

export default rootReducer;