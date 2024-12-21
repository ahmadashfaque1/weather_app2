import React, { useState } from "react";
import axios from "axios";  // Make sure axios is imported
import "./YourWeather.css";
import { useContext } from "react";
import MyContext from '../MyContext';
import { useNavigate } from "react-router-dom";

const YourWeather = () => {
   const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("Waiting for location...");
  const [loading, setLoading] = useState(false);
  const { weatherData, setWeatherData } = useContext(MyContext);

  
  function getCityName(address){
    // Split the address by commas
    const addressParts = address.split(',');

    // Extract the city, which is usually near the end
    const city = addressParts[addressParts.length - 3].trim();

    console.log(city); // Output: "Delhi"
    return city
  }

  // Function to get the user's geolocation and display it
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setMessage("Geolocation is not supported by this browser.");
    }
  };

  // Function to handle the successful geolocation
  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ lat: latitude, lon: longitude });
    setMessage(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Call the function to get the address based on the coordinates
    getAddressFromCoordinates(latitude, longitude);
  };

  // Function to handle geolocation errors
  const showError = (error) => {
    setMessage(`Error: ${error.message}`);
  };

  // Function to get the address from latitude and longitude
  const getAddressFromCoordinates = async (latitude, longitude) => {
    setLoading(true);
    try {
      console.log(latitude, longitude, "***");
      // Make the API call to get the address from latitude and longitude
      const response = await axios.get(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (response.data) {
        console.log(response.data);

        const address = response.data.display_name;  // You can adjust this to show the desired part of the address
        setMessage(`Address: ${address}`);
        try {
          let cityName = getCityName(address)
          const apiKey = 'd983b91192b33f7a6ac5fd03615214ec';
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
          );
          if (response.data) {
            console.log(response.data,"***++++++++")
            setWeatherData(response.data);
            navigate("/see-result");
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

      } else {
        setMessage("Address not found.");
      }
    } catch (err) {
      console.error("Error fetching address:", err);
      setMessage("Error fetching address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="your-Weather">
      <img src="src/assets/location.png" width={"80px"} height={"80px"} alt="Location Image" />
      <p className="p1-your-weather">Grant Location Access</p>
      <p className="p2-your-weather">Allow Access to get weather Information</p>
      <button className="btn-grand-access" onClick={getLocation}>
        GRANT ACCESS
      </button>

      {/* Display address directly */}
      {location && !loading && (
        <div>
          <p>{message}</p>
        </div>
      )}

      {/* Display loading message while fetching address */}
      {loading && <p>Loading address...</p>}
    </div>
  );
};

export default YourWeather;
