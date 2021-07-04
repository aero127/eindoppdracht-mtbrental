import React, {useContext} from 'react';
import {BookingContext} from "../BookingContext";
import './checkBooking.css';


function CheckBooking() {
 const {booking, setBooking} = useContext(BookingContext)

    return (
        <div className="booking-check-page">
        <div className="bookings-check">
            <>
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