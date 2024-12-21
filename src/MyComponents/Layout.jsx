import React from "react";
import './Layout.css';
import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";


const Layout = () => {

    const navigate = useNavigate();

    const location = useLocation();
    console.log(location);
    const route = location.pathname.replace(/\//g, '');
    const [activeLink, setActiveLink] = useState(route);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        navigate(link);
        console.log(activeLink)
    };

    return (
        <div>
            <div className="main-header">WEATHER APP
                <div className="main-header-search-buttons">

                    <button onClick={() => handleLinkClick("your-weather")} className={activeLink === 'your-weather' ? "main-header-search-buttons--active" : "main-header-search-buttons-left"}>Your Weather</button>
                    <button onClick={() => handleLinkClick("/")} className={activeLink === '/' ? "main-header-search-buttons--active" : "main-header-search-buttons-right"}>Search Weather</button>

                </div>
            </div>

            <div className="main-header-subroute-child">

                <Outlet />

            </div>
        </div>

    )
}

export default Layout