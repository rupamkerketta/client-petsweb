import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Redirect, NavLink } from 'react-router-dom';
import './user.css';

// Proxy
import proxy from '../../../proxy/proxy';

// Modal
import Modal from './modal/modal';

// UserDp
import UserDp from './user-dp/user-dp';

// UserInfo
import UserInfo from './user-info/user-info';

// PetUpload
import PetUpload from './pet-upload/pet-upload';

// Timeline-Tile
import Timeline from './timeline/timeline';

import editIcon from '../../res/images/edit.png';
import pin from '../../res/images/pin.png';

const User = () => {
	// User-Details
	const user = useSelector((state) => state.user);
	const email = useSelector((state) => state.userEmail);
	const timeline = useSelector((state) => state.timeline);
	const myAnimals = useSelector((state) => state.pets);
	const bio = useSelector((state) => state.bio);
	const phone = useSelector((state) => state.phone);
	const address = useSelector((state) => state.address);
	const emailSplit = email.split('@')[0];

	const [ showModal, setShowModal ] = useState(false);
	const [ current, setCurrent ] = useState('');

	const [ userDetails, setUserDetails ] = useState({});
	const [ flag, setFlag ] = useState(false);
	const [ rescuePosts, setRescuePosts ] = useState([]);
	const [ rescuePostsF, setRescuePostsF ] = useState(null);

	// LoggedIn Status
	const loggedIN = useState(useSelector((state) => state.loggedIN));

	const getUserDetails = () => {
		axios
			.post(`${proxy}/api/user`, {
				emailId: email
			})
			.then((response) => {
				console.log(response.data[0]);
				setUserDetails(response.data[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getUserDetails();
		getTimeLine();
		// getInfo();
	}, []);

	const getTimeLine = () => {
		axios
			.post(`${proxy}/timeline`, { email: email })
			.then((response) => {
				console.log(response.data);
				setRescuePosts(response.data);
				console.log(response.data.length);
				setRescuePostsF(response.data.length);
			})
			.catch((err) => console.log(err));
	};

	// const getInfo = () => {
	//     axios.post(`${proxy}/get-apb`, { email: email })
	// 		.then((response) => {
	// 			console.log('[get-apb] ' + response.data[0]);
	//             setBio(response.data[0].bio);
	//             setPhone(response.data[0].ph_no);
	//             setAdd(response.data[0].address1);
	//          })
	//         .catch(err => console.log(err));
	// }

	const handleUpdate = (flag) => {
		if (showModal) {
			setShowModal(false);
		} else {
			setShowModal(true);
		}

		if (flag) {
			window.location.reload = true;
		}
	};

	return (
		<div className="container">
			{showModal ? <div className="modal-glass" /> : ''}
			{showModal ? (
				<Modal handleUpdate={handleUpdate}>
					{current === 'user-dp' ? (
						<UserDp
							userDetails={userDetails}
							handleUpdate={handleUpdate}
							userPic={`${proxy}/user-pics/${emailSplit}.png`}
						/>
					) : (
						''
					)}
					{current === 'update-info' ? (
						<UserInfo
							userDetails={userDetails}
							handleUpdate={handleUpdate}
							userPic={`${proxy}/user-pics/${emailSplit}.png`}
						/>
					) : (
						''
					)}
					{current === 'upload-pet' ? (
						<PetUpload
							handleUpdate={handleUpdate}
						/>
					) : (
						''
					)}
				</Modal>
			) : null}

			{!loggedIN ? <Redirect to="/" /> : ''}

			<div className="main-banner">
				<div className="cover-bg" />
				<div
					className="user-dp"
					onClick={() => {
						setCurrent('user-dp');
						handleUpdate();
					}}
				>
					{
						// flag ?
						<img src={`${proxy}/user-pics/${emailSplit}.png`} alt={`${user}`} />
						// :
						// <img src={`${proxy}/user-pics/${emailSplit}.png `} alt={`${user}`} />
					}
				</div>
				<div className="user-info-1">
					<h2>{user}</h2>
					<h4>{email}</h4>
				</div>
				<div className="update-info">
					<button
						type="button"
						onClick={() => {
							setCurrent('update-info');
							handleUpdate();
						}}
					>
						<span className="upd-cnt">Update Info</span>
						<img src={editIcon} alt="Update Info" />
					</button>
				</div>
			</div>

			<div className="banner-2">
				<div className="info-box">
					<div className="location-info">
						<img src={pin} alt="Location" />
						<div className="location-content">
							<h2>{bio ? bio : null}</h2>
							<h2>{phone ? phone : null}</h2>
							<h2>{address ? address : null}</h2>
						</div>
					</div>

					<div className="pet-history">
						<div>
							<h3>Rescue Posts</h3>
							<h3>{timeline != null ? `${timeline.data.length}` : ''}</h3>
						</div>
						{/* <div>
							<h3>Fostered Pets</h3>
							<h3>7</h3>
						</div> */}
					</div>
				</div>

				<div className="info-box-pet">
					{myAnimals != null ? (
						myAnimals.data.map((animal) => {
							return (
								<NavLink to={`pets/${animal.name}`}>
									<div className="myPetPic">
										<img src={`${proxy}/pet-pics/${animal.name}.jpg`} alt="" />
									</div>
								</NavLink>
							);
						})
					) : null}
					<h5
						onClick={() => {
							setCurrent('upload-pet');
							handleUpdate();
						}}
					>
						Add Pet
					</h5>
				</div>
			</div>

			<div className="banner-3">
				<h3 id="timeline-title">Timeline</h3>
				{timeline != null ? (
					timeline.data.map((post) => {
						return <Timeline key={post.rid} details={post} />;
					})
				) : null}
			</div>
		</div>
	);
};

export default User;
