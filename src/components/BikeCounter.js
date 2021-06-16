import React, {useState} from 'react';
import './BikeCounter.css'

function BikeCounter(props) {
    const [counter, setCounter] = useState(0)
    return (
        <div classname="bikes-counter">
            <button className="bikecounter-button-minus" onClick={()=> setCounter(counter -1)} disabled={(counter === 0)}>-</button>
            <h3>{counter}</h3>
            <button className="bikecounter-button-plus" onClick={()=> setCounter(counter +1)}>+</button>
        </div>
    );
}

export default BikeCounter;