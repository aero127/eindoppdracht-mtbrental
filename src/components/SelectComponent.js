import React from 'react';
import Select from "react-select";


    function SelectComponent({options, onChange, placeholder, disabled}) {
        return <div>
            <Select options={options} onChange={onChange} placeholder={placeholder} disabled={disabled}
                    />
        </div>
    }


export default SelectComponent;