import React from "react";
import { useRegFormContext } from "../providers/RegFormProvider";

const Order = () => {
  const [order] = useRegFormContext();

  function formatCurrency(amount) {
    const dollars = amount / 100;
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(dollars);
    return formatted.replace(/(\.|,)00$/g, "");
  }

  return (
    <div>
      <h3>Order</h3>
      
      <h4>Dirección</h4>
      {order.address && (
        <>
          <p>Address: {order.address.address}</p>
        </>
      )}
      
      <h4>Vehicle</h4>
      {order.vehicle && (
        <>
          <p>Type: {order.vehicle.vehicle}</p>
          <p>Type 2: {order.vehicle.vehicletype}</p>
        </>
      )}
      
      <h4>Service</h4>
      {order.service && (
        <>
          <p>Service: {order.service.service}</p>
          <p>Price: {formatCurrency(order.service.price)}</p>{" "}
          {/* Mostrar el precio del servicio */}
        </>
      )}
      
      <h4>Addons</h4>
      {Object.entries(order.addons).length > 0 ? (
        <ul>
          {Object.entries(order.addons).map(([addonId, addonPrice]) => (
            <li key={addonId}>
              Addon: {addonId}, Price: {formatCurrency(addonPrice)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No addons selected</p>
      )}
      <h4>Date</h4>
      {order.date && (
        <>
          <p>Date: {order.date}</p>
        </>
      )}
      <h4>Precio</h4>
      {order.subtotal && <p>Subtotal: {formatCurrency(order.subtotal)}</p>}
    </div>
  );
};

export default Order;
