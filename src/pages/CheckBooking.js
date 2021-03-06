import React, {useContext} from 'react';
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
                                <button onClick={resetBooking}>terug naar de home pagina</button>
                            </div>
                        })}
                    </h3>
                </>
            </div>
        </div>
    );
}

export default CheckBooking;