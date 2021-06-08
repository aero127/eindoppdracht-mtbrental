import React from 'react';
import { useForm } from 'react-hook-form';


function Login(background_login) {
    const { handleSubmit, formState: { errors }, register } = useForm({ mode: 'onChange' });


    function onFormSubmit(data) {
        console.log(data);
    }


    return (
        <div className="main-login-container">
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
                <h2>Inloggen</h2>
                <label htmlFor="emailadres" id="emailadres">
                    Email adres:
                    <input type="text" placeholder=" Email-adres.." id="emailadres" {...register("emailadres", {required: true, pattern: {
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
                 Account aanmaken</div>
                <div className="register-forgotpassword">
                    Wachtwoord vergeten</div>

                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
}

export default Login;