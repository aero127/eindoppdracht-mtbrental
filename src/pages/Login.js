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
            const result = await axios.post('http://localhost:15425/authenticate', data);
            console.log(result);
            login(result.data.jwt);
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
                <label htmlFor="username" id="username">
                    Gebruikersnaam:
                    <input type="text" placeholder=" Username.." id="username" {...register("username")} /><br/>
                    {errors.username && <span className="errormessage">Dit is een verplicht veld</span>}
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