import React from 'react';
import { ImPhone } from "react-icons/im";
import { MdAssignmentTurnedIn } from "react-icons/md"
import { FaUser } from "react-icons/fa"

function Header({ background, title, mtblogo }) {
    return (
        <div className="header-container" style={{ backgroundImage: `url(${background})` }}>
            <div className="top-list">
                <ul>
                    <li><ImPhone color="white"/><a href="#"> 035-5446937</a></li>
                    <li><MdAssignmentTurnedIn color="white"/><a href="#">Direct reserveren</a></li>
                    <li><FaUser color="white"/><a href="#"> Inloggen</a></li>
                </ul>
            </div>
            <div className="header-wrapper">
               <div className="logo-holder">
                    <img src={mtblogo} alt="mtb-rental" />
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Onze fietsen</a></li>
                        <li><a href="#">Verhuur locatie</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <div className="extra-ruimte"></div>
            </div>
        </div>
    );
}

export default Header;