import React from 'react';
import { NavLink, Route, Switch, Link } from 'react-router-dom';
import './navigation.css';
import brandLogo from '../res/images/pawprint-white.png';
import downArrow from '../res/images/down-arrow.png';
import { useSelector } from 'react-redux';

// Route components
import Home from './home-page/homePage';
import Dogs from './dogs/dogs';
import Cats from './cats/cats';
import User from './user/user';
import Rescue from './rescue/rescue';

import Logout from './logout/logout';

// Footer
import Footer from './footer/footer';

// Proxy
import proxy from '../../proxy/proxy';

const Navigation = (props) => {
	const loggedIn = useSelector((state) => state.loggedIN);
	const userName = useSelector((state) => state.user);
	const email = useSelector((state) => state.userEmail);
	const emailSplit = email.split('@')[0];
	// const [sideBar, setSideBar] = useState(false);

	const handleBurger = () => {
		const burger = document.querySelector('.burger');
		const sideNav = document.querySelector('.nav-items');
		const line = document.querySelector('.line');
		const glass = document.querySelector('.glass');

		sideNav.classList.toggle('slide');
		burger.classList.toggle('active');
		line.classList.toggle('vanish');
		glass.classList.toggle('show');
	};

	const styleBL = {
		textDecoration: 'none'
	};

	return (
		<div>
			<nav className="navigation">
				<Link to="/" style={styleBL}>
					<div className="brand-logo">
						<img src={brandLogo} className="brand-logo-img" alt="Petsweb" />
						<h2>PETSWEB</h2>
					</div>
				</Link>
				{loggedIn ? (
					<div className="mobile-view-user">
						<button className="petsweb-user mpwu">
							{/* {userName} */}
							<img className="user-ico" src={`${proxy}/user-pics/${emailSplit}.png`} alt="User" />
							<img src={downArrow} alt="" />
						</button>

						<ul className="petsweb-user-list">
							<li>
								<NavLink to={`/user`}>Profile</NavLink>
							</li>
							<li>
								<NavLink to={'/logout'}>Logout</NavLink>
							</li>
						</ul>
					</div>
				) : null}

				<div className="burger" onClick={handleBurger}>
					<div className="line" />
				</div>

				<ul className="nav-items">
					<li>
						<NavLink activeClassName="active-nav-link" to="/rescue" className="nav-item">
							<span>RESCUE</span>
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName="active-nav-link" to="/about" className="nav-item">
							<span>ABOUT</span>
							{/* ABOUT */}
						</NavLink>
					</li>

					{loggedIn ? (
						<li>
							<button className="petsweb-user">
								{/* {userName} */}
								<img className="user-ico" src={`${proxy}/user-pics/${emailSplit}.png`} alt="User" />
								<img src={downArrow} alt="" />
							</button>

							<ul className="petsweb-user-list">
								<li>
									<NavLink to={`/user`}>Profile</NavLink>
								</li>
								<li>
									<NavLink to={'/logout'}>Logout</NavLink>
								</li>
							</ul>
						</li>
					) : (
						<li>
							<NavLink to="/login">LOGIN</NavLink>
						</li>
					)}
				</ul>

				<div className="glass" onClick={handleBurger} />
			</nav>
			<Switch>
				<Route path="/dogs" component={Dogs} />
				<Route path="/cats" component={Cats} />
				<Route path="/user" component={User} />
				<Route path="/rescue" component={Rescue} />
				<Route path="/logout" component={Logout} />
			</Switch>
			{/* <Footer /> */}
		</div>
	);
};

// const Rescue = () => {
// 	const style = {
// 		fontFamily: 'Poppins',
// 		fontSize: '2em',
// 		position: 'absolute',
// 		top: '50%',
// 		left: '50%',
// 		transform: 'translate(-50%, -50%)'
// 	};
// 	return (
// 		<div className="rescue-module" style={{ height: '50vh' }}>
// 			<h2 style={style}>Rescue</h2>
// 		</div>
// 	);
// };

export default Navigation;
