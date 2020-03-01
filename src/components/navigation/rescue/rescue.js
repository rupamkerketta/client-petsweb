import React, { useState, useEffect } from 'react';
import './rescue.css';
import Map from './maps/maps';
import petsWebIcon from '../../res/images/pawprint-black.png';
import camera from '../../res/images/camera.png';
import edit from '../../res/images/edit-2.png';

const AnyReactComponent = ({ text }) => <div>{text}</div>;



const Rescue = () => {
	const [ petPic, setPetPic ] = useState(null);
	const [ lat, setLat ] = useState(null);
	const [ lng, setLng ] = useState(null);

	//  12.9716° N, 77.5946° E

	const onChange = (e) => {
		// setFile(e.target.files[0]);
		// setFilename(e.target.files[0].name);
		setPetPic(URL.createObjectURL(e.target.files[0]));
	};

	const getCurrC = (lat, lng) => {
		setLat(lat);
		setLng(lng);
		console.log(lat + " " + lng+" [rescue.js]");
	};

	const defaultProps = {
		center: {
			lat: 12.956467199999999,
			lng: 77.6208384
		},
		zoom: 18
	};

	return (
		<div className="rescue-module">
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
					height='300px'
					zoom={15}
					getCurrC={getCurrC}
				/>
				<div className="coo">
					<h3>Latitude: {lat}</h3>
					<h3>Longitude: {lng}</h3>
				</div>

				<div className="input-element">
				</div>
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
