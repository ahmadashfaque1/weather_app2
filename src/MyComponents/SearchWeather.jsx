import React, { useState, useContext } from 'react';
import axios from 'axios';
import "./SearchWeather.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet, useNavigate } from 'react-router-dom';
import MyContext from '../MyContext';


const SearchWeather = () => {

    const navigate = useNavigate();
    const [city, setCity] = useState('');
    // const [api, setApi] = useState('');
    const { weatherData, setWeatherData } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const apiKey = 'd983b91192b33f7a6ac5fd03615214ec'; // Make sure to replace this with your actual API key


    const fetchWeather = async () => {
        if (!city) {
            setError('Please enter a city name');
            setWeatherData(null);
            return;
        }

        setError('');
        setLoading(true);
        setWeatherData(null);

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            if (response.data) {
                setWeatherData(response.data);
                navigate("see-result");
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 404) {
                setError('City not found. Please enter a valid city name.');
            } else {
                setError('Error fetching data. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div className="weather-container">
                <input
                    className="input-box"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search for City..."
                />
                <button className="get-weather-btn" onClick={fetchWeather}><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="24" // Adjust width and height as needed
                    height="24"
                    fill="currentColor" // Inherit parent color or specify directly
                >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>

                </button>
            </div>
            <div className="result-container">
                {loading && <p className="loading-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}

                {weatherData && !loading && (
                    <div className="weather-result">
                        {console.log(weatherData, "*")}
                        <Outlet />
                    </div>
                )}

            </div>

        </div>

    );

};

export default SearchWeather;