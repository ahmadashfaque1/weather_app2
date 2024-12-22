import React, { useContext } from "react";
import "./SeeResult.css"
import MyContext from "../MyContext";
import wind from "../assets/wind.png"
import humidity from "../assets/humidity.png"
import cloud from "../assets/cloud.png"


const SeeResult = () => {
    const { weatherData } = useContext(MyContext);

    console.log(weatherData, "weatherData in see result...")

    return (
            <div className="seeResult">
                <div className="seeResultName">
                    <p data-cityname="city-name">{weatherData.name}</p>
                    <img data-countryicon="country-icon" src="https://flagcdn.com/144x108/in.png" alt="India flag" />
                </div>
                {/* <p className="types-of-weather">clear sky</p> */}

                <img className="data-weather-icon" src="http://openweathermap.org/img/w/01n.png" alt="Weather icon" />
                <p className="temp">{weatherData.main.temp} </p>

                <div className="parameter-container">

                    <div className="parameter">
                        <img src={wind} alt="Wind icon" />
                        <p>windspeed%</p>
                        <p data-windspeed="">{weatherData.wind.speed}</p>
                    </div>


                    <div className="parameter">
                        <img src={humidity} alt="Humidity icon" />
                        <p>humidity</p>
                        <p data-humidity="">{weatherData.wind.deg}%</p>
                    </div>


                    <div className="parameter">
                        <img src={cloud} alt="Cloud icon" />
                        <p>Clouds</p>
                        <p data-cloudiness="">{weatherData.clouds.all}%</p>
                    </div>

                </div>
            </div>
    )

}

export default SeeResult;