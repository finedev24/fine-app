import React, { useEffect, useState } from "react";
import styles from "../styles/AppointmentSummary.module.css";

function AppointmentSummary() {

  return (
    <div>
      <h2>Appointment Summary</h2>
      <div className={styles.labelLine}>
        <div className={styles.labelText}>
          <span>Summary of services</span>
        </div>
        <div className={styles.labelLineHr}>
          <hr />
        </div>
      </div>

      <div>
        {/* {locations.map((location) => (
          <div key={location.id}>
            <p>{location.name}</p>
            <p>{location.address.addressLine1}</p>
            <p>{location.address.locality}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default AppointmentSummary;
