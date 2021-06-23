import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';
import {Link} from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


function Login() {
    const { handleSubmit, formState: { errors }, register } = useForm({ mode: 'onChange' });
    //const alles = useContext(AuthContext);
    //console.log(alles);
    const { login } = useContext(AuthContext);

    async function onSubmit(data) {
        console.log(data);
        try {
            const result = await axios.post('http://localhost:3000/login', data);
            console.log(result);
            login(result.data.accessToken);
        } catch(e) {
            console.error(e, "Kapoet!");
        }
    }


    return (
        <>
        <div className="main-login-container">
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Inloggen</h2>
                <label htmlFor="emailadres" id="emailadres">
                    Email adres:
                    <input type="text" placeholder=" Email-adres.." id="emailadres" {...register("email", {required: true, pattern: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Geen geldig email adres"

                }})} /><br/>
                    {errors.emailadres && <span className="errormessage">Voer een geldig email adres in</span>}
                </label>

                <label htmlFor="password" id="password">
                    Wachtwoord:
                    <br/>
                    <input type="password" placeholder=" Wachtwoord.." id="password" {...register("password", {required: true})}/>
                    <br/>
                    {errors.password && errors.password.type === "required" && <span className="errormessage">Dit veld is verplicht.</span>}
                </label>

                <div className="register-createaccount">
                    <Link to="/registration" style={{color: 'white',textDecoration: 'none'}}>Account aanmaken</Link></div>
                <div className="register-forgotpassword">
                    <Link to="/lostpassword" style={{color: 'white',textDecoration: 'none'}}>Wachtwoord vergeten?</Link></div>

                <button type="submit">Login</button>
            </form>
        </div>
        </div>
        </>
    );
}

export default Login;