import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import proxy from '../../../../proxy/proxy';
import './pet-upload.css';


const PetUpload = (props) => {
	const [ newUserDP, setNewUserDP ] = useState(null);
	const [ email, setEmail ] = useState(useSelector((state) => state.userEmail));
	const [ file, setFile ] = useState('');
	const [ filename, setFilename ] = useState('Choose File');
	const [ message, setMessage ] = useState('');
	const [ petName, setPetName ] = useState('');
	const [ petType, setPetType ] = useState('');
	const [ petDesc, setPetDesc ] = useState('');
	const [ petBreed, setPetBreed ] = useState('');

	const onChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.files[0].name);
		setNewUserDP(URL.createObjectURL(e.target.files[0]));
	};

	const onChangeName = (e) => {
		setPetName(e.target.value);
	};
	const onChangeDesc = (e) => {
		setPetDesc(e.target.value);
	};
	const onChangeBreed = (e) => {
		setPetBreed(e.target.value);
	};
	const onTypeChange = (e) => {
		setPetType(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('file', file);
        formData.append('petName', petName);
        formData.append('petDescription', petDesc);
        formData.append('petType', petType);
        formData.append('petBreed', petBreed);
		formData.append('email', email);

		try {
			const res = await axios.post(`${proxy}/upload-user-pet`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			setMessage('File Uploaded');
			props.handleUpdate(true);
		} catch (err) {
			console.log('[Error Triggered] ' + err);
			// if (err.response.status === 500) {
			// 	setMessage('There was a problem with the server');
			// } else {
			// 	setMessage(err.response.data.msg);
			// }
		}
	};

	return (
		<div className="pet-upload">
			{/* <h3>Pet Upload</h3> */}
			{newUserDP ? (
				<div className="new-dp">
					<h2>New Pet Profile Pic</h2>
					<img src={newUserDP} alt="User DP" className="upd-user-dp" />
				</div>
			) : (
				''
			)}
			<form onSubmit={onSubmit}>
				<div className="input-element">
					<input type="file" name="my-file" id="user-dp-inel" onChange={onChange} />
				</div>
				<div className="input-element">
                    <label htmlFor="pet-name">Pet Name</label>
					<input type="text" name="pet-name" id="pet-name" onChange={onChangeName} />
				</div>
				<div className="input-element">
                    <label htmlFor="pet-description">Pet Description</label>
					<textarea type="text" name="pet-description" id="pet-description" onChange={onChangeDesc} />
				</div>
				<div className="input-element">
                    <label htmlFor="pet-breed">Pet Breed</label>
                    <input type="text" name="pet-breed" id="pet-breed" onChange={onChangeBreed} />
				</div>
				<div className="input-element">
					<label htmlFor="animal-type">Animal Type</label>
					<select name="" id="animal-type" onChange={onTypeChange}>
						<option value="">---</option>
						<option value="D">Dog</option>
						<option value="C">Cat</option>
						<option value="O">Others</option>
					</select>
				</div>

                <input type="submit" value="Save"/>
			</form>
			<div className="display-update-msg">
				<h4>{message}</h4>
			</div>
		</div>
	);
};

export default PetUpload;
