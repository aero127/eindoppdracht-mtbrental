import React, { useContext, useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Profile.css'
import moment, {isDate} from "moment";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";


function Profile() {
    const [privateContent, setPrivateContent] = useState({});
    const [users, setUsers] = useState([]);
    // const [searchDate, setSearchDate] = useState([])
    const [bookings, setBookings] = useState([]);
    let [userBooking, setUserBooking] =  useState ([])
    const { logout } = useContext(AuthContext);
    const { idUpload } = useContext(AuthContext);
    const { handleSubmit, formState: { errors }, register, watch, control } = useForm();
    let searchDate = "";
    const { user } = useContext(AuthContext);
    const { upload } = useContext(AuthContext);
    const [succes, setSucces] = useState(false);
    // const [fail, setFail] = useState(false);
    console.log(user); // geeft { user: { username: 'string waarde', email: 'string waarde', id: 'string waarde', country: 'string waarde' }


    function onSubmit(data) {
        console.log(data)
        searchDate = (moment(data.dateinput).format().slice(0,-6))
        console.log(searchDate);
        console.log(`http://localhost:15425/bookings/?date=${searchDate}`)

    }

    const formData = new FormData();

    const formSubmit = (data) => {
        console.log(data)
        formData.append("file", data.identificationPath[0])
        sendInfo(formData)
        console.log(data.identificationPath[0])
    }

    async function sendInfo (formData) {

        try {
            const result = await axios.post(`http://localhost:15425/users/${user.username}/license`, formData
            )
            if (result.status===200){setSucces(true)}
            // else {setFail(true)}
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
                console.log(userresult.data);
                // setBookings(result.data)
                setPrivateContent(userresult.data);
                const bookingresult = await axios.get(`http://localhost:15425/bookings/?username=${user.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(bookingresult.data);
                setUserBooking(()=> userBooking = bookingresult.data);
                console.log(userBooking);
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
                    {console.log(user)}

            {/*<section>*/}
                {user.authority === "ROLE_USER" ? (
                <>
                    <h1>Mijn gegevens</h1>
                    <h2>Gegevens</h2>
                    <p>Welkom terug <strong>{user.username}!</strong></p>
                    <p>Volledige naam: <strong>{user.voornaam} {user.achternaam}</strong></p>
                    <p>Jouw emailadres is: <strong>{user.email}</strong></p>
                    {userBooking.length != 0 ? (
                        <>
                    Mijn boekingen:
                    {userBooking.map(booking => {
                        return <li>ID: {booking.id} Datum: {moment(booking.date).format().slice(0,-15)} Starttijd: {booking.startTime} Fiets: {booking.bike.bikeName} Aantal: {booking.amount} Prijs: € {booking.price},-</li>
                    })}
                        </>) : ( <>
                        <p>Je hebt nog geen boekingen</p>

                    </>)}
                    {upload != null && user.authority === "ROLE_USER" ? (
                        <>
                            <p>Je hebt al een ID ge-upload!</p>
                        </> ) : ( <>
                            <form onSubmit={handleSubmit(formSubmit)} className="upload-functie">
                                <div>
                                    <h3>Voor boekingen boven de 200 euro is een kopie van identificatie vereist.</h3>
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
                {/*}*/}
                {user.authority === "ROLE_ADMIN" ? (

                    <>

                    {/*<form className="booking-form" onSubmit={handleSubmit(onSubmit)}>*/}
                    {/*    <div className="choose-date-bookings">*/}
                    {/*        <Controller*/}
                    {/*            control={control}*/}
                    {/*            name='dateinput'*/}
                    {/*            render={({ field }) => (*/}
                    {/*                <DatePicker*/}
                    {/*                    placeholderText='Kies hier een datum'*/}
                    {/*                    onChange={(date) => field.onChange(date)}*/}
                    {/*                    selected={field.value}*/}
                    {/*                    dateFormat="dd/MM/yyyy"*/}
                    {/*                    minDate={new Date()}*/}
                    {/*                    required*/}
                    {/*                />*/}
                    {/*            )}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <button type="submit">zoek op deze datum</button>*/}
                    {/*    </form>*/}
                        <div className="userlist-container">
                            <h1>ADMIN pagina</h1>
                        <h3>Lijst met users:</h3>
                        <ul>
                            {users.map(user => {
                                return <li>{user.username}</li>
                            })}


                        </ul>
                            <h3>boekingen zoeken op datum <Link to="/zoeken-op-datum">HIER!</Link></h3>
                        </div>
                    </>
                ) : (
                    <></>
                )}




                {/*</form>*/}
            {/*</section>*/}

            {privateContent &&
            <section>

                {/*<h2>Afgeschermde content voor ingelogde gebruikers</h2>*/}
                {/*<h4>{privateContent.name}</h4>*/}
                {/*<p>{privateContent.content}</p>*/}
            </section>
            }
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
                    <button id="logout-button" onClick={logout}>Uitloggen</button>
            </div>
            </div>
            </>
    );
}

export default Profile;