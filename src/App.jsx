import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './MyComponents/Layout';
import SearchWeather from './MyComponents/SearchWeather';
import YourWeather from './MyComponents/YourWeather';
import SeeResult from './MyComponents/SeeResult';
import { MyProvider } from "./MyContext"


const WeatherApp = () => {
    return (
        <>
        <MyProvider>
            <BrowserRouter basename="/WeatherApp/">
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<SearchWeather />} >
                            <Route path="see-result" element={<SeeResult/>} />
                        </Route>
                        <Route path="your-weather" element={<YourWeather />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </MyProvider>
        </>
    );
};

export default WeatherApp;
