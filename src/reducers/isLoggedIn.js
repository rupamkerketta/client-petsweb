const isLoggedIn = (state = false, action) => {
    switch(action.type){
        case 'LOGGED_IN':
            return !state;
        default:
            return state;
    }
}

export default isLoggedIn;