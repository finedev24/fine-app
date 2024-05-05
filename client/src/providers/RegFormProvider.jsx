import { createContext, useContext, useReducer } from "react";

const RegFormContext = createContext();
export const useRegFormContext = () => {
  return useContext(RegFormContext);
};

const reducer = (order, action) => {
  switch (action.type) {
    case "SET_ADDRES_DATA": {
      return { ...order, address: { ...action.data } };
    }
    case "SET_VEHICLE_DATA": {
      return { ...order, vehicle: { ...action.data } };
    }
    case "SET_SERVICE_DATA": {
      return { ...order, service: action.data };
    }

    case "SET_ADDONS_DATA": {
      return { ...order, addons: action.data };
    }
    case "SET_ADDON_DATA": {
      const { addonId, addonPrice } = action.data;
      return {
        ...order,
        addon: {
          ...order.addons,
          [addonId]: addonPrice,
        },
      };
    }
    case "SET_DATE_DATA": {
      return { ...order, date: action.data };
    }
    case "SET_SUBTOTAL": {
      return { ...order, subtotal: action.data };
    }
    case "CHANGE_PERCENT": {
      return { ...order, percent: action.data };
    }
  }
  return order;
};

const RegFormProvider = ({ children }) => {
  const [order, dispatch] = useReducer(reducer, {
    percent: 0,
    selectedData: {},
    service: { price: 0 },
    addons: {}, // Inicializar addons como un objeto vacío
  });

  return (
    <RegFormContext.Provider value={[order, dispatch]}>
      {children}
    </RegFormContext.Provider>
  );
};

export default RegFormProvider;
