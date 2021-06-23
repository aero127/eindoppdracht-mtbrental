import React, {useContext} from 'react';
import { BookingProvider } from './BookingContext'
import {BookingContext} from "../BookingContext";


function CheckBooking() {
 const [booking, setBooking] = useContext(BookingContext)

    return (
        <div className="bookings-check">
            <>
                <h3>
                    check hier je booking
                    {booking.map((bookings) => {
                        return <div key={bookings.id}>
                            <h2 key={bookings.id} className="reservation-overview">
                                {/*                                        <p>datum: {bookings.dateinput}</p>*/}
                                <p>starttijd: {bookings.starttime}</p>
                                <p>soort MTB: {bookings.bike}</p>
                                <p>termijn: {bookings.rentduration}</p>
                                <p>helm: {bookings.checkboxhelmet}</p>
                                <p>spd: {bookings.checkboxspd}</p>
                            </h2>
                        </div>
                    })}
                </h3>
                </>
        </div>
    );
}

export default CheckBooking;