import React, { useState, useEffect } from "react";
import styles from "../styles/SelectService.module.css";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FiCheck } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";

function formatCurrency(amount) {
  const dollars = amount / 100;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // Cambiar a 2 para mostrar los centavos
    maximumFractionDigits: 2,
  }).format(dollars);
  return formatted;
}

function SelectService() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [showMoreMap, setShowMoreMap] = useState({});
  const navigate = useNavigate();
  const [order, dispatch] = useRegFormContext();

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((response) => response.json())
      .then((data) => setServices(data.objects || []))
      .catch((error) => {
        console.error("Error al obtener los servicios:", error);
        setServices([]);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const toggleShowMore = (serviceId) => {
    setShowMoreMap((prevMap) => ({
      ...prevMap,
      [serviceId]: !prevMap[serviceId],
    }));
  };

  const onSubmit = (values) => {
    if (isValid) {
      const selectedServiceData = services.find(
        (service) => service.id === selectedService
      );
      if (selectedServiceData) {
        const serviceName = selectedServiceData.itemData.name;
        const serviceDescription = selectedServiceData.itemData.description;
        const priceInCents =
          selectedServiceData.itemData.variations[0].itemVariationData
            .priceMoney?.amount || 0;
        dispatch({
          type: "SET_SERVICE_DATA",
          data: {
            ...values,
            name: serviceName,
            price: priceInCents,
            description: serviceDescription,
          }, // Elimina la división por 100 aquí
        });

        // Calcular subtotal
        const servicePrice = priceInCents / 100;
        const addonsTotalPrice = Object.values(order.addons).reduce(
          (total, addonPrice) => total + addonPrice,
          0
        );
        const subtotal = servicePrice + addonsTotalPrice;
        dispatch({ type: "SET_SUBTOTAL", data: subtotal });
      }
    }
    navigate("/addons");
  };

  return (
    <div>
      <div className={styles.ProgressBar}>
        <div className={styles.pb13}></div>
        <div className={styles.pb23}></div>
        <div className={styles.pb33}></div>
      </div>
      <h2>Select your service</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContent}>
          <div>
            {services.map((service) => (
              <div
                key={service.id}
                className={`${styles.list} ${
                  selectedService === service.id ? styles.selected : ""
                }`}
                onClick={() => {
                  setSelectedService(service.id);
                  document.getElementById(service.id).click();
                }}
              >
                <div className={styles.listSection}>
                  <div className={styles.listSectionTitle}>
                    <label htmlFor={service.id} style={{ cursor: "pointer" }}>
                      {service.itemData.name &&
                        service.itemData.name
                          .split(" - ")
                          .map((line, index) => (
                            <React.Fragment key={index}>
                              <span
                                className={
                                  index === 0
                                    ? styles["first-line"]
                                    : styles["second-line"]
                                }
                              >
                                {line}
                              </span>
                              <br />
                            </React.Fragment>
                          ))}
                      <input
                        id={service.id}
                        type="radio"
                        value={service.id}
                        name="service"
                        {...register("service")}
                      />
                    </label>
                  </div>
                  <div className={styles.listSectionContent}>
                    <div
                      onClick={() => toggleShowMore(service.id)}
                      className={styles.viewMore}
                      style={{
                        display:
                          service.itemData.description &&
                          service.itemData.description !== ""
                            ? "block"
                            : "none",
                      }}
                    >
                      View more{" "}
                      {showMoreMap[service.id] ? (
                        <SlArrowUp />
                      ) : (
                        <SlArrowDown />
                      )}
                    </div>
                    {service.itemData.variations &&
                      service.itemData.variations.length > 0 && (
                        <div key={service.itemData.variations[0].id}>
                          {formatCurrency(
                            service.itemData.variations[0].itemVariationData
                              .priceMoney?.amount || 0
                          )}
                        </div>
                      )}
                  </div>
                  <div className={styles.listSectionExtra}>
                    {showMoreMap[service.id] && (
                      <div className={styles.listFeature}>
                        {service.itemData.description
                          .split("\n")
                          .map((feature, index) => (
                            <div key={index} className={styles.featureItem}>
                              <div className={styles.featureIcon}>
                                <FiCheck
                                  style={{
                                    color: "#A0EEBC",
                                    marginRight: "6px",
                                  }}
                                />
                              </div>
                              <div className={styles.featureContent}>
                                {feature}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles["action-content"]}>
            <button>Enviar</button>
          </div>
        </div>
      </form>
      {/* {selectedService && (
          <p>
            Price:{" "}
            {formatCurrency(
              services.find((service) => service.id === selectedService)?.itemData
                .variations[0].itemVariationData.priceMoney?.amount
            )}
          </p>
        )} */}
      {order.subtotal && <p>Subtotal: {formatCurrency(order.subtotal)}</p>}
      <p>
        {selectedService &&
          `Price: ${formatCurrency(
            services.find((service) => service.id === selectedService)?.itemData
              .variations[0].itemVariationData.priceMoney?.amount
          )}`}
      </p>
    </div>
  );
}

export default SelectService;
