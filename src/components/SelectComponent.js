import React from 'react';

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