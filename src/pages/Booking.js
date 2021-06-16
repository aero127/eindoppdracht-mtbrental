import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./Booking.css"
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {useForm} from "react-hook-form";
import SelectComponent from '../components/SelectComponent'
import BikeList from '../components/BikeList'

const Booking = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [messageValue, setMessageValue] = React.useState('');
    const { handleSubmit, formState: { errors }, register, watch } = useForm();
    const [startTime, setStartTime] =  useState('');


    // hier komt een axios request naar de backend die beschikbare tijdsloten ophaalt uit de api
    // waarschijnlijk .map functie door de array itereren
    const optionsStartTime = [
        { value: '09:30', label: '⌚09:30', isDisabled: true },
        { value: '10:00', label: '⌚10:00', isDisabled: false },
        { value: '10:30', label: '⌚10:30', isDisabled: false},
        { value: '11:00', label: '⌚11:00', isDisabled: false },
        { value: '11:30', label: '⌚11:30', isDisabled: false },
        { value: '12:00', label: '⌚12:00', isDisabled: true },
        { value: '12:30', label: '⌚12:30', isDisabled: true },
        { value: '13:00', label: '⌚13:00', isDisabled: true },
        { value: '13:30', label: '⌚13:30', isDisabled: true },
        { value: '14:00', label: '⌚14:00', isDisabled: true },
        { value: '13:30', label: '⌚14:30', isDisabled: true }
    ]
    // hier komt een axios request naar de backend die beschikbare fietsen ophaalt uit de api
    // waarschijnlijk .map functie door de array itereren
    const optionsBikes = [
        { value: 'MTB26', label: 'MTB 26 inch', isDisabled: false},
        { value: 'MTB29', label: 'MTB 29 inch', isDisabled: false},
        { value: 'MTB26FS', label: 'MTB 26 inch Full Suspension', isDisabled: false},
        { value: 'MTB29FS', label: 'MTB 29 inch Full Suspension', isDisabled: false},
        { value: 'MTBKids', label: 'Kinder MTB', isDisabled: false},
        { value: 'E-MTB', label: 'Elektrische MTB', isDisabled: false}
    ]

    function onChangeInput(value) {
        console.log(value.value)
    }

        return (
            <div className="main-reservation-container">
                <div className="reservation-page-container">
                    <h1>Selecteer hier een datum;</h1>
                    <div className="calender-container">
{/*                        Na selecteren van de datum moet er een axios request komen van beschikbare
                        starttijden en fietsen voor deze datum.
                        deze fietsen en tijden moeten worden weergegeven in de select componenten*/}
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" minDate={new Date()}/>
                        {console.log(startDate)}
                        {console.log(moment(startDate).format('L'))}
                        <SelectComponent
                            className="select-time-component"
                            options ={optionsStartTime}
                            onChange={onChangeInput}
                            placeholder="Kies hier een starttijd"
                            />
                        <SelectComponent
                            className="select-bike-component"
                            options ={optionsBikes}
                            onChange={onChangeInput}
                            placeholder="Kies hier een fiets"
                            />
                        <BikeList/>
                        <button type="submit" className="booking-select-button">
                            bevestigen
                        </button>
                    </div>
                </div>
            </div>
        );
}

export default Booking;