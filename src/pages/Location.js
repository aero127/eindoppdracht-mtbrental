import React from 'react';
import "./Location.css";
import Plattegrond from "../assets/googlemaps_plattegrond.jpg"


function Location(props) {
    return (
        <div className="main-location-container">
            <div className="location-container">
                <h1 className="location-h1">Mountainbike Verhuur locatie</h1>
                <div className="location-content">
                   <p><h3>Verhuur vanaf Hilversum</h3></p>
                    Vanaf onze vaste verhuur locatie in Hilversum kunnen mountainbikes, helmen en accessoires opgehaald en teruggebracht worden. Onze verhuuractiviteiten zijn ondergebracht in de Skate7 skateshop te Hilversum. Deze locatie vormt een mooie uitvalsbasis voor de mooie fietsroutes rondom Hilversum maar natuurlijk ook voor de volledig vernieuwde MTB routes Hoge Vuursche en Lage Vuursche. Na reservering zijn de fietsen en accessoires hier op de gewenste dag en tijdstip op te halen en terug te brengen.
                    <p><h3>Bezorging naar elke gewenste locatie</h3></p>
                    Mountainbikes, helmen en bijbehorende accessoires kunnen op aanvraag naar elke gewenste locatie (bijvoorbeeld huisadres, of bij een MTB route) worden gebracht en opgehaald. Meer weten over onze bezorging? neem dan gerust contact met ons op.
                </div>
            </div>
            <div className="location-info-container">
                <div className="location-google-maps">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.7910360819333!2d5.178333216068726!3d52.22901417976015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c66b056d75d355%3A0x13d88f8c933655d7!2sMTB-Rental.com!5e0!3m2!1snl!2snl!4v1623355031679!5m2!1snl!2snl" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
                </div>
            </div>
            <div className="opening-hours-container">
                <div className="location-info-content">
                    <li>Verhuur locatie Hilversum</li>
                    <li>SKATE7 winkel</li>
                    <li>Korte Noorderweg 75</li>
                    <li>1221 NC  Hilversum</li>
                    <li>Openingstijden:</li>
                    <li>Van maandag t/m zondag tussen</li>
                    <li>09:30 en 17:00 geopend</li>
                    <li>(op basis van reservering)</li>
                </div>
                <div className="location-beschikbaar">
                    Beschikbaar:
                    <li>26 inch Mountainbikes</li>
                    <li>29 inch Mountainbikes</li>
                    <li>Full suspension mountainbikes</li>
                    <li>Elektrische mountainbikes</li>
                    Helmen
                </div>
            </div>
        </div>
    );
};

export default Location;