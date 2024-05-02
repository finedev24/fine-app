import { createContext, useContext, useReducer } from "react";

const RegFormContext = createContext();
export const useRegFormContext = () => {
    return useContext(RegFormContext);
}

const reducer = (order, action) => {
    switch (action.type) {
        case 'SET_ADDRES_DATA': {
            return { ...order, address: { ...action.data } };
        }
        case 'SET_VEHICLE_DATA': {
            return { ...order, vehicle: { ...action.data } };
        }
        case 'SET_SERVICE_DATA': {
            return { ...order, service: { ...action.data } };
        }
        case 'SET_ADDONS_DATA': {
            return { ...order, service: { ...action.data } };
        }
        case 'SET_DATETIME_DATA': {
            return { ...order, service: { ...action.data } };
        }
        case 'CHANGE_PERCENT': {
            return { ...order, percent: action.data };
        }
    }
    return order;
}

const RegFormProvider = ({ children }) => {
    const [order, dispatch] = useReducer(reducer, { percent: 0 });

    return <RegFormContext.Provider value={[order, dispatch]}>
        {children}
    </RegFormContext.Provider>
}

export default RegFormProvider;