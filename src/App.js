import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import './App.css';

import Navigation from './components/navigation/navigation';
import Home from './components/navigation/home-page/homePage';
import Login from './components/login/login';
import PetProfile from './components/navigation/pet-profile/pet-profile';

import axios from 'axios';

// Footer
import Footer from './components/navigation/footer/footer';

function App() {
  const [cookie, setCookie, removeCookie] = useCookies();

  const dispatch = useDispatch();
  // If the user has already logged-in
  // The next time he/she returns back to the site
  // loggedIn value is set to 'true'
  const disLog = () => {
    dispatch({type: 'LOGGED_IN'});
  }

  // token
  const disToken = (tkn) => {
    dispatch({type: 'SET_TOKEN', payload: tkn});
  }

  // user-name
  const disUser = (user) => {
    dispatch({type: 'SET_USER', payload: user});
  }

  // user-email
  const disEmail = (userEmail) => {
    dispatch({type: 'SET_EMAIL', payload: userEmail});
  }

  useEffect(() =>{
    if(cookie.token){
      console.log('Cookie found!!');
      console.log(cookie.token);

      // Send token to the server
      axios.defaults.headers.post['authorization'] = `Bearer ${cookie.token}`; // For all posts requests
      axios.post('http://localhost:5000/user')
            .then(response => {
                console.log(response.data.authData);
                disLog(); // Login-status
                disToken(cookie.token);
                disUser(response.data.authData.username); // Username
                disEmail(response.data.authData.email); // User-Email
            })
            .catch((error) => {
                console.log(error);
            });
    }
    else{
      console.log('Cookie not found :(');
    }
  }, [cookie]);
  
  const showNav = useSelector(state => state.showNav);

  return (
    <Router>
      <div className="root-container">
        {
          showNav ? <Navigation /> : ''
        }
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/pets/:id" component={PetProfile} />
        </Switch>
      <Footer />
      </div>
    </Router>
  );
}

export default App;