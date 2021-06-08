import React from 'react';

function Footer({background_footer}) {
    return (
        <div className="footer-container" style={{ backgroundImage: `url(${background_footer})` }}>
            <div className="location-info">
                <ul>
                    <li>MTB-Rental.com</li>
                    <li>Korte Noorderweg 75</li>
                    <li>1221 NC Hilversum</li>
                    <li>+31(0)35-5446937</li>
                    <li>+31(0)639669702</li>
                </ul>
            </div>
            <div className="popular_locations">
                <ul>
                    <li>Populaire MTB locaties</li>
                    <br/>
                    <div className="location-link">
                        <span><li>Lage Vuursche</li></span>
                        <span><li>Hooge Vuursche</li></span>
                        <span><li>Utrechtse Heuvelrug</li></span>
                    </div>
                </ul>
            </div>
            <div className="copyright-footer">
                © 2021 - MTB-Rental.com
            </div>
        </div>
    )
}

export default Footer;