import React, { createContext, useContext } from 'react';

const P5CanvasCoreShareContext = createContext();

export const useP5CanvasCoreShare = () => useContext(P5CanvasCoreShareContext);

export const P5CanvasCoreShareProvider = ({ children, value }) => {
  return (
    <P5CanvasCoreShareContext.Provider value={value}>
      {children}
    </P5CanvasCoreShareContext.Provider>
  );
};

