import React from 'react';
import { NavLink } from 'react-router-dom';
import './homePage.css';

import dog from '../../res/images/dog-2.png';
import cat from '../../res/images/cat.png';
import city from '../../res/images/cityscape.png';

const Home = () => {
	return (
		<div className="home-page">
			<div className="main-container">
				<div className="banner">
					<div className="banner-glass" />
					<h2>
						Where Pets Find Their People
						<span className="banner-quote">
							" It takes nothing away from a human to be kind to an animal "
						</span>
					</h2>
				</div>

				<div className="find-pets">
					<div>
						<NavLink to="/city">
							<div className="location">
								<img src={city} alt="city" />
								<h3 className="city-name">BANGALORE</h3>
							</div>
						</NavLink>
					</div>

					<div>
						<NavLink to="/dogs">
							<div className="cats">
								<img src={dog} alt="Dog" />
								<h3>Find a Dog</h3>
							</div>
						</NavLink>
					</div>

					<div>
						<NavLink to="/cats">
							<div className="cats">
								<img src={cat} alt="Cat" />
								<h3>Find a Cat</h3>
							</div>
						</NavLink>
					</div>
				</div>

				<div
                    className="pet-articles"
				>
                    <div className="cat-adoption">
                        <a href="https://www.nytimes.com/1996/11/28/garden/adopting-a-cat-gets-complicated.html">
                            <div className="adoption-glass-banner">
							<h2>Cat Adoption Articles</h2>
						</div>
                        </a>
					</div>
					<div className="dog-adoption">
						<a href="https://www.mentalfloss.com/article/506531/25-benefits-adopting-rescue-dog">
							<div className="adoption-glass-banner">
								<h2>Dog Adoption Articles</h2>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
		// <h2 style={style}>Idhar kya likhna aur daalna hai koi idea dega</h2>
	);
};

export default Home;

// The world would be a nicer place if everyone had the ability
// to love unconditionally as a dog

// It takes noting away form a human to be kind to an animal
