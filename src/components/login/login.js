import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import './login.css';

import brandLogo from '../res/images/pawprint-black.png';
import googleIcon from '../res/images/google.png';
import facebookIcon from '../res/images/facebook.png';

const Login = (props) => {

    const dispatch = useDispatch();

    const [loginSuccess, setLoginSuccess] = useState(false);
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    // Show nav
    const [showNav, setShowNav] = useState(false);

    // Cookie
    const [cookie, setCookie, removeCookie] = useCookies();

    // username-onChange
    const usernameOC = (event) =>{
        setUserName(event.target.value);
    }

    // password-onChange
    const passwordOC = (event) => {
        setPassword(event.target.value);
    }

    const redirectRender = () => {
        if(loginSuccess){
            return <Redirect to='/' />
        }
    }

    const loggedIN = useSelector(state => state.loggedIN);

    const loggedBefore = () => {
        if(loggedIN){
            return <Redirect to='/' />
        }
    }

    // Login-Handler
    const loginHandler = () => {
        console.log('[Login-Handler]');
        console.log(`username: ${userName}  password: ${password}`)
        if(userName.length === 0 || password.length === 0){
            console.log('Credentials dae bhsdk!!!');
        }
        else{
            axios.post('http://localhost:5000/login', {
                username: userName,
                password: password
            })
            .then(response => {
                console.log(response.data);
                if(response.data.userFound){
                    console.log('Whooo hooo!!!');
                    setCookie('token', `${response.data.token}`, {path: '/'});
                    setLoginSuccess(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });   
        }      
    }

    // For preventing default form submission
    const formSubmitHandler = (event) => {
        event.preventDefault();
        console.log('[Form-Submit Triggered]');
    }

    useEffect(() => {
        dispatch({type: 'SET_SHOW_NAV_F'});  
        
        return () => {
            dispatch({type: 'SET_SHOW_NAV_T'});
        }

    }, []);
    
    return(
        <div className="petsweb-login" id="petsweb-login">
            {redirectRender()}
            {loggedBefore()}
            <div className="login-container">
                <div className="brand-logo">
                    <Link to="/">
                        <img src={brandLogo} alt="Petsweb"/>
                    </Link>
                    <h3>PETSWEB</h3>
                </div>

                <form onSubmit={formSubmitHandler}>
                    <div className="form username">
                        <input type="text" name="username" autoComplete="off" id="username" required onChange={usernameOC}/>
                        <label htmlFor="username" className="label-name">
                            <span className="content-name">Name</span>
                        </label>
                </div>
                <div className="form password">
                        <input type="password" name="password" autoComplete="off" id="password" required onChange={passwordOC}/>
                        <label htmlFor="username" className="label-name">
                            <span className="content-name">Password</span>
                        </label>
                </div>
                <div className="submit-button">
                    <button type="submit" onClick={loginHandler}>Login</button>

                    <div className="reg-and-pass">
                        <a href="/register">Not a member? Sign-up</a>
                        <a href="/reset-password">Forgot Password</a>
                    </div>
                </div>
                <div className="social-sign-in">
                    <div className="sign-in-content">
                        <h3>Sign in</h3>  
                        <h5>with your social networks</h5>
                        <div className="social-buttons">
                            <button type="button" className="google-login">
                                <img src={googleIcon} alt="Google Sign-In" />
                                <h4 className="social-name">
                                    Google
                                </h4>
                            </button>
                            <button type="button" className="facebook-login">
                                <img src={facebookIcon} alt="Google Sign-In" />
                                <h4 className="social-name">Facebook</h4>
                            </button>
                        </div>
                    </div>
                </div>                    
                </form>
                
            </div>
        </div>
    );
}

export default Login;