import React, { useState } from "react";

const BikeList = () => {
    const [availablebikes, setAvailableBikes] = useState([
        {
            name: 'MTB 26 inch',
            id: 'MTB26i'
        },
        {
            name: 'MTB 29 inch',
            id: 'MTB29i'
        },
        {
            name: 'MTB 26 inch Full Suspension',
            id: 'MTB26iFS'
        },
        {
            name: 'MTB 29 inch Full Suspension',
            id: 'MTB29iFS'
        },
    ]);
    return (
        <div>
            {availablebikes.map(bike => (
                <li>{bike.name}</li>
            ))}
        </div>
    )
}

export default BikeList;