const setTimeline = (state = null, action) => {
    switch(action.type){
        case 'SET_TIMELINE':
            return action.payload
        default:
            return state;
    }
}

export default setTimeline;