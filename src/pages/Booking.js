import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./Booking.css"
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {useForm} from "react-hook-form";
import SelectComponent from '../components/SelectComponent'

const Booking = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [messageValue, setMessageValue] = React.useState('');
    const { handleSubmit, formState: { errors }, register, watch } = useForm();
    const [startTime, setStartTime] =  useState('');

    const options = [
        { value: '09:30', label: '⌚09:30' },
        { value: '10:00', label: '⌚10:00' },
        { value: '10:30', label: '⌚10:30' },
        { value: '11:00', label: '⌚11:00' },
        { value: '11:30', label: '⌚11:30' },
        { value: '12:00', label: '⌚12:00' },
        { value: '12:30', label: '⌚12:30' },
        { value: '13:00', label: '⌚13:00' },
        { value: '13:30', label: '⌚13:30' },
        { value: '14:00', label: '⌚14:00' },
        { value: '13:30', label: '⌚14:30' }
    ]

    function onChangeInput(value) {
        console.log(value.value)
    }

        return (
            <div className="main-reservation-container">
                <div className="reservation-page-container">
                    <h1>Selecteer hier een datum;</h1>
                    <div className="calender-container">
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
                        {console.log(startDate)}
                        {console.log(moment(startDate).format('L'))}
                        <SelectComponent
                            options ={options}
                            onChange={onChangeInput}
                            placeholder="Kies hier een starttijd"
                            disabled={true}
                            />
                    </div>
                </div>
            </div>
        );
}

export default Booking;