import React from 'react';
import {PhotoSliderData} from "../components/PhotoSliderData";
import Photoslider from "../components/Photoslider";

function Home () {
    return(
        <div className="main-container">
            <div className="textcontainer">
                <h1>Mountainbike huren?</h1>
                <p>
                Wil je een mountainbike huren of zoek je meerdere mountainbikes tegelijk, dan kun je dat bij ons eenvoudig regelen.
                Je kunt hier 26 inch mountainbikes en 29-er ATB's huren.
                De fietsen zijn te huur vanuit  onze verhuurlocatie in Hilversum of vanaf een zelf gekozen locatie.

                Bel 035-5446937 of Reserveer direct online!

                </p>
            </div>
            <div className="photoslider-container">
                <Photoslider slides={PhotoSliderData}/>
            </div>
        </div>

    )
}

export default Home;