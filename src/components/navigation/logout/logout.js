import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useCookies } from 'react-cookie';

const Logout = () => {
    
    const dispatch = useDispatch();
    const loggedIN = useSelector(state => state.loggedIN);
    const [cookie, setCookie, removeCookie] = useCookies();
    useEffect(() => {
        removeCookie('token');
        dispatch({type : 'DESTROY_SESSION'});
    });

    return(
        <div className="msg">
        {!loggedIN ? <Redirect to="/" /> : ""}
            <h2>Logging Out</h2>
        </div>
    );
};

export default Logout;