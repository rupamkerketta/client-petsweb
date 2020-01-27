import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './dogs.css';


const Dogs = (props) => {

    const [dogs, setDogs] = useState([]);

    const getDogs = () => {
        axios.get('http://localhost:5000/api/dogs')
        .then(response => {
            console.log(response.data);
            setDogs(response.data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getDogs();
        console.log('DOGS!!!'); 
    }, []);

    return(
        <div className="dog-container">
            {
                dogs.map(dog => {
                    const style = {
                        background: `url('http://localhost:5000/pet-pics/${dog.name}.jpg') no-repeat center`,
                        backgroundSize: 'cover'
                    }
                    return(
                        <div key={dog.name} className="dog-card">
                            <NavLink to={`pets/${dog.name}`}>
                                <div className="dog-pic" style={style}></div>
                            </NavLink>
                            <h3 className="dog-name">{dog.name}</h3>
                            <h3>{dog.breed}</h3>
                            <h3>{dog.colour}</h3>
                        </div>
                    )})
            }
        </div>
    );
}

export default Dogs;