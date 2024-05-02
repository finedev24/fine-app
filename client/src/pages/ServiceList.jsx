import React, { useEffect, useState } from "react";

const ServicesList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((response) => response.json())
      .then((data) => setServices(data.objects || []))
      .catch((error) => {
        console.error("Error al obtener los servicios:", error);
        setServices([]);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Servicios</h1>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.itemData && <h4>{service.itemData.name}</h4>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
