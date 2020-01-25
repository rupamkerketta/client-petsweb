const showNav = (state = true, action) => {
    switch(action.type){
        case 'SET_SHOW_NAV_F':
            return false;
        case 'SET_SHOW_NAV_T':
            return true;
        default:
            return state;
    }
}

export default showNav;