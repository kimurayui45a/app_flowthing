import React, { createContext, useContext } from 'react';

const PixiComponentShareContext = createContext();

export const usePixiComponentShare = () => useContext(PixiComponentShareContext);

export const PixiComponentShareProvider = ({ children, value }) => {
  return (
    <PixiComponentShareContext.Provider value={value}>
      {children}
    </PixiComponentShareContext.Provider>
  );
};

