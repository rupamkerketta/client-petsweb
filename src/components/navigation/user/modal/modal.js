import React from 'react';
import './modal.css';

import closeBtn from '../../../res/images/close.png';

const Modal = () => {
    return(
        <div className="modal">
            <div className="close-btn">
                <img src={closeBtn} alt="close"/>
            </div>
        </div>
    );
};

export default Modal;