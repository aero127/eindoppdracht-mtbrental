import React, {useContext, useState} from 'react';
import { ImPhone } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md"
import { FaUser } from "react-icons/fa"
import {NavLink} from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';


function Header({ background, title, mtblogo }) {
    const history = useHistory();
    const {isTokenValid} = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    return (
        <div className="header-container" style={{ backgroundImage: `url(${background})` }}>
            <div className="top-list">
                <ul>
                    <li><ImPhone color="white"/><a href="tel://035-5446937"> 035-5446937</a></li>
                    <li><MdAssignmentTurnedIn color="white"/><NavLink to="/booking" exact activeClassName="active-link">Direct reserveren</NavLink></li>
                    {!isTokenValid() ? (
                        <>
                            <li><FaUser color="white"/><NavLink to="/login">Inloggen</NavLink></li>
                        </>
                    ) : (
                        <li><FaUser color="white"/><NavLink to="/profile" >Mijn gegevens</NavLink></li>
                        )}
                </ul>
            </div>
            <div className="header-wrapper">
               <div className="logo-holder">
                    <img src={mtblogo} alt="mtb-rental" />
                </div>
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/mtb26inch">Onze fietsen</NavLink></li>
                        <li><NavLink to="/location">Verhuur locatie</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                </nav>
                <div className="extra-ruimte"></div>
            </div>
        </div>
    );
}

export default Header;