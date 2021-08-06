import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "./Booking.css"
import "react-datepicker/dist/react-datepicker.css";
import {useForm, Controller} from "react-hook-form";
import SelectComponent from '../components/SelectComponent'
import {BookingContext} from "../context/BookingContext";
import {useHistory} from 'react-router-dom'
import moment from "moment";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';


const Booking = () => {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const { upload } = useContext(AuthContext);
    const {booking, setBooking} = useContext(BookingContext);
    const [bookingAdded, setBookingAdded] = useState(false);
    const [checkBooking, setCheckBooking] = useState(false);
    const { handleSubmit, formState: { errors }, register, control } = useForm();
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const [availableBikes, setAvailableBikes] =  useState()
    let [maxBikesToRent, setMaxBikesToRent] = useState();


    const optionsStartTime = [
        { value: '09:30', label: '⌚09:30', isDisabled: false, },
        { value: '10:00', label: '⌚10:00', isDisabled: false, },
        { value: '10:30', label: '⌚10:30', isDisabled: false, },
        { value: '11:00', label: '⌚11:00', isDisabled: false, },
        { value: '11:30', label: '⌚11:30', isDisabled: false, },
        { value: '12:00', label: '⌚12:00', isDisabled: false, },

    ]

    const optionsBikes = [
        { value: 1, label: 'MTB 26 inch, €35,- ps.', isDisabled: false, price1day: 25, id: 1},
        { value: 2, label: 'MTB 29 inch', isDisabled: true, price1day: 32, id: 2},
        { value: 3, label: 'MTB 26 inch Full Suspension', isDisabled: true, price1day: 37, id: 3},
        { value: 4, label: 'MTB 29 inch Full Suspension', isDisabled: true, price1day: 45, id: 4},
        { value: 5, label: 'Kinder MTB', isDisabled: true, price1day: 25, id: 5},
        { value: 6, label: 'Elektrische MTB', isDisabled: true, price1day: 49, id: 6}
    ]


    let [madebookings, setMadeBookings] = useState([]);
    const token = localStorage.getItem('token');
    let today = moment().startOf("day").format().slice(0,-6);
    let [dateSearch, setDateSearch] = useState(today)



    function handleDateSelect(data) {
        setDateSearch(()=> dateSearch = moment(data).format().slice(0,-6))
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
            setMadeBookings(madebookings = result.data);
            let bookedBikes = (madebookings.reduce((acc, booking) => acc + booking.amount, 0));
            setAvailableBikes(250-bookedBikes)
            if(upload != null) {
                setMaxBikesToRent(()=> maxBikesToRent = "10");
            } else {
                setMaxBikesToRent(()=> maxBikesToRent = "2");
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function onSubmit(data) {
        setBooking([
            ...booking,
            data,
        ]);

        setBookingAdded(true);
        setTimeout(() => {
            // finalizeBooking();
        }, 2000);
    }

    async function finalizeBooking(data) {
        setError('');
        toggleLoading(true);
        try {
            const result = await axios.post('http://localhost:15425/bookings', {
                startTime: booking[0].starttime,
                date: (moment(booking[0].dateinput).format().slice(0,-6)),
                username: user.username,
                bikeId: booking[0].bike,
                amount: booking[0].amount,
                helmet: booking[0].checkboxhelmet,
                spdPedals: booking[0].checkboxspd,
            });
            console.log(result)

            setTimeout(() => {
                history.push('/checkbooking')
            }, 2000);
        } catch (e) {
            console.error(e);
            setError(`De booking is mislukt. Probeer het opnieuw (${e.message})`);
        }
        toggleLoading(false);

        //console.log('dit moet naar de backend: ', booking);
        // console.log(moment(booking[0].dateinput).toISOString())

        setCheckBooking(true);
    }


    return (
        <div className="bookingpage-container">
            <button className="reservation-button">Aantal fietsen beschikbaar:{availableBikes}</button>


            <div className="main-reservation-container">
                {bookingAdded
                    ? <>
                        <h3 className="successfull-booking">Succesvol geboekt!</h3>
                        {/*<button type="button" onClick={() => setBookingAdded(false)}>Ja</button>*/}
                        <button type="button" onClick={finalizeBooking}>Verder</button>
                    </>
                    : <>
                        <h1>Reservering maken</h1>
                        <div className="max-bikes-per-user">
                        <p>Per gebruiker kunnen max 2 fietsen gehuurd worden.</p>
                        <p>Wanneer een kopie van ID is ge-upload worden dit er max 10!</p></div>
                        <h3>Selecteer hier een datum</h3>
                        <div className="calender-container">

                            <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
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
                                <h3>Selecteer een starttijd</h3>
                                <SelectComponent
                                    className="select-time-component"
                                    options ={optionsStartTime}
                                    placeholder="Kies hier een starttijd"
                                    register={register("starttime")}
                                />
                                <h3>Selecteer een mountainbike</h3>
                                <SelectComponent
                                    className="select-bike-component"
                                    options ={optionsBikes}
                                    placeholder="Kies hier een fiets"
                                    register={register("bike")}
                                />
                                <div className="booking-amount-bikes">
                                    Aantal fietsen:
                                    <label className="input-amount-bikes">
                                        <input type="number" name="input-amount-bikes" id="input-amount-bikes" defaultValue="1" max={maxBikesToRent} {...register("amount")}/>
                                        {errors.numbers && errors.numbers.type === "required" && <span className="errorMessage">Je moet hier een aantal opgeven</span>}
                                        {availableBikes === 0 ? <> <p className="no-available-bikes">Er zijn geen fietsen meer beschikbaar!</p> </>: <> </>}
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
};

export default Booking;