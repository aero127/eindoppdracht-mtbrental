import React, { useContext } from 'react';
import Select from "react-select";
import {BookingContext} from "../context/BookingContext";


function SelectComponent({options, placeholder, register}) {
    return (<select
        placeholder={placeholder}
        {...register}
    >
        {options.map((option, idx) => {
            return <option disabled={option.isDisabled} key={idx} value={option.value}>{option.label}</option>

        })}
    </select>
    );
}


export default SelectComponent;