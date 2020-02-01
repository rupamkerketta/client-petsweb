import React, { useState } from 'react';
import axios from 'axios';
import './modal.css';

import closeBtn from '../../../res/images/close-3.png';
import { useSelector } from 'react-redux';

const Modal = (props) => {
    const [newUserDP, setNewUserDP] = useState(null);
    const [email, setEmail] = useState(useSelector(state => state.userEmail));
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [message, setMessage] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setNewUserDP(URL.createObjectURL(e.target.files[0]));
    };


    const onSubmit = async e => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email.split('@')[0]);
        
        try {
            const res = await axios.post('http://localhost:5000/upload-userdp', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            const { fileName, filePath } = res.data;
            console.log(email.split('@')[0]);
            
            //   setUploadedFile({ fileName, filePath });
            
            setMessage('File Uploaded');
            props.handleUpdate(true);
        } catch (err) {
        if (err.response.status === 500) {
            setMessage('There was a problem with the server');
        } else {
            setMessage(err.response.data.msg);
        }
        }
    };

    return(
        <div className="modal">
            <div className="close-btn" onClick={() => props.handleUpdate()}>
                <img src={closeBtn} alt="close"/>
            </div>
            <div className="update-info-form">
                {   newUserDP ?
                    <div className="new-dp">
                        <h2>New Profile Pic</h2>
                        <img src={newUserDP} alt="User DP" className="upd-user-dp"/> 
                    </div>
                    :                     
                    <div className="current-dp">
                        <h2>Current Profile Pic</h2>
                        <img src={props.userPic} className="upd-user-dp" alt="User DP" />
                    </div>
                }
                <form onSubmit={onSubmit}>
                    <div className="input-element">
                        <input type="file" name="my-file" id="user-dp-inel" onChange={onChange}/>
                    </div>
                    <div class="user-info">
                        <div className="input-element">
                            <label htmlFor="user-address">Address</label>
                            <textarea name="user-address" id="user-address">
                            </textarea>
                        </div>
                        <div className="input-element">
                            <label htmlFor="user-phone">Phone</label>
                            <input type="text" name="user-phone" id="user-phone"/> 
                        </div>
                        <div className="input-element">
                            <label htmlFor="user-bio">Bio</label>
                            <textarea name="user-bio" id="user-bio"></textarea>
                        </div>
                    </div>
                    <input type="submit" value="Save" />
                </form>

                <div className="display-update-msg">
                    <h4>{message}</h4>
                </div>
            </div>
        </div>
    );
};

export default Modal;