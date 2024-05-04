import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Asumiendo que estás usando axios para hacer peticiones HTTP

const Availability = ({ staffId, serviceId, serviceVersion }) => {
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const response = await axios.get(`/availability/${staffId}/${serviceId}?version=${serviceVersion}`);
        setAvailabilities(response.data.availabilities);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvailabilities();
  }, [staffId, serviceId, serviceVersion]);

  return (
    <div>
      {/* Aquí puedes renderizar la lista de disponibilidades */}
      {availabilities.map(availability => (
        <div key={availability.date}>
          <p>Date: {availability.date}</p>
          <p>Time: {availability.time}</p>
          <button onClick={() => handleSelection(availability)}>Select</button>
        </div>
      ))}
    </div>
  );
};

export default Availability;
