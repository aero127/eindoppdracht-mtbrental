import React from 'react';
import { useForm } from 'react-hook-form';


function LostPassword(props) {
    const { handleSubmit, formState: { errors }, register } = useForm({ mode: 'onChange' });

    function onFormSubmit(data) {
        console.log(data);
    }

    return (
        <div className="main-lostpw-container">
            <div className="lostpw-form-container">
                <form className="lostpw-form" onSubmit={handleSubmit(onFormSubmit)}>
                    <h1>Wachtwoord vergeten ?</h1>
                    <p className="lostpw-text" id="lostpw-text">Voer hieronder uw email-adres in en u ontvangt een e-mail met een nieuw wachtwoord.</p>
                    <h2>Email-adres</h2>
                    <div className="mail-wrapper">
                        <label htmlFor="lostpassword" id="lostpassword">
                            <input type="text" placeholder="Email-adres.." id="emailadreslostpw" {...register("emailadres", {required: true, pattern: {
                                value: /^\S+@\S+$/i,
                                    message: "Geen geldig email adres"
                            }})}/>
                            {errors.emailadres && <span className="errormessage">Voer een geldig email adres in</span>}
                        </label>
                    </div>
                    <button type="submit">Reset wachtwoord</button>
                </form>
            </div>
        </div>
    );
}

export default LostPassword;