import React from 'react';
import Bike from "./Bike";
import cube29 from "./pics/cube-29-mountainbike.jpg";

function Mtb29Inch() {
    return (
        <div>
            <Bike
                generalTitle="29 inch Mountainbike Huren"
                generalInfo="Bij MTB-Rental.com kun je 29 inch mountainbikes huren, deze mtb's worden ook wel 29ers genoemd.
                    Deze bikes zijn voorzien van grote 29 inch wielen, in vergelijking met traditionele 26 inch mountainbikes bieden deze 29-ers veel voordelen.
                    De grote wielmaat zorgt o.a. voor meer grip, comfort en een hogere cruise -en topsnelheid. Daarbij kun je met een 29er gemakkelijker over obstakels heen rijden.
                    Een 29er MTB rijdt erg gemakkelijk en is zeer toegankelijk. Vrijwel iedereen kan met een 29er uit de voeten, ook bikers met 26 inch mountainbike ervaring, of fietsers die nog nooit op een mountainbike hebben gezeten. De 29-ers zijn in verschilende maten te huren, zo ben je verzekerd van een bij jou lengte passende maat. Ons 29 inch verhuurvoorraad bestaat 29er Cube mountainbikes, deze bikes zijn zeer degelijk gebouwd en afgemonteerd met hoogwaardige onderdelen."
                bikeName="Cube-Mountainbike-29-inch"
                bikeImg={cube29}
                bikeSpecs="Onze 29 inch verhuurvoorraad bestaat uit een fraaie collectie Cube 29-ers.
                Deze mountainbikes beschikken over sterke en lichte frames en zijn voorzien van hoogwaardige onderdelen.
                Hierdoor kunnen de fietsen ruig terrein aan, fietsen ze licht, schakelen ze snel en sta je in no-time stil.
                De geometrie van een Cube 29er MTB maakt snel bochtenwerk mogelijk, maar zorgt ook voor veel comfort op lange afstanden.
                Samengevat is dit de perfecte 29 Inch mountainbike voor Lage Vuursche en Hooge Vuursche of voor een andere MTB route."
                bikePricesThreeHours="27"
                bikePricesDay="32"
                bikePricesWeek="129"
                nextBike="/mtb26inchfs"
                previousBike="/mtb26inch"
            />
        </div>
    );
}

export default Mtb29Inch;