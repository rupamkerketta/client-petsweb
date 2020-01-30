import React from 'react';
import { NavLink, Route, Switch, Link} from 'react-router-dom';
import './navigation.css';
import brandLogo from '../res/images/pawprint-white.png';
import downArrow from '../res/images/down-arrow.png';
import { useSelector } from 'react-redux';

// Route components
import Home from './home-page/homePage';
import Dogs from './dogs/dogs';
import Cats from './cats/cats';
import User from './user/user';

import Logout from './logout/logout';

// Footer
import Footer from './footer/footer';

const Navigation = (props) => {

    const loggedIn = useSelector(state => state.loggedIN);
    const userName = useSelector(state => state.user);

    const styleBL = {
        textDecoration: 'none'
    };

    return(
        <div>

            <nav className="navigation">
                <Link to="/" style={styleBL}>
                    <div className="brand-logo">
                        <img src={brandLogo} className="brand-logo-img" alt="Petsweb"/>
                        <h2>PETSWEB</h2>
                    </div>
                </Link>
                <ul className="nav-items">  
                    {/* <li>
                        <NavLink activeClassName="active-nav-link" to="/">
                            <span className="nav-item">HOME</span>
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink activeClassName="active-nav-link" to="/projects" className="nav-item">
                            <span>MODULES</span>
                            {/* PROJECTS */}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-nav-link" to="/about" className="nav-item">
                            <span>ABOUT</span>
                            {/* ABOUT */}
                        </NavLink>
                    </li>
    
                    {
                        loggedIn ? 
                                <li>
                                        <button className="petsweb-user">
                                                {userName}
                                                <img src={downArrow} alt=""/>
                                        </button>
                                        <ul className="petsweb-user-list">
                                            <li>
                                                <NavLink to={`/user`}>
                                                    Profile
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={"/logout"}>
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>            
                                </li>
                             :
                                <li>
                                    <NavLink to="/login">
                                        LOGIN
                                    </NavLink>        
                                </li> 
                    }
                </ul>
            </nav>
            <Switch>
                <Route path="/dogs" component={Dogs} />
                <Route path="/cats" component={Cats} />
                <Route path="/user" component={User} />
                <Route path="/logout" component={Logout} />
            </Switch>
            {/* <Footer /> */}
        </div>
    );
};

export default Navigation;