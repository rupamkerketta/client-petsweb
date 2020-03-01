import React, { useState } from 'react';
import './modal.css';

import closeBtn from '../../../res/images/close-3.png';

const Modal = (props) => {

    return(
        <div className="modal">
            <div className="close-btn" onClick={() => props.handleUpdate()}>
                <img src={closeBtn} alt="close"/>
            </div>
            {props.children}
        </div>
    );
};

export default Modal;