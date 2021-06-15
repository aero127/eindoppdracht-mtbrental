import React from 'react';
import Bike from "./Bike";
import Ghostfully from "./pics/ghost-fully.jpeg"

function Mtb26InchFS() {
    return (
        <div>
            <Bike
                generalTitle="26 inch Full suspension MTB huren"
                generalInfo="Ook full suspension mountainbikes huren kan bij MTB-Rental.com. Deze dubbelgeveerde bikes, ook wel fully's genoemd beschikken over een verende voorvork en een verende achtervork met demper. De dubbele vering maakt rijden over ruw terrein gemakkelijker en comfortabeler, daarbij zorgt de extra demping onder extremere omstandigheden vaak voor meer snelheid en controle. Dit voordeel is goed merkbaar bij technische bochten, afdalingen en zeker bij tracks waar de ondergrond vol boomwortels en/of stenen ligt.
Een full-suspension mountainbike huren kan voor beginnende, maar ook voor gevorderde mountainbikers raadzaam zijn. Een fully zorgt voor veel vertrouwen en maakt mountainbiken  toegankelijk en comfortabel. Doordat bochten en afdalingen vaak sneller met een fully kunnen worden gereden is voor veel bikers het rijden op een volledig geveerde mountainbike een grensverleggende ervaring. Dit maakt de fully tot de perfecte machine voor ervaren en avontuurlijke mountainbikers. Fully's hebben we in verschillende maten staan, zodat er altijd een passende maat beschikbaar is voor elke mountainbiker."
                bikeName="Fully Mountainbike 26 inch"
                bikeImg={Ghostfully}
                bikeSpecs="Onze dual suspension MTB verhuurvoorraad bestaat uit een fraaie collectie Cross-country/Tour Full Suspenion Bikes van o.a. Ghost en Cube. Deze fullys hebben een laag gewicht, zijn zeer solide gebouwd en beschikken over extra verstevigingen rondom de achterwielophanging en demper. De dual suspension Mountainbikes zijn hiermee voorbereid op vele MTB tracks. Goed passend bij de routes Lage Vuursche en Hooge Vuursche of voor een andere MTB route op de Utrechtse Heuvelrug."
                bikePricesThreeHours="33"
                bikePricesDay="37"
                bikePricesWeek="139"
                bikeAlsoAvailable="Ook beschikbaar in 29inch!"
                nextBike="/mtb29inchfs"
                previousBike="/mtb29inch"
            />
        </div>
    );
}

export default Mtb26InchFS;