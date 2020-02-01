import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import useForceUpdate from 'use-force-update';
import {Redirect} from 'react-router-dom';
import './user.css';

// Modal
import Modal from './modal/modal';

import editIcon from '../../res/images/edit.png';
import pin from '../../res/images/pin.png';

const User = () => {


    const email = useSelector(state => state.userEmail);
    const emailSplit = email.split('@')[0];

    const [showModal, setShowModal] = useState(false);

    // LoggedIn Status
    const loggedIN = useState(useSelector(state => state.loggedIN));

    // User-Details
    const user = useState(useSelector(state => state.user));
       
        
        const getUserDetails = () => {
            axios.post('http://localhost:5000/api/user', {
                emailId : email
            }).then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            });
        }
        
    
    useEffect(() => {
        getUserDetails();
    }, []);
    

    const handleUpdate = (picUpdate) => {
        if(showModal){
            setShowModal(false);
        }
        else{
            setShowModal(true);
        }

        if(picUpdate){
            window.location.reload(true);
        }
    };
    
    return(
        <div className="container">
            {showModal ? <div className="modal-glass"></div> : ""}
            {showModal ? <Modal handleUpdate={handleUpdate} userPic={`http://localhost:5000/user-pics/${emailSplit}.png`}/> : ""}
            {!loggedIN ? <Redirect to="/" /> : ""}
            <div className="main-banner">
                <div className="cover-bg">
                </div>
                <div className="user-dp">
                    <img src={`http://localhost:5000/user-pics/${emailSplit}.png`} alt={`${user}`}/>
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