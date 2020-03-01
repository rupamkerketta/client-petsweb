import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './user.css';

// Proxy
import proxy from '../../../proxy/proxy';

// Modal
import Modal from './modal/modal';

// UserDp
import UserDp from './user-dp/user-dp';  

// UserInfo
import UserInfo from './user-info/user-info';


import editIcon from '../../res/images/edit.png';
import pin from '../../res/images/pin.png';

const User = () => {

    // User-Details
    const user = useSelector(state => state.user);
    const email = useSelector(state => state.userEmail);
    const emailSplit = email.split('@')[0];

    const [showModal, setShowModal] = useState(false);
    const [current, setCurrent] = useState("");

    const [userDetails, setUserDetails] = useState({});
    const [flag, setFlag] = useState(false);

    // LoggedIn Status
    const loggedIN = useState(useSelector(state => state.loggedIN));
             
        const getUserDetails = () => {
            axios.post(`${proxy}/api/user`, {
                emailId : email
            }).then(response => {
                console.log(response.data[0]);
                setUserDetails(response.data[0]);
            }).catch(err => {
                console.log(err);
            });
        }
        
    
    useEffect(() => {
        getUserDetails();
    }, []);
    

    const handleUpdate = (flag) => {
        if(showModal){
            setShowModal(false);
        }
        else{
            setShowModal(true);
        }

        if (flag) {
            window.location.reload(true);
        }
    };
    
    return(
        <div className="container">
            
            {showModal ? <div className="modal-glass"></div> : ""}
            {showModal ? 
                <Modal handleUpdate={handleUpdate}>
                    {
                        current === 'user-dp' ? 
                        <UserDp userDetails={userDetails} handleUpdate={handleUpdate} userPic={`${proxy}/user-pics/${emailSplit}.png`}/> : ""
                    }
                    {
                        current === 'update-info' ?
                        <UserInfo userDetails={userDetails} handleUpdate={handleUpdate} userPic={`${proxy}/user-pics/${emailSplit}.png`}/>: ""
                    }
                </Modal> 
                : 
                null
            }
            
            {!loggedIN ? <Redirect to="/" /> : ""}
            
            <div className="main-banner">
                <div className="cover-bg">
                </div>
                <div className="user-dp" onClick={() => {setCurrent('user-dp'); handleUpdate()}}>
                    {
                        
                        flag ?
                            <img src={`${proxy}/user-pics/${emailSplit}.png`} alt={`${user}`} />
                            :
                            <img src={`${proxy}/user-pics/${emailSplit}.png `} alt={`${user}`} />

                    }
                </div>
                <div className="user-info-1">
                    <h2>{user}</h2>
                    <h4>{email}</h4>
                </div>
                <div className="update-info">
                    <button type="button" onClick={() => {setCurrent('update-info'); handleUpdate()}}>
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