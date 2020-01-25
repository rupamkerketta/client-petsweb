import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pet-profile.css';

const PetProfile = ({match}) => {

    const [petProfile, setPetProfile] = useState({});
    useEffect(() => {
        getProfile();
    }, []);

    let style = {};

    const getProfile = () => {
        axios.post('http://localhost:5000/api/pet-profile', {
            dogName : match.params.id
        })
        .then(response => {
            console.log(response.data[0]);
            setPetProfile(response.data[0]);

        })
        .catch(err => console.log(err));
    }

    

    return(
            <div className="profile-container">
            <div className="pet-pic" style={style}>
                <img src={`http://localhost:5000/${petProfile.name}.jpg`} />
            </div>
                <h2 className="pet-name">{petProfile.name}</h2>
            <div className="pet-info">
                {petProfile.breed} . Adult . Male
            </div>

            <div className="about-pet-container">
                <h2>About</h2>
                <div className="about-pet">
                    <div>
                        <h4>COAT LENGTH</h4>
                        <p>{petProfile.size}</p>
                    </div>
                    <div>
                        <h4>HOUSE-TRAINED</h4>
                        <p>Yes</p>
                    </div>
                    <div>
                        <h4>GOOD IN HOME WITH</h4>
                        <p>Children</p>
                    </div>
                </div>
                <div className="more-about">
                    <h2>Meet {petProfile.name}</h2>
                    <p>{petProfile.description}</p>
                </div>
            </div>
        </div>
    );

}

export default PetProfile;