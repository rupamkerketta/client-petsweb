import React from 'react';
import './footer.css';
import { useSelector } from 'react-redux';


const Footer = () => {
    const showFooter = useSelector(state => state.showNav);

    const loginStyle = {
        display: showFooter ? "block" : "none"
    }

    return(
        <div className="petsweb-footer" style={loginStyle}>
            <div className="wrapper">
                <div className="footer-logo">
                    <h3>PETSWEB</h3>
                </div>
                <div className="column-wrapper">
                    <div>
                        <h4>About Petsweb</h4>
                        <ul className="topic-items">
                            <li>
                                About Petsweb
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4>Pet Adoption</h4>
                        <ul className="topic-items">
                            <li>
                                Dog Adoption
                            </li>

                            <li>
                                Cat Adoption
                            </li>

                            <li>
                                Other Pet Adoption
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4>Pet Care Topics</h4>
                        <ul className="topic-items">
                            <li>
                                Dog Breeds
                            </li>

                            <li>
                                Cat Breeds
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bottom-line">
                <h4>&copy; 2020 Petsweb By Bitz Please</h4>
            </div>
        </div>
    );
}

export default Footer;
