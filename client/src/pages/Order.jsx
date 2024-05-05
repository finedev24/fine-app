import React from "react";
import { useRegFormContext } from "../providers/RegFormProvider";

const Order = () => {
  const [order] = useRegFormContext();

  return (
    <div>
      <h2>Appointment Summary</h2>
      <div className={style.labelLine}>
        <span>Time</span>
        <div className={style.labelLineHr}>
          <hr />
        </div>
      </div>

      <h4>Dirección</h4>
      {order.address && (
        <>
          <p>Address: {order.address.address}</p>
        </>
      )}
      <hr />
      <h4>Vehicle</h4>
      {order.vehicle && (
        <>
          <p>Type: {order.vehicle.vehicle}</p>
          <p>Type 2: {order.vehicle.vehicletype}</p>
        </>
      )}
      <hr />
      <h4>Service</h4>
      {order.common && (
        <>
          <p>Type:</p>
          <p>Type 2:</p>
        </>
      )}
    </div>
  );
};

export default Order;
