import React, {useState} from 'react';
import './Registration.css';
import {useForm} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

function Registration() {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');
    const [registerSuccess, toggleRegisterSuccess] = useState(false);
    const { handleSubmit, formState: { errors }, register } = useForm({ mode: 'onChange', reValidateMode: 'onChange' });
    const [password, setPassword] =  useState(null)
    const history = useHistory();


    function validatePassword (value) {
        if (password !== value)
            return false;
    }
    async function onSubmit(data) {
        // omdat onSubmit meerdere keren kan worden aangeroepen, beginnen we altijd met een "schone" lei (geen errors)
        setError('');
        toggleLoading(true);

        try {
            const result = await axios.post('http://localhost:15425/users/register', {
                username: data.username,
                password: data.password,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName
            }, );
            const postRole = await axios.post(`http://localhost:15425/users/${data.username}/authorities`, {
                username: data.username,
                authority: "USER"
            })


            toggleRegisterSuccess(true);
            setTimeout(() => {
                history.push('/login');
            }, 2000);
        } catch (e) {
            console.error(e);
            setError(`Het registeren is mislukt. Probeer het opnieuw (${e.message})`);
        }
        toggleLoading(false);
    }

    return (
        <>
        <div className="main-registration-container">
            <div className="registration-form-container">
                <h1 className="registreren-h1">Registreren</h1>
                <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="firstname-wrapper">
                        <label htmlFor="username-registration" id="username">
                            <input type="text" placeholder="Gebruikersnaam.." id="username-registration" {...register("username", {required: true})}/>
                            {errors.username && errors.username.type === "required" && <span className="errormessage-register">Dit veld is verplicht.</span>}
                        </label>
                        <label htmlFor="firstname-registration" id="firstname">
                            <input type="text" placeholder="Voornaam.." id="firstname-registration" {...register("firstName", {required: true})}/>
                            {errors.voornaam && errors.voornaam.type === "required" && <span className="errormessage-register">Dit veld is verplicht.</span>}
                        </label>
                        <label htmlFor="lastname-registration" id="lastname">
                            <input type="text" placeholder="Achternaam.." id="lastname-registration" {...register("lastName", {required: true})}/>
                            {errors.achternaam && errors.achternaam.type === "required" && <span className="errormessage-register">Dit veld is verplicht.</span>}
                        </label>
                        <label htmlFor="email-registration" id="email-registration">
                            <input type="text" placeholder="E-mail.." id="email-registration" {...register("email", {required: true, pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Geen geldig email adres"
                            }})}/>
                            {errors.emailadres && <span className="errormessage-register">Voer een geldig email adres in</span>}
                        </label>
                        <label htmlFor="password" id="password">
                            <input type="password" placeholder="Wachtwoord.." id="password-registration" {...register("password", {required: true, minLength: 8, validate: (value) => validatePassword(value) ,pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                    message: "Geen geldig wachtwoord"
                                }})}/>
                            {errors.password && errors.password.type === "required" && <span className="errormessage-register">Dit veld is verplicht.</span>}
                            {errors.password && errors.password.type === "minLength" && <span className="errormessage-minlength">Het wachtwoord moet minimaal 8 tekens bevatten</span>}
                            {errors.password && errors.password.type === "pattern" && <span className="errormessage-pattern">Het wachtwoord moet minimaal 1 Hoofdletter, 1 kleine letter en een cijfer bevatten</span>}
                        </label>
                        <label htmlFor="password-confirm" id="password-confirm">
                            <input type="password" placeholder="Wachtwoord bevestigen.." id="password-confirm-registration" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            {errors.passwordconfirm && errors.passwordconfirm.type === "required" && <span className="errormessage-register">Dit veld is verplicht.</span>}
                            {errors.password && errors.password.type === "validate" && <span className="errormessage-register" id="password-check">Wachtwoorden komen niet overeen.</span>}
                        </label>
                        <label className="checkbox-newsletter">
                            <input type="checkbox" defaultChecked="checked" name="checkboxnewsletter" id="checkbox-newsletter" value="Ja" {...register("newsletter")}/>
                            {errors.checkBox && errors.checkBox.type === "required" && <span className="errorMessage">Je moet hier een vinkje zetten</span>}
                            <div className="newsletter-signup">Aanmelden nieuwsbrief</div>
                        </label>
                    </div>
                    <div className="register-already-registered">
                        <Link to="/login" style={{color: 'white',textDecoration: 'none'}}>Al een account? Log in!</Link>
                        <button type="submit" disabled={loading} >{loading ? 'Registreer' : 'Maak account aan'}</button>
                    </div>
                    {registerSuccess === true &&  <p>Registeren is gelukt! Je wordt nu doorgestuurd naar de inlog pagina!</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
        </>
    );
}

export default Registration;

