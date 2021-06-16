import {useForm} from "react-hook-form";
import React from "react";
import "./Contact.css";
import mtbtire from "../assets/bicycle-tires.jpg"

export default function Contact() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    function onFormSubmit(data) {
        console.log(data);
    }

    return (
        <div className="contact-page-container">
            <div className="contact-picture-container">
                <img src={mtbtire}  alt="mtb-rental" className="contact-page-picture"/>
            </div>
            <div className="contact-page">
                <h1 className="contact-page-title">Stuur een bericht</h1>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor="naam" id="contact-name">
                        <input type="text" placeholder="Naam" {...register("naam", {required: true, min: 3, maxLength: 18})} />
                        {errors.naam && errors.naam.type === "required" && <span className="errormessage">Dit veld is verplicht.</span>}
                        {errors.naam && errors.naam.type === "min" && <span className="errormessage">Naam moet minimaal 3 karakters bevatten.</span>}
                        {errors.naam && errors.naam.type === "maxLength" && <span className="errormessage">Naam mag maximaal 18 karakters lang zijn.</span>}
                    </label>
                    <label htmlFor="email" id="contact-email">
                        <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i})} />
                        {errors.email && errors.email.type === "pattern" && <span className="errormessage">Voer een geldig email adres in</span>}
                        {errors.email && errors.email.type === "required" && <span className="errormessage">Dit veld is verplicht.</span>}
                    </label>
                    <label htmlFor="telefoonnummer" id="contact-phonenumber">
                        <input type="text" placeholder="Telefoonnummer" {...register("telefoonnummer", {required: true, maxLength: 10, pattern: /[0-9]/i})} />
                        {errors.telefoonnummer && errors.telefoonnummer.type === "required" && <span className="errormessage">Dit veld is verplicht.</span>}
                        {errors.telefoonnummer && errors.telefoonnummer.type === "pattern" && <span className="errormessage">Telefoonnummer mag alleen cijfers bevatten</span>}
                        {errors.telefoonnummer && errors.telefoonnummer.type === "maxLength" && <span className="errormessage">Telefoonnummer mag max 10 cijfers bevatten</span>}
                    </label>
                    <label htmlFor="bericht" id="contact-message">
                        <textarea placeholder="Hier je bericht" rows="6" cols="40"{...register("bericht", {required: true})} />
                        {errors.bericht && errors.bericht.type === "required" && <span className="errormessage">Dit veld is verplicht.</span>}
                    </label>
                    <button type="submit" id="contact-submit-button">Verstuur bericht</button>
                </form>
            </div>
        </div>
    );
}