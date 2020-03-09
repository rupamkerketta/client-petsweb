import React, { useState } from 'react';
import './rescue.css';
import Map from './maps/maps';

import petsWebIcon from '../../res/images/pawprint-black.png';
import camera from '../../res/images/camera.png';
import edit from '../../res/images/edit-2.png';

import { useSelector } from 'react-redux';
import axios from 'axios';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Rescue = () => {
	const [ petPic, setPetPic ] = useState('');
	const [ file, setFile ] = useState('');
	const [ lat, setLat ] = useState(null);
	const [ lng, setLng ] = useState(null);
	const [ comment, setComment ] = useState('');
	const [ urgency, setUrgency ] = useState('');
	const [atype, setAType] = useState('');
	const [ message, setMessage ] = useState('');

	const handleComment = (e) => {
		setComment(e.target.value);
	};

	const handleUrgency = (e) => {
		setUrgency(e.target.value);
	};

	const handleAType = (e) => {
		setAType(e.target.value);
	};

	//  12.9716° N, 77.5946° E

	const onChange = (e) => {
		setFile(e.target.files[0]);
		// setFilename(e.target.files[0].name);
		setPetPic(URL.createObjectURL(e.target.files[0]));
	};

	const getCurrC = (lat, lng) => {
		setLat(lat);
		setLng(lng);
		console.log(lat + ' ' + lng + ' [rescue.js]');
	};

	const defaultProps = {
		center: {
			lat: 12.956467199999999,
			lng: 77.6208384
		},
		zoom: 18
	};

	const [ email, setEmail ] = useState(useSelector((state) => state.userEmail));
	const [ filename, setFilename ] = useState('Choose File');

	const onSubmit = async (e) => {
		e.preventDefault();

		console.log(comment + ' ' + urgency + ' ' + atype);

		const formData = new FormData();
		formData.append('file', file);
		formData.append('email', email);
		formData.append('comment', comment);
		formData.append('urgency', urgency);
		formData.append('atype', atype);
		formData.append('lat', lat);
		formData.append('lng', lng);

		try {
			const res = await axios.post('http://localhost:5000/rescue', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});

			// const { fileName, filePath } = res.data;
			console.log(email.split('@')[0]);

			//   setUploadedFile({ fileName, filePath });

			setMessage('Request Info Posted');
			window.location.href = "/user";
		} catch (err) {
			console.log('[Error Triggered] ' + err);
			if (err.response.status === 500) {
				setMessage('There was a problem with the server');
			} else {
				setMessage(err.response.data.msg);
			}
		}
	};

	return (
		<div className="rescue-module">
			<form onSubmit={onSubmit}>
				<div className="pet-picture">
					{petPic ? (
						<div className="show-pet-pic">
							<img src={petPic} alt="" />
						</div>
					) : (
						<div className="pet-placeholder">
							<img src={petsWebIcon} alt="Pet" />
						</div>
					)}
				</div>
				<div className="input-wrapper">
					{petPic ? <img src={edit} alt="" /> : <img src={camera} alt="" />}
					<input
						type="file"
						capture="camera"
						accept="image/*"
						id="cameraInput"
						onChange={onChange}
						name="cameraInput"
					/>
				</div>

				{/* 12.9716° N, 77.5946° E */}

				<div style={{ margin: '100px' }}>
					<Map
						google={window.google}
						center={{ lat: 12.9716, lng: 77.5946 }}
						height="300px"
						zoom={15}
						getCurrC={getCurrC}
					/>
					<div className="coo">
						<h3>Latitude: {lat}</h3>
						<h3>Longitude: {lng}</h3>
					</div>

					<div className="input-element">
						<label for="comment">Comments</label>
						<textarea id="comment" value={comment} onChange={handleComment} />
					</div>
					<div className="input-element" id="last-input">
						<div>
							<label for="urgency">Urgency</label>
							<select name="urgency" id="urgency" onChange={handleUrgency}>
								<option value="">---</option>
								<option value="urgent">Urgent</option>
								<option value="very-urgent">Very Ugent</option>
								<option value="not-urgent">Not Urgent</option>
							</select>
						</div>

						<div>
							<label for="animal-type">Animal Type</label>
							<select name="" id="animal-type" onChange={handleAType}>
								<option value="">---</option>
								<option value="D">Dog</option>
								<option value="C">Cat</option>
								<option value="O">Others</option>
							</select>
						</div>
					</div>

					<div className="input-element">
						<input type="submit" value="Post" />
					</div>
				</div>
			</form>

			<div className="display-update-msg">
				<h4>{message}</h4>
			</div>

			{/* <div style={{ height: '480px', width: '70%', margin: 'auto', marginTop: '50px' }}>
				<GoogleMapReact
					// bootstrapURLKeys={{ key: 'AIzaSyAvgdrnwpA1D-EvtMg3d-aKyAwChhpKZuM' }}
					bootstrapURLKeys={{ key: 'AIzaSyAvgdrnwpA1D-EvtMg3d-aKyAwChhpKZuM' }}
					defaultCenter={defaultProps.center}
					defaultZoom={defaultProps.zoom}
				>
					<AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
				</GoogleMapReact>
			</div> */}
		</div>
	);
};

export default Rescue;
