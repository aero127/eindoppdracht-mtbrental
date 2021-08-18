import React from 'react';
import './Bike.css'
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import {Link } from "react-router-dom";

function Bike(props) {
    return (
        <div className="bike-page-container">
        <div className="bike-total">
            <div className="bike-links-previous">
                <Link to={props.previousBike} exact activeClassName="active-link"><FaArrowCircleLeft color="black" className="left-arrow-bikes"/></Link>
            </div>
            <div className="bike-general">
                <h1>{props.generalTitle}</h1>
                <div className="bike-general-info">{props.generalInfo}</div>
            </div>
        <div className="bike-container">
            <h2 className="bikename-h1">
                {props.bikeName}
            </h2>
                <img src={props.bikeImg} alt={props.bikeName}/>
                <div className="bikeSpecs"> {props.bikeSpecs}</div>
            <div className="bikePrices"><span className="bike-prices-span">Prijzen {props.bikeName}</span>
            {/*<div className="bike-price-3hours"><span className="bike-price-3hours-span">3 uren voor € {props.bikePricesThreeHours},-</span></div>*/}
            <div className="bike-price-day"><span className="bike-price-day-span">1 dag voor € {props.bikePricesDay},-</span></div>
            {/*<div className="bike-price-week"><span className="bike-price-week-span">1 week voor € {props.bikePricesWeek},-</span></div>*/}
            </div>
            <div className="bike-helmet-container">
                <span className="helmet-prices">Prijzen MTB helm</span>
                {/*<div className="bike-helmet-price-3hours"><span className="helmet-prices-3hours">3 uren, € 3,- </span></div>*/}
                <div className="bike-helmet-price-day"><span className="helmet-prices-day">1 dag, € 4,-</span></div>
                {/*<div className="bike-helmet-price-Week"><span className="helmet-prices-week">1 week, € 16,-</span></div>*/}
            </div>
            <div className="bike-also-available">{props.bikeAlsoAvailable}</div>
        </div>
            <div className="bike-right-next">
                <Link to={props.nextBike} exact activeClassName="active-link"><FaArrowCircleRight color="black" className="right-arrow-bikes"/></Link>
            </div>
        </div>
        </div>
    );
}

export default Bike;