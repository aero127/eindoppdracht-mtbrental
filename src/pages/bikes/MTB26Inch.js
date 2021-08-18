import React from 'react';
import Bike from "./Bike";
import beOne26 from "./pics/b1-26inch.jpg"

function Mtb26Inch(props) {
    return (
        <div>
            <Bike
            generalTitle="26 inch Mountainbike Huren"
            generalInfo="Bij MTB-Rental.com kun je 26 inch mountainbikes huren van hoogwaardige kwalilteit. Deze bikes zijn zeer wendbaar en acceleren in sneltreinvaart. Ideaal voor het snelle bochtenwerk en kort op elkaar liggende heuveltjes. De 26 inch bikes die wij in de verhuur hebben zijn zeer toegangelijk en door vrijwel iedereen te gebruiken; Van beginner tot ervaren biker, en door de verschillende fiets-maten en verstelbare zadelpennen, passend voor elke lengte.



De door ons gekozen BeOne hardtail mountainbikes beschikken over een allround geometrie waardoor deze fietsen zowel op bochtig (en extreem) parcours als op lange rechte stukken goed presteren en comfortabel rijden. De mountaintainbikes zijn hiermee o.a. geschikt voor mtb tracks zoals die bij Lage Vuursche, maar ook voor grotere tourtochten."
            bikeName="BeOne-Mountainbike-26-inch"
            bikeImg={beOne26}
            bikeSpecs="De 26 inch verhuurvoorraad bestaat uit een fraaie collectie BeOne mountainbikes.
            Deze bikes zijn voorzien van sterke frames, wielen en onderdelen.
            De fietsen remmen en schakelen gemakkelijk en zijn door Marzocchi voorvorken goed afgeveerd.
            De BeOne Bikes zijn zeer geschikt voor ruig terrein, zoals die te vinden is op de mountainbike routes bij Hilversum,
            maar kunnen ook perfect gebruikt worden voor (dag) tochten door bos en hei. "
            bikePricesThreeHours="20"
            bikePricesDay="35"
            bikePricesWeek="99"
            nextBike="/mtb29inch"
            previousBike="/mtbkids"
            />
        </div>
    );
}

export default Mtb26Inch;