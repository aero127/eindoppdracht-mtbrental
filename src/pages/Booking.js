import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "./Booking.css"
import "react-datepicker/dist/react-datepicker.css";
import {useForm, Controller} from "react-hook-form";
import SelectComponent from '../components/SelectComponent'
import {BookingContext} from "../BookingContext";
import {useHistory} from 'react-router-dom'
import moment from "moment";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';


const Booking = () => {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [price, setPrice] = useState(0);
    const {booking, setBooking} = useContext(BookingContext);
    const [bookingAdded, setBookingAdded] = useState(false);
    const [checkBooking, setCheckBooking] = useState(false);
    const { handleSubmit, formState: { errors }, register, watch, control } = useForm();
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const [availableBikes, setAvailableBikes] =  useState()


    // hier komt een axios request naar de backend die beschikbare tijdsloten ophaalt uit de api
    // waarschijnlijk .map functie door de array itereren
    const optionsStartTime = [
        { value: '09:30', label: '⌚09:30', isDisabled: false, },
        { value: '10:00', label: '⌚10:00', isDisabled: false, },
        { value: '10:30', label: '⌚10:30', isDisabled: false, },
        { value: '11:00', label: '⌚11:00', isDisabled: false, },
        { value: '11:30', label: '⌚11:30', isDisabled: false, },
        { value: '12:00', label: '⌚12:00', isDisabled: false, },
        // { value: '12:30', label: '⌚12:30', isDisabled: true, },
        // { value: '13:00', label: '⌚13:00', isDisabled: true, },
        // { value: '13:30', label: '⌚13:30', isDisabled: true, },
        // { value: '14:00', label: '⌚14:00', isDisabled: true, },
        // { value: '13:30', label: '⌚14:30', isDisabled: true, },
    ]
    // hier komt een axios request naar de backend die beschikbare fietsen ophaalt uit de api
    // waarschijnlijk .map functie door de array itereren
    const optionsBikes = [
        { value: 1, label: 'MTB 26 inch', isDisabled: false, price1day: 25, id: 1},
        { value: 2, label: 'MTB 29 inch', isDisabled: false, price1day: 32, id: 2},
        { value: 3, label: 'MTB 26 inch Full Suspension', isDisabled: false, price1day: 37, id: 3},
        { value: 4, label: 'MTB 29 inch Full Suspension', isDisabled: false, price1day: 45, id: 4},
        { value: 5, label: 'Kinder MTB', isDisabled: false, price1day: 25, id: 5},
        { value: 6, label: 'Elektrische MTB', isDisabled: false, price1day: 49, id: 6}
    ]


    const [madebookings, setMadeBookings] = useState([]);
    const token = localStorage.getItem('token');
    let today = moment().startOf("day").format().slice(0,-6);
    console.log(today)
    let [dateSearch, setDateSearch] = useState(today)



    function handleDateSelect(data) {
        console.log(data)
        setDateSearch(()=> dateSearch = moment(data).format().slice(0,-6))
        console.log(dateSearch)
        console.log(`http://localhost:15425/bookings/?date=${dateSearch}`)
        fetchBookings(dateSearch)
    }

    async function fetchBookings(dateSearch) {
        try {
            const result = await axios.get(`http://localhost:15425/bookings/?date=${dateSearch}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setMadeBookings(result.data)
            console.log(dateSearch);
            console.log(madebookings);
            let bookedBikes = (madebookings.reduce((acc, booking) => acc + booking.amount, 0));
            console.log(bookedBikes)
            setAvailableBikes(250-bookedBikes)
            console.log(availableBikes)
        } catch (e) {
            console.error(e);
        }
    }

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

    async function finalizeBooking(data) {
        setError('');
        toggleLoading(true);
        try {
            const result = await axios.post('http://localhost:15425/bookings', {
                // date: moment(booking[0].dateinput).toISOString(),
                // rentDuration: booking[0].rentduration,
                startTime: booking[0].starttime,
                // bikeId: 1
               // startTime: "10:00",
                date: (moment(booking[0].dateinput).format().slice(0,-6)),
                username: user.username,
                bikeId: booking[0].bike,
                amount: booking[0].amount,
                helmet: booking[0].checkboxhelmet,
                spdPedals: booking[0].checkboxspd,
            });
            console.log(result.data);
            // als deze console.log wordt uitgevoerd is alles goedgegaan, want we zijn niet naar het catch blok gesprongen
            // in de console zie je de gebruikelijke respons en daarin ook 'status: 201'
            //console.log(moment(booking[0].dateinput).toString());


            setTimeout(() => {
                history.push('/profile');
            }, 2000);
        } catch (e) {
            console.error(e);
            // op het error (e) object zit altijd een message property, maar die kan wat abstract zijn. Daarom extra text:
            setError(`De booking is mislukt. Probeer het opnieuw (${e.message})`);
        }
        toggleLoading(false);

        console.log('dit moet naar de backend: ', booking);
        console.log(moment(booking[0].dateinput).toISOString())
        /*        console.log(moment(booking.dateinput).format("DD-MM-YYYY"))
                console.log(dater);*/
        // if (booking[0].rentduration === "3hours") {
        //     setPrice(20)
        //     console.log('hier kom ik langs')
        // }
        // else if (booking[0].rentduration === "1day") {
        //     setPrice(25)
        // }
        // else if (booking[0].rentduration === "1week") {
        //     setPrice(99)
        // }
        // console.log(price);
        history.push('/checkbooking')
        setCheckBooking(true);
    }

    /*    function checkBooking(booking) {
            console.log(booking)
        }*/

    return (
        <div className="bookingpage-container">
            <button className="reservation-button">Aantal fietsen beschikbaar:{availableBikes}</button>

            <div className="check-booking">{checkBooking
                ? <>
                    <h3>
                        check hier je booking
                        {booking.map((bookings) => {
                            return <div key={bookings.id}>
                                <h2 key={bookings.id} className="reservation-overview">
                                    <p>datum: {(bookings.dateinput).toISOString()}</p>
                                    <p key={bookings.id}>starttijd: {bookings.starttime}</p>
                                    <p key={bookings.id}>soort MTB: {bookings.bike}</p>
                                    <p key={bookings.id}>aantal: {bookings.amount}</p>
                                    {/*<p key={bookings.id}>termijn: {bookings.rentduration}</p>*/}
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
                                            onSelect={handleDateSelect}
                                            selected={field.value}
                                            dateFormat="dd/MM/yyyy"
                                            minDate={new Date()}
                                            required
                                        />
                                    )}
                                />
                                <h3>Huur termijn is 1 dag.</h3>
                                <div className="rent-duration">
                                    {/*<label htmlFor="3hours" id="3hours">*/}
                                    {/*    3 uren*/}
                                    {/*    <input type="radio" value="3hours" {...register("rentduration", {required: true, price: 20})}/>*/}
                                    {/*</label>*/}
                                    {/*<label htmlFor="1day" id="1day">*/}
                                    {/*    een dag*/}
                                    {/*    <input type="radio" value="1day" {...register("rentduration", {required: true, price: 25})}/>*/}
                                    {/*</label>*/}
                                    {/*<label htmlFor="1week" id="1week">*/}
                                    {/*    een week*/}
                                    {/*    <input type="radio" value="1week" {...register("rentduration", {required: true, price: 99})}/>*/}
                                    {/*</label>*/}
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
                                <div className="booking-amount-bikes">
                                    Aantal fietsen:
                                    <label className="input-amount-bikes">
                                        <input type="number" name="input-amount-bikes" id="input-amount-bikes" defaultValue="1" max="4" {...register("amount")}/>
                                        {errors.numbers && errors.numbers.type === "required" && <span className="errorMessage">Je moet hier een aantal opgeven</span>}
                                    </label>
                                </div>
                                <div className="booking-helmet-container">
                                    Helm erbij huren ?
                                    <label className="checkbox-helmet">
                                        <input type="checkbox" name="checkbox-helmet" id="checkbox-helmet" value={true} defaultChecked={true} {...register("checkboxhelmet")}/>
                                        {errors.checkBox && errors.checkBox.type === "required" && <span className="errorMessage">Je moet hier een vinkje zetten</span>}
                                    </label> ja
                                </div>
                                <div className="booking-spd-container">
                                    SPD pedalen ?
                                    <label className="checkbox-spd">
                                        <input type="checkbox" name="checkboxspd" id="checkbox-spd" value={true} defaultChecked={true} {...register("checkboxspd")}/>
                                        {errors.checkBox && errors.checkBox.type === "required" && <span className="errorMessage">Je moet hier een vinkje zetten</span>}
                                    </label> ja
                                </div>

                                <button type="submit" disabled={availableBikes===0} className="booking-select-button">
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