import React from 'react';
import Bike from "./Bike";
import cubeKids from "./pics/cube-kinder-mountainbike.jpg"

function Mtbkids(props) {
    return (
        <div>
            <Bike
                generalTitle="Kinder mountainbike huren"
                generalInfo="Voor alle enthousiaste jonge fietsers; We verhuren ook kinder mountainbikes! Deze mtb's zijn in alle kinder maten verkrijgbaar, waarmee we kinderen van 4 jaar en ouder kunnen voorzien van een fraaie en zeer functionele mountainbike. De verhuur kinder mountainbikes hebben dezelfde degelijkheid als de grotere MTB's uit ons assortiment. Standaard beschikken ook deze MTB's over sterke aluminium frames en meerdere versnellingen. Dit maakt deze compacte MTB's o.a. geschikt voor gebruik op de officiële MTB routes in Nederland.



Om gegarandeerd te zijn van de juiste maat, is het verstandig om de leeftijd en lengte van fietser bij reservering door te geven. Zo kunnen we de juiste fietsen vast klaar zetten en zorgen dat er met maximale fun gemountainbiket kan worden. Uiteraard kan de reservering van deze mini mountainbikes worden gecombineerd met meerdere en/of andere type mountainbikes uit ons assortiment. Wanneer de mtb's gebruikt worden op de officiële routes van de Utrechtse Heuvelrug is per mountainbike een vignet benodigd, bij de huur via MTB-Rental.com zijn deze vignetten altijd inbegrepen."
                bikeName="Kinder mountainbike"
                bikeImg={cubeKids}
                bikeSpecs="Onze kinder mountainbike verhuurvoorraad bestaat uit een fraaie collectie 20inch, 24inch, 26inch en 27.5inch bikes van Cube. Hiermee bieden we bikes aan voor enthousiaste junior bikers vanaf 4 jaar en kinderen van alle leeftijden daarboven. Alle aangeboden Cube kinder MTB's zijn van 'volwassen' kwaliteit. De bikes beschikken over sterke en lichte aluminium frames en zijn voorzien van derailleur versnellingen met een brede range aan verzetten. De lichte verzetten voor het beklimmen van steile heuvels en de zware verzetten voor het maken van veel snelheid op vlakke stukken en bij afdalingen. Ook deze bikes passen goed bij de MTB-Routes Lage Vuursche en Hooge Vuursche en andere tracks van de Utrechtse Heuvelrug. "
                bikePricesThreeHours="20"
                bikePricesDay="25"
                bikePricesWeek="99"
                nextBike="/mtb26inch"
                previousBike="/mtbelectric"
            />
        </div>
    );
}

export default Mtbkids;