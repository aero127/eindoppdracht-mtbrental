import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "./Booking.css"
import "react-datepicker/dist/react-datepicker.css";
import {useForm, Controller} from "react-hook-form";
import SelectComponent from '../components/SelectComponent'
import {BookingContext} from "../BookingContext";
import moment from "moment";

const Booking = () => {
    const [duration, setDuration] = useState('');
    const {booking, setBooking} = useContext(BookingContext);
    const [bookingAdded, setBookingAdded] = useState(false);
    const [checkBooking, setCheckBooking] = useState(false);
    const { handleSubmit, formState: { errors }, register, watch, control } = useForm();

    // hier komt een axios request naar de backend die beschikbare tijdsloten ophaalt uit de api
    // waarschijnlijk .map functie door de array itereren
    const optionsStartTime = [
        { value: '09:30', label: '⌚09:30', isDisabled: true, },
        { value: '10:00', label: '⌚10:00', isDisabled: false, },
        { value: '10:30', label: '⌚10:30', isDisabled: false, },
        { value: '11:00', label: '⌚11:00', isDisabled: false, },
        { value: '11:30', label: '⌚11:30', isDisabled: false, },
        { value: '12:00', label: '⌚12:00', isDisabled: true, },
        { value: '12:30', label: '⌚12:30', isDisabled: true, },
        { value: '13:00', label: '⌚13:00', isDisabled: true, },
        { value: '13:30', label: '⌚13:30', isDisabled: true, },
        { value: '14:00', label: '⌚14:00', isDisabled: true, },
        { value: '13:30', label: '⌚14:30', isDisabled: true, },
    ]
    // hier komt een axios request naar de backend die beschikbare fietsen ophaalt uit de api
    // waarschijnlijk .map functie door de array itereren
    const optionsBikes = [
        { value: 'MTB26', label: 'MTB 26 inch', isDisabled: false, price3hours: 20, price1day: 25, price1week: 99, id: 1},
        { value: 'MTB29', label: 'MTB 29 inch', isDisabled: false, id: 2},
        { value: 'MTB26FS', label: 'MTB 26 inch Full Suspension', isDisabled: false, id: 3},
        { value: 'MTB29FS', label: 'MTB 29 inch Full Suspension', isDisabled: false, id: 4},
        { value: 'MTBKids', label: 'Kinder MTB', isDisabled: false, id: 5},
        { value: 'E-MTB', label: 'Elektrische MTB', isDisabled: false, id: 6}
    ]

    function onSubmit(data) {
        console.log(data)
        //voeg de boeking toe aan de array met boekingen
        setBooking([
            ...booking,
            data,
        ]);

        setBookingAdded(true);

        // als een gebruiker op bevestigen drukt willen we die data vasthouden
        // en als de gebruiker nog een fiets wil toevoegen dan willen we dit scherm nog een keer laten zien

    }

    function finalizeBooking(data) {
        console.log('dit moet naar de backend: ', booking);
        console.log((booking[0].dateinput).toString())
/*        console.log(moment(booking.dateinput).format("DD-MM-YYYY"))
        console.log(dater);*/
        setCheckBooking(true);
    }

/*    function checkBooking(booking) {
        console.log(booking)
    }*/

        return (
            <div className="bookingpage-container">
                <button className="reservation-button">Reserveringen ({booking.length})</button>

                <div className="check-booking">{checkBooking
                    ? <>
                        <h3>
                            check hier je booking
                            {booking.map((bookings) => {
                                return <div key={bookings.id}>
                                    <h2 key={bookings.id} className="reservation-overview">
                                        <p>datum: {(bookings.dateinput).toString()}</p>
                                        <p key={bookings.id}>starttijd: {bookings.starttime}</p>
                                       <p key={bookings.id}>soort MTB: {bookings.bike}</p>
                                        <p key={bookings.id}>termijn: {bookings.rentduration}</p>
                                        <p key={bookings.id}>helm: {bookings.checkboxhelmet}</p>
                                        <p key={bookings.id}>spd: {bookings.checkboxspd}</p>
                                    </h2>
                                </div>
                            })}
                        </h3>
                    </>
                    : <> </>}</div>


                <div className="main-reservation-container">
                {bookingAdded
                    ? <>
                        <h3 className="successfull-booking">Succesvol geboekt. Wil je nog een fiets huren?</h3>
                        <button type="button" onClick={() => setBookingAdded(false)}>Ja</button>
                        <button type="button" onClick={finalizeBooking}>Nee</button>
                    </>
                    : <>
                            <h1>Reservering maken</h1>
                            <h3>Selecteer hier een datum</h3>
                            <div className="calender-container">

                        {/*                        Na selecteren van de datum moet er een axios request komen van beschikbare
                        starttijden en fietsen voor deze datum.
                        deze fietsen en tijden moeten worden weergegeven in de select componenten*/}
                            <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
                            {/*                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" minDate={new Date()}/>*/}
                            <Controller
                                control={control}
                                name='dateinput'
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='Kies hier een datum'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        required
                                    />
                                )}
                            />
                            <h3>Huur termijn:</h3>
                            <div className="rent-duration">
                                <label htmlFor="3hours" id="3hours">
                                    3 uren
                                    <input type="radio" value="3hours" {...register("rentduration", {required: true, price: 20})}/>
                                </label>
                                <label htmlFor="1day" id="1day">
                                    een dag
                                    <input type="radio" value="1day" {...register("rentduration", {required: true, price: 25})}/>
                                </label>
                                <label htmlFor="1week" id="1week">
                                    een week
                                    <input type="radio" value="1week" {...register("rentduration", {required: true, price: 99})}/>
                                </label>
                            </div>
{/*                            {console.log(startDate)}
                            {console.log(moment(startDate).format('L'))}*/}
                            <h3>Selecteer een starttijd</h3>
                            <SelectComponent
                                className="select-time-component"
                                options ={optionsStartTime}
                                /*onChange={onChangeInput}*/
                                placeholder="Kies hier een starttijd"
                                register={register("starttime")}
                            />
                            <h3>Selecteer een mountainbike</h3>
                            <SelectComponent
                                className="select-bike-component"
                                options ={optionsBikes}
                                /*onChange={onChangeInput}*/
                                placeholder="Kies hier een fiets"
                                register={register("bike")}
                            />

                            <div className="booking-helmet-container">
                                Helm erbij huren ?
                            <label className="checkbox-helmet">
                                <input type="checkbox" name="checkbox-helmet" id="checkbox-helmet" value="Ja" {...register("checkboxhelmet")}/>
                                {errors.checkBox && errors.checkBox.type === "required" && <span className="errorMessage">Je moet hier een vinkje zetten</span>}
                            </label> ja
                            </div>
                            <div className="booking-spd-container">
                                SPD pedalen ?
                                <label className="checkbox-spd">
                                    <input type="checkbox" name="checkboxspd" id="checkbox-spd" value="Ja" {...register("checkboxspd")}/>
                                    {errors.checkBox && errors.checkBox.type === "required" && <span className="errorMessage">Je moet hier een vinkje zetten</span>}
                                </label> ja
                            </div>

                            <button type="submit" className="booking-select-button">
                                bevestigen
                            </button>
                        </form>
                    </div>
                    </>
                }
                    </div>
            </div>
        );
}

export default Booking;