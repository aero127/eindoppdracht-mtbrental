import React from 'react';
import Bike from "./Bike";
import centurionElectric from "./pics/centurion-elektrische-mountainbike.jpg"

function MtbElectric(props) {
    return (
        <div>
            <Bike
                generalTitle="Elektrische mountainbike huren"
                generalInfo="Een elektrische mountainbike huren kan nu ook bij MTB-Rental.com. De door ons aangeboden verhuur e-MTB beschikken over een krachtige Bosch midden motor, dit zorgt voor een enorme powerboost bij het acceleren en draagt door de constante ondersteuning mee aan veel rijgemak. Een e-mountainbike maakt het MTB-en veel lichter en gemakkelijker, dit zorgt er onder andere voor dat het mountainbiken langer vol te houden is en gemiddeld hogere snelheden gereden kunnen worden. Geschakeld in de zwaartste stand zorgt de ondersteuning voor de maximale snelheid, dit zorgt voor een spectactulaire mountainbike ervaring en stelt je onder anderen in staat om ongelooflijk snel te kunnen klimmen.



Een e-MTB huren is om diverse redenen raadzaam. Het is ideaal voor mountainbikers die op zoek zijn naar een nieuwe (extreme) MTB ervaring, maar ook perfect voor ongetrainde fietsers die goed mee willen komen met getrainde mountainbikers. Daarbij zorgt een e-mountainbike er voor dat elke mountainbiker (getraind of ongetraind) langere trajecten in kortere tijd kan volbrengen"
                bikeName="E-Mountainbike"
                bikeImg={centurionElectric}
                bikeSpecs="Al onze verhuur e-mountainbikes beschikken over een Bosch e-MTB systeem met middenmotor. Daarbij zijn deze bikes voorzien van een supersterk frame, een hoogwaardig afmontage (Deore XT of hoger) en een luchtgeveerde voorvork. Deze eigenschappen zorgen voor veel rijgemak, en voor heel veel fun! De e-MTB's zijn o.a. perfect te gebruiken op de officiele MTB-Routes van de Utrechtse heuvelrug, maar zijn ook zeer geschikt voor lange tochten over verharde wegen en onverharde paden door heide en bos."
                bikePricesThreeHours="49"
                bikePricesDay="69"
                bikePricesWeek="199"
                nextBike="/mtbkids"
                previousBike="/mtb29inchfs"
            />
        </div>
    );
}

export default MtbElectric;