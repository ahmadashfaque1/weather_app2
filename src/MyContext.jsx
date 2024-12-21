import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <MyContext.Provider value={{ weatherData, setWeatherData }}>
        {children}
    </MyContext.Provider>
  );
};

export default MyContext;


