import React, {useState} from 'react';
import {PhotoSliderData} from "./PhotoSliderData";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const Photoslider = ({ slides }) => {
    const[current, setCurrent] = useState(0);
    const length = slides.length

    const nextSlide = () => {
        setCurrent(current === length -1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length -1 : current -1)
    }


    if (!Array.isArray(slides) || slides.length <= 0 ) {
        return null;
    }


        return (
            <section className="slider">
                <FaArrowCircleLeft color="white" className="left-arrow" onClick={prevSlide}/>
                <FaArrowCircleRight color="white" className="right-arrow" onClick={nextSlide}/>
                {PhotoSliderData.map((slide, index) => {
                    return(
                        <div className={index === current ? 'slide active' : 'slide'} key={index}>
                            {index === current && (<img src={slide.image} alt="mtb-rental" className="image"/>)}
                        </div>
                        )
                })}
            </section>
        );
    };

export default Photoslider;
