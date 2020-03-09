const setPhone = (state = null, action) => {
    switch(action.type){
        case 'SET_PHONE':
            return action.payload;
        default:
            return state;
    }
}

export default setPhone;