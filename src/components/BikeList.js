import React, { useState } from "react";

const BikeList = () => {
    const [availablebikes] = useState([
        {
            name: 'MTB 26 inch',
            id: 'MTB26i',
            price3hours: 20,
            price1day: 25,
            price1week: 99,
        },
        {
            name: 'MTB 29 inch',
            id: 'MTB29i',
            price3hours: 20,
            price1day: 25,
            price1week: 99,
        },
        {
            name: 'MTB 26 inch Full Suspension',
            id: 'MTB26iFS',
            price3hours: 20,
            price1day: 25,
            price1week: 99,
        },
        {
            name: 'MTB 29 inch Full Suspension',
            id: 'MTB29iFS',
            price3hours: 20,
            price1day: 25,
            price1week: 99,
        },
    ]);
    return (
        <div className="available-bikes-main">
            {availablebikes.map(bike => (
                <li>{bike.name}</li>
            ))}
        </div>
    )
};

export default BikeList;