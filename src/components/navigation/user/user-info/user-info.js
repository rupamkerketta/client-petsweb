import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './user-info.css';
import proxy from '../../../../proxy/proxy';

const UserInfo = (props) => {

    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAdd] = useState("");

    const [email, setEmail] = useState(useSelector(state => state.userEmail));
    const [message, setMessage] = useState('');

    const getInfo = () => { 
        axios.post(`${proxy}/get-apb`, { email: email })
            .then((response) => {
                console.log('Address : '+response.data[0].address1);
                console.log('Phone   : '+response.data[0].ph_no);
                console.log('Bio     : '+response.data[0].bio);
                setBio(response.data[0].bio);
                setPhone(response.data[0].ph_no);
                setAdd(response.data[0].address1);
             })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getInfo();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();        
        try {
            alert(bio + ' ' + phone + ' ' + address);
            axios.post('http://localhost:5000/update-info', {
                bio: bio,
                phone: phone,
                address: address,
                email: email
            }).then((response) => {
                if(response.data.updateStatus === "success"){
                    console.log('Information updated successfully!! :)');
                    window.location.reload(true);
                }
                else{
                    console.log(':(');
                }
            }).catch(err => console.log(err));
            

            console.log(email.split('@')[0]);

        } catch (err) {
        if (err.response.status === 500) {
            setMessage('There was a problem with the server');
        } else {
            setMessage(err.response.data.msg);
        }
        }
    };

    const handleBio = (e) => {
        setBio(e.target.value);
    }

    const handleAdd = (e) => {
        setAdd(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    const resizeStyle = {
        resize: 'none'
    };

    return(
            <div className="update-info-user">
                <form id="inf" onSubmit={onSubmit}>
                    <div className="user-info">
                        <div className="input-element">
                            <label htmlFor="user-address">Address</label>
                        <textarea name="user-address" id="user-address" onChange={handleAdd} style={resizeStyle} value={address}>
                                {address}
                            </textarea>
                        </div>
                        <div className="input-element">
                            <label htmlFor="user-phone">Phone</label>
                            <input type="text" name="user-phone" id="user-phone" onChange={handlePhone} value={phone} /> 
                        </div>
                        <div className="input-element">
                            <label htmlFor="user-bio">Bio</label>
                        <textarea name="user-bio" id="user-bio" onChange={handleBio} value={bio} style={resizeStyle}>
                            </textarea>
                        </div>
                    </div>
                    <input type="submit" value="Save" />
                </form>
            </div>
    );
};

export default UserInfo;