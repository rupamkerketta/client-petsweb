import React, { useState, useEffect } from 'react';
import './timeline.css';
import { useSelector } from 'react-redux';
// Proxy
import proxy from '../../../../proxy/proxy';

import success from '../../../res/images/success.png';
import error from '../../../res/images/error.png';
import initiated from '../../../res/images/process.png';

import axios from 'axios';

const Timeline = (props) => {
	const email = useSelector((state) => state.email);
	const [ petImg, setPetImg ] = useState(null);
	const [ status, setStatus ] = useState(props.details.status);

	useEffect(() => {
		setPetImg(<img src={`${proxy}/rescue-pics/${props.details.rid}.png`} alt="" />);
		setInterval(checkStatus, 3000);
	}, []);

	const checkStatus = () => {
		axios
			.post(`${proxy}/get-rescue-status`, { rid: props.details.rid })
			.then((response) => {
				console.log(props.details.rid + ' ' + response.data[0].status);
				setStatus(response.data[0].status);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="timeline-tile">
			<div>
				{petImg}
			</div>
			<div className="latlng">
				<div>
					<h5>Latitude : <b>{props.details.latitude}</b></h5>
					<h5>Longitude : <b>{props.details.longitude}</b></h5>
				</div>
				<div>
					<h3>Issue</h3>
					<h5>{props.details.description}</h5>
				</div>
			</div>

			<div>
				<h5>Animal</h5>
				<h3>
					{props.details.animal_type === 'D' ? 'Dog' : ''}
					{props.details.animal_type === 'C' ? 'Cat' : ''}
				</h3>
			</div>
			<div>
				<h3 className="status-title">Status</h3>
				{status != null ? status === 'Not Saved' ? (
					<div className="rescue-status">
						<img className="status" src={error} alt="" />
						<h5>Request Posted</h5>
					</div>
				) : null : null}
				{status != null ? status === 'Saved' ? (
					<div className="rescue-status">
						<img className="status" src={success} alt="" />
						<h5>Pet Saved</h5>
					</div>
				) : null : null}
				{status != null ? status === 'Initiated' ? (
					<div className="rescue-status">
						<img className="status" src={initiated} alt="" />
						<h5>Process Initiated</h5>
					</div>
				) : null : null}
			</div>
		</div>
	);
};

export default Timeline;
