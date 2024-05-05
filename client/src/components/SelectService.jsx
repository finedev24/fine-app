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
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(dollars);
  return formatted.replace(/(\.|,)00$/g, "");
}

function SelectService() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [showMoreMap, setShowMoreMap] = useState({});
  const navigate = useNavigate();
  const [order, dispatch] = useRegFormContext();

  const vehicleType = order.vehicle.vehicle;
  console.log(vehicleType);

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
        const selectedVariation = selectedServiceData.itemData.variations.find(variation =>
          variation.itemVariationData.name.toLowerCase().includes(vehicleType.toLowerCase())
        );
  
        if (selectedVariation) {
          const serviceName = selectedVariation.itemVariationData.name;
          const serviceDescription = selectedServiceData.itemData.description;
          const serviceVersion = selectedVariation.version;
          const serviceId = selectedVariation.id;
          const serviceDuration = selectedVariation.itemVariationData.serviceDuration;
          const priceInCents = selectedVariation.itemVariationData.priceMoney?.amount || 0;
  
          dispatch({
            type: "SET_SERVICE_DATA",
            data: {
              ...values,
              serviceId: serviceId,
              name: serviceName,
              price: priceInCents,
              description: serviceDescription,
              version: serviceVersion,
              duration: serviceDuration,
            },
          });
  
          const servicePrice = priceInCents / 100;
          const addonsTotalPrice = Object.values(order.addons).reduce(
            (total, addonPrice) => total + addonPrice,
            0
          );
          const subtotal = servicePrice + addonsTotalPrice;
          dispatch({ type: "SET_SUBTOTAL", data: subtotal });
  
          const serviceFormatedDuration = serviceDuration / 60000;
  
          const addonsTotalDuration = Object.values(order.addons).reduce(
            (totalDuration, addonDuration) => totalDuration + addonDuration,
            0
          );
          const duration = serviceFormatedDuration + addonsTotalDuration;
          dispatch({ type: "SET_DURATION", data: duration });
        }
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
          {services
  .filter((service) =>
    vehicleType.toLowerCase() === 'motorcycle' ?
    service.itemData.name.toLowerCase().includes(vehicleType.toLowerCase()) :
    service.itemData.variations.some(variation =>
      variation.itemVariationData.name.toLowerCase().includes(vehicleType.toLowerCase())
    )
  )
  .map((service) => {
    const variations = service.itemData.variations.filter(variation =>
      variation.itemVariationData.name.toLowerCase().includes(vehicleType.toLowerCase())
    );

    return (
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
              {variations.length > 0 &&
                variations.map((variation) => (
                  <React.Fragment key={variation.id}>
                    <span
                      className={styles["first-line"]}
                    >
                      {variation.itemVariationData.name}
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
            {variations.length > 0 && (
              <div key={variations[0].id}>
                {formatCurrency(
                  variations[0].itemVariationData
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
    );
  })}
          </div>
        </div>
        <div className={styles.actionPrice}>
          <div className={styles["actionPrice-content"]}>
            <div className={styles["actionPrice-price"]}>
              <span>Subtotal:</span>
              <p>
                {selectedService
                  ? formatCurrency(
                      services.find((service) => service.id === selectedService)
                        ?.itemData.variations[0].itemVariationData.priceMoney
                        ?.amount
                    )
                  : "$0"}
              </p>
            </div>
            <div className={styles["actionPrice-button"]}>
              <button disabled={!selectedService}>CONTINUE</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SelectService;
