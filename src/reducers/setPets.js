const setPets = (state = null, action) => {
    switch(action.type){
        case 'SET_PETS':
            return action.payload
        default:
            return state;
    }
}

export default setPets;