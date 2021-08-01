import React, {useContext, useState} from 'react';
import {BookingContext} from "../context/BookingContext";
import './CheckBooking.css';
import moment from "moment";
import { useHistory } from 'react-router-dom';


function CheckBooking() {
 const {booking, setBooking} = useContext(BookingContext)
 const history = useHistory();

    function resetBooking() {
     setBooking([]);
     history.push("/");
    }
    return (
        <div className="booking-check-page">
        <div className="bookings-check">
            <>
                <h3>
                    {console.log(booking)}
                        Je hebt het volgende geboekt
                        {booking.map((bookings, index) => {
                            return <div className="checkbooking-container" key={index}>
                                <h2 className="reservation-overview">
                                    <p>datum: {(moment(bookings.dateinput).format().slice(0,-15))}</p>
                                    <p>starttijd: {bookings.starttime}</p>
                                    <p>soort MTB: 26 inch MTB</p>
                                    <p>aantal fietsen: {bookings.amount}</p>
                                    <p>termijn: 1 dag</p>
                                    <p>helm: {bookings.checkboxhelmet}</p>
                                    <p>spd: {bookings.checkboxspd}</p>
                                    {bookings.checkboxhelmet ? <>
                                        <p>Prijs: €{((bookings.amount) * 35) + ((bookings.amount)) * 4},-</p>
                                        </> : <>
                                            <p>Prijs: €{(bookings.amount) * 35},-</p>
                                        </>
                                        }



                                </h2>
                                <button onClick={resetBooking}>verder-></button>
                            </div>
                        })}
                    </h3>

{/*                <h3>
                    check hier je booking
                    {booking.map((bookings) => {
                        return <div key={bookings.id}>
                            <h2 key={bookings.id} className="reservation-overview">
                                                                        <p>datum: {bookings.dateinput}</p>
                                <p>starttijd: {bookings.starttime}</p>
                                <p>soort MTB: {bookings.bike}</p>
                                <p>termijn: {bookings.rentduration}</p>
                                <p>helm: {bookings.checkboxhelmet}</p>
                                <p>spd: {bookings.checkboxspd}</p>
                            </h2>
                        </div>
                    })}
                </h3>*/}
                </>
        </div>
        </div>
    );
}

export default CheckBooking;