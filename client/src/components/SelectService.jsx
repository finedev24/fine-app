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

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((response) => response.json())
      .then((data) => setServices(data.objects || []))
      .catch((error) => {
        console.error("Error al obtener los servicios:", error);
        setServices([]);
      });
  }, []);

  const [selectedService, setSelectedService] = useState("");
  const handleServiceClick = (value) => {
    setSelectedService(value);
  };

  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleShowMore = (serviceId) => {
    setShowMoreMap((prevMap) => ({
      ...prevMap,
      [serviceId]: !prevMap[serviceId],
    }));
  };

  const navigate = useNavigate();

  const [, dispatch] = useRegFormContext();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const onSubmit = (values) => {
    if (isValid) {
      dispatch({ type: "SET_SERVICE_DATA", data: values });
    }
    navigate("/addons");
    console.log(values);
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
              .filter(
                (service) =>
                  service.itemData.categories &&
                  service.itemData.categories.some(
                    (category) => category.id === "ECN2JYIJIQIRAUJYRTSA7WC3"
                  )
              )
              .map((service) => (
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
                                .priceMoney?.amount
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
    </div>
  );
}

export default SelectService;
