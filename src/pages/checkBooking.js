import React, {useContext} from 'react';
import {BookingContext} from "../BookingContext";
import './checkBooking.css';
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
                        {booking.map((bookings) => {
                            return <div key={bookings.id}>
                                <h2 key={bookings.id} className="reservation-overview">
                                    <p>datum: {(moment(bookings.dateinput).format().slice(0,-15))}</p>
                                    <p key={bookings.id}>starttijd: {bookings.starttime}</p>
                                    <p key={bookings.id}>soort MTB: 26 inch MTB</p>
                                    <p key={bookings.id}>aantal fietsen: {bookings.amount}</p>
                                    <p key={bookings.id}>termijn: 1 dag</p>
                                    <p key={bookings.id}>helm: {bookings.checkboxhelmet}</p>
                                    <p key={bookings.id}>spd: {bookings.checkboxspd}</p>
                                    {bookings.checkboxhelmet ? <>
                                        <p key={bookings.id}>Prijs: €{((bookings.amount) * 35) + ((bookings.amount) * 4)},-</p>
                                        </> : <>
                                            <p key={bookings.id}>Prijs: €{(bookings.amount) * 35},-</p>
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