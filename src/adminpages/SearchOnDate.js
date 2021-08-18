import React, { useContext, useState } from 'react';
import axios from 'axios';
import "./SearchOnDate.css"
import { AuthContext } from '../context/AuthContext';
import moment from "moment";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";


function SearchOnDate() {
    const { user } = useContext(AuthContext);
    const { handleSubmit, formState: control } = useForm();
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem('token');
    let [dateSearch, setDateSearch] = useState('2021-07-21T00:00:00')

    function onSubmit(data) {
        setDateSearch(()=> dateSearch = moment(data.dateinput).format().slice(0,-6))
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
                    setBookings(result.data)
                } catch (e) {
                    console.error(e);
                }
            }


    return(
        <div className="search-on-date-page">
        <>
            {user.authority === "ADMIN" ? (
                <>
                    <form className="booking-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="choose-date-bookings">
                            <Controller
                                control={control}
                                name='dateinput'
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='Kies hier een datum'
                                        onChange={(dateSearch) => field.onChange(dateSearch)}
                                        selected={field.value}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date()}
                                        required
                                    />
                                )}
                            />
                        </div>
                        <button type="submit">zoek op deze datum</button>
                    </form>
                    <div className="bookinglist-container">
                        <h3>Lijst met boekingen:</h3>
                        <ul>
                            {bookings.map(booking => {
                                return <li key={booking.id}>Boeking ID:{booking.id} Starttijd: {booking.startTime} MTB: {booking.bike.bikeName} Aantal: {booking.amount} Prijs: €{booking.price},-</li>
                            })}
                            totaal aantal verhuurde fietsen:{(bookings.reduce((acc, booking) => acc + booking.amount, 0))}
                        </ul>
                    </div>
                </>
            ) : (
                <>Geen rechten !</>
            )}
        </>
        </div>
    );
}

export default SearchOnDate;
