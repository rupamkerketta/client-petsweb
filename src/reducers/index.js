import setToken from './setToken';
import isLoggedIn from './isLoggedIn';
import setUser from './setUser';
import setEmail from './setEmail';
import showNav from './showNav';
import timeline from './setTimeline';
import setPets from './setPets';
import setBio from './setBio';
import setPhone from './setPhone';
import setAdd from './setAdd';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
	token: setToken,
	loggedIN: isLoggedIn,
	user: setUser,
	userEmail: setEmail,
	showNav: showNav,
	timeline: timeline,
	pets: setPets,
	phone: setPhone,
	bio: setBio,
	address: setAdd
});

const rootReducer = (state, action) => {
	// Clear all data in redux store to initial.
	if (action.type === 'DESTROY_SESSION') {
		state = undefined;
	}

	return allReducers(state, action);
};

export default rootReducer;
