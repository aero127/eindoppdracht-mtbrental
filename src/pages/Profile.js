import React, { useContext, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Profile.css'
import moment, {isDate} from "moment";
import {Controller, useForm} from "react-hook-form";


function Profile() {
    const [privateContent, setPrivateContent] = useState({});
    const [users, setUsers] = useState([]);
    let [userBooking, setUserBooking] =  useState ([])
    const { logout } = useContext(AuthContext);
    const { handleSubmit, formState: register } = useForm();
    let searchDate = "";
    const { user } = useContext(AuthContext);
    const { upload } = useContext(AuthContext);
    const [succes, setSucces] = useState(false);


    function onSubmit(data) {
        searchDate = (moment(data.dateinput).format().slice(0,-6))
    }

    const formData = new FormData();

    const formSubmit = (data) => {
        formData.append("file", data.identificationPath[0])
        sendInfo(formData)
    }

    async function sendInfo (formData) {
        try {
            const result = await axios.post(`http://localhost:15425/users/${user.username}/license`, formData
            )
            console.log(result)
            if (result.status===200){setSucces(true)}
        } catch (e) {
            console.log(console.error(e))
        }
    }



    useEffect(() => {
        const token = localStorage.getItem('token');

        async function getPrivateContent() {
            try {
               const userresult = await axios.get('http://localhost:15425/users', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUsers(userresult.data)
                setPrivateContent(userresult.data);
                const bookingresult = await axios.get(`http://localhost:15425/bookings/?username=${user.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUserBooking(bookingresult.data);
            } catch(e) {
                console.error(e);
            }
        }

        getPrivateContent();
    }, []);


    return (
        <>
            <div className="profile-page">
                <div className="profile-container">
                {user.authority === "USER" ? (
                <>
                    <h1>Mijn gegevens</h1>
                    <h2>Gegevens</h2>
                    <p>Welkom terug <strong>{user.username}!</strong></p>
                    <p>Volledige naam: <strong>{user.voornaam} {user.achternaam}</strong></p>
                    <p>Jouw emailadres is: <strong>{user.email}</strong></p>
                    {userBooking.length !== 0 ? (
                        <>
                            Mijn boekingen:
                            {userBooking.map(booking => {
                                return <li key={booking.id}>ID: {booking.id} Datum: {moment(booking.date).format().slice(0,-15)} Starttijd: {booking.startTime} Fiets: {booking.bike.bikeName} Aantal: {booking.amount} Prijs: € {booking.price},-</li>
                            })}
                        </>
                    ) : (
                        <>
                            <p>Je hebt nog geen boekingen</p>
                        </>)}
                    {upload != null && user.authority === "USER" ? (
                        <>
                            <p>Je hebt al een ID ge-upload!</p>
                        </>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit(formSubmit)} className="upload-functie">
                                <div>
                                    <h3>Om meer dan 2 fietsen te reserveren is een kopie van identificatie vereist!</h3>
                                    <h3>Alleen PDF bestanden worden geaccepteerd met een maximale bestandsgrootte van 1MB</h3>
                                </div>
                                <input type="file"
                                       {...register("identificationPath", {
                                           required:false
                                       })}/>
                                <input type="submit" value="Uploaden"/>
                                {succes && <p>
                                    het is gelukt!
                                </p>}
                            </form>
                        </>
                    )}
                </>
                    ) : (
                        <></>
                )}
                    {user.authority === "ADMIN" ? (
                        <>
                            <div className="userlist-container">
                                <h1>ADMIN pagina</h1>
                                <h3>Lijst met users:</h3>
                                <ul>
                                    {users.map(user => {
                                        return <li key={user.id}>{user.username}</li>
                                    })}
                                </ul>
                                <h3>boekingen zoeken op datum <Link to="/zoeken-op-datum">HIER!</Link></h3>
                            </div>
                        </>
                ) : (
                    <>
                    </>
                )}
                    <p>Terug naar de <Link to="/">Homepagina</Link></p>
                    <button id="logout-button" onClick={logout}>Uitloggen</button>
                </div>
            </div>
        </>
    );
}

export default Profile;