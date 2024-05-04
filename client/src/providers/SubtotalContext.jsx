// SubtotalContext.js
import React, { createContext, useState } from 'react';

const SubtotalContext = createContext();

export const SubtotalProvider = ({ children }) => {
  const [subtotal, setSubtotal] = useState(0);

  return (
    <SubtotalContext.Provider value={{ subtotal, setSubtotal }}>
      {children}
    </SubtotalContext.Provider>
  );
};

export default SubtotalContext;
