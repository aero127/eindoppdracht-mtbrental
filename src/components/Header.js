import React from 'react';
import { ImPhone } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md"
import { FaUser } from "react-icons/fa"
import {NavLink} from "react-router-dom";

function Header({ background, title, mtblogo }) {
    return (
        <div className="header-container" style={{ backgroundImage: `url(${background})` }}>
            <div className="top-list">
                <ul>
                    <li><ImPhone color="white"/><a href="tel://035-5446937"> 035-5446937</a></li>
                    <li><MdAssignmentTurnedIn color="white"/><NavLink to="/booking" exact activeClassName="active-link">Direct reserveren</NavLink></li>
                    <li><FaUser color="white"/><NavLink to="/login" exact activeClassName="active-link">Inloggen</NavLink></li>
                </ul>
            </div>
            <div className="header-wrapper">
               <div className="logo-holder">
                    <img src={mtblogo} alt="mtb-rental" />
                </div>
                <nav>
                    <ul>
                        <li><NavLink to="/" exact activeClassName="active-link">Home</NavLink></li>
                        <li><NavLink to="/mtb26inch" exact activeClassName="active-link">Onze fietsen</NavLink></li>
                        <li><NavLink to="/location" exact activeClassName="active-link">Verhuur locatie</NavLink></li>
                        <li><NavLink to="/contact" exact activeClassName="active-link">Contact</NavLink></li>
                    </ul>
                </nav>
                <div className="extra-ruimte"></div>
            </div>
        </div>
    );
}

export default Header;