import React, {useState} from 'react';
import './rescue.css';

import petsWebIcon from '../../res/images/pawprint-black.png';
import camera from '../../res/images/camera.png';
import edit from '../../res/images/edit-2.png'

const Rescue = () => {

	const [petPic, setPetPic] = useState(null);

    const onChange = e => {
        // setFile(e.target.files[0]);
        // setFilename(e.target.files[0].name);
        setPetPic(URL.createObjectURL(e.target.files[0]));
    };

    return(
        <div className="rescue-module">
            <div className="pet-picture"> 
                {
                    petPic ? 
                        <div className="show-pet-pic">
                            <img src={petPic} alt=""/>
                        </div> 
                        :
                        <div className="pet-placeholder">
                            <img src={petsWebIcon} alt="Pet"/>
                        </div>
                }
            </div>
            <div className="input-wrapper">
                {
                    petPic ? 
                    <img src={edit} alt="" />
                    :
                    <img src={camera} alt="" />
                }
                <input type="file" capture="camera" accept="image/*" id="cameraInput" onChange={onChange} name="cameraInput"></input>
            </div>
        </div>
	);
}

export default Rescue;