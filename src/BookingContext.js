import React, { useState, createContext } from "react";

export const BookingContext = createContext({});


export const BookingProvider = props => {
    const [booking, setBooking] = useState([])

    return (
        <BookingContext.Provider value={{setBooking:setBooking, booking:booking }}>
            {props.children}
        </BookingContext.Provider>
    );
}