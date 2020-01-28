import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './user.css';

// Modal
import Modal from './modal/modal';

import editIcon from '../../res/images/edit.png';
import pin from '../../res/images/pin.png';


const User = () => {

    const [showModal, setShowModal] = useState(false);

    // LoggedIn Status
    const loggedIN = useState(useSelector(state => state.loggedIN));

    // User-Details
    const user = useState(useSelector(state => state.user));
    const email = useState(useSelector(state => state.userEmail));

    
    
    // User-Email
    const userEmail = useSelector(state => state.userEmail);

    // User-Pic Name
    const userPic = userEmail.split("@")[0];
    console.log(userPic);


    const getUserDetails = () => {
        axios.post('http://localhost:5000/api/user', {
            emailId : userEmail
        }).then(response => {
            console.log(response.data);
            console.log('[USER_API]');
        }).catch(err => {
            console.log(err);
        });
    }


    useEffect(() => {
        getUserDetails();
    }, []);
    

    const handleUpdate = () => {
        if(showModal){
            setShowModal(false);
        }
        else{
            setShowModal(true);
        }
    };
    
    return(
        <div className="container">
            {showModal ? <div className="modal-glass" onClick={() => handleUpdate()}></div> : ""}
            {showModal ? <Modal /> : ""}
            {!loggedIN ? <Redirect to="/" /> : ""}
            <div className="main-banner">
                <div className="cover-bg">
                </div>
                <div className="user-dp">
                    <img src={`http://localhost:5000/user-pics/${userPic}.png`} alt={`${user}`}/>
                </div>
                <div className="user-info-1">
                    <h2>{user}</h2>
                    <h4>{email}</h4>
                </div>
                <div className="update-info">
                    <button type="button" onClick={() => handleUpdate()}>
                        Update Info
                        <img src={editIcon} alt="Update Info"/>
                    </button>
                </div>
            </div>

            <div className="banner-2">
                <div className="info-box">
                    <div className="location-info">
                        <img src={pin} alt="Location"/>
                        <div className="location-content">
                            <h2>Bangalore</h2>
                            <h2>Karnataka</h2>
                            <h2>India - 560029</h2>
                        </div>
                    </div>

                    <div className="pet-history">
                        <div>
                            <h3>Rescued Pets</h3>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>Fostered Pets</h3>
                        <h3>7</h3>
                        </div>
                    </div>

                </div>

                <div className="info-box-pet">
                </div>
            </div>
        </div>
    );

}

export default User;