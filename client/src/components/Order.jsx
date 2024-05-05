import React, { useState } from "react";
import axios from "axios";
import { useRegFormContext } from "../providers/RegFormProvider";
import style from "../styles/Order.module.css";
import { useNavigate } from "react-router-dom";
import { BiCar } from "react-icons/bi";
import {
  CiStar,
  CiRepeat,
  CiCalendar,
  CiClock2,
  CiLocationOn,
  CiDroplet,
} from "react-icons/ci";
import { FiCheck } from "react-icons/fi";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const Order = () => {
  const [order] = useRegFormContext();
  const [showMoreMap, setShowMoreMap] = useState({});
  const navigate = useNavigate();

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

  const toggleShowMore = (sectionId) => {
    setShowMoreMap((prevMap) => ({
      ...prevMap,
      [sectionId]: !prevMap[sectionId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const duracionEnMilisegundos = order.duration;
  const duracionEnHoras = duracionEnMilisegundos / 3600000; // Convertir a horas

  const horas = Math.floor(duracionEnHoras); // Obtener la parte entera de las horas
  const minutos = Math.round((duracionEnHoras - horas) * 60); // Calcular los minutos restantes

  let duracionFormateada = "";
  if (horas === 1) {
    duracionFormateada += `${horas} hora`;
  } else {
    duracionFormateada += `${horas} horas`;
  }

  if (minutos > 0) {
    if (horas === 1) {
      duracionFormateada += ` ${minutos} minutos`;
    } else {
      duracionFormateada += ` y ${minutos} minutos`;
    }
  }
  console.log(order.service.name);
  const [formData, setFormData] = useState({
    serviceId: order.service.serviceId,
    staffId: "TMEUAFjgJJb4bj0C",
    startAt: order.date,
    serviceVariationVersion: order.service.version,
    customerNote: "",
    emailAddress: order.address.email,
    familyName: order.address.name,
    givenName: "",
    addons: [],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const addonsInfo = Object.values(order.addons)
        .map((addon) => `${addon.addonName} - ${formatCurrency(addon.addonPrice)}`)
        .join("\n");
      // Calculate subtotal
      const subtotal = formatCurrency(order.subtotal);
      const addressCustomer = order.address.address + " " + order.address.city;
      const phoneNumber = order.address.phone;

      // Include subtotal in customerNote
      const customerNote = `${formData.customerNote}\nAddons:\n${addonsInfo}\nSubtotal: ${subtotal}\nAddress: ${addressCustomer}\nPhone: ${phoneNumber}`;

      const url = `http://localhost:5000/booking/create?serviceId=${formData.serviceId}&staffId=${formData.staffId}&startAt=${formData.startAt}&version=${formData.serviceVariationVersion}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerNote: customerNote,
          emailAddress: formData.emailAddress,
          familyName: formData.familyName,
          givenName: formData.givenName,
        }),
      });
      console.log("Booking created");
      navigate("/success")
    } catch (error) {
      console.error("Error creating booking:", error);
    }
};

  return (
    <div>
      <h2>Appointment Summary</h2>
      <div className={style["container-resume"]}>
        <div className={style["picker-date"]}>
          <div className={style.labelLine}>
            <span>Summary of services:</span>
            <div className={style.labelLineHr}>
              <hr />
            </div>
          </div>
        </div>

        <div className={`${style["box-container"]} ${style["services"]}`}>
          {/* Type of vehicle section */}
          <div className={`${style["box-detailed"]} ${style["vehicle"]}`}>
            <div className={style["box-detailed-icon"]}>
              <BiCar />
            </div>
            <div className={style["box-detailed-content"]}>
              <span>Type of vehicle</span>
              {order.vehicle && (
                <>
                  <p>{order.vehicle.vehicle}</p>
                </>
              )}
            </div>
          </div>

          {/* Service section */}
          <hr />
          <div className={style["box-item"]}>
            <div className={`${style["box-detailed"]} ${style["service"]}`}>
              <div className={style["box-detailed-icon"]}>
                <CiDroplet />
              </div>
              <div className={style["box-detailed-content"]}>
                <span>Service</span>
                {order.service && (
                  <>
                    {order.service.name &&
                      order.service.name.split(" - ").map((line, index) => (
                        <React.Fragment key={index}>
                          <p
                            className={
                              index === 0
                                ? style["first-line"]
                                : style["second-line"]
                            }
                          >
                            {line}
                          </p>
                        </React.Fragment>
                      ))}
                  </>
                )}
              </div>
              {order.service && order.service.name && (
                <div
                  onClick={() => toggleShowMore("service")}
                  className={style.viewMore}
                >
                  View more{" "}
                  {showMoreMap["service"] ? <SlArrowUp /> : <SlArrowDown />}
                </div>
              )}
            </div>
            <div
              className={style["box-extra"]}
              onClick={() => toggleShowMore("service")}
            >
              {order.service && (
                <>
                  {order.service.description &&
                    order.service.description !== "" && (
                      <div
                        className={style["service-description"]}
                        style={{
                          display: showMoreMap["service"] ? "block" : "none",
                        }}
                      >
                        {order.service.description
                          .split("\n")
                          .map((line, index) => (
                            <p key={index}>
                              <FiCheck
                                style={{ color: "#A0EEBC", marginRight: "6px" }}
                              />
                              {line}
                            </p>
                          ))}
                      </div>
                    )}
                  <div
                    className={style["service-price-detailed"]}
                    style={{
                      display: showMoreMap["service"] ? "flex" : "none",
                    }}
                  >
                    <p>Price:</p>
                    <p>{formatCurrency(order.service.price)}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Add-ons section */}

          <hr />
          <div className={style["box-item"]}>
            <div className={`${style["box-detailed"]} ${style["addons"]}`}>
              <div className={style["box-detailed-icon"]}>
                <CiStar />
              </div>
              <div className={style["box-detailed-content"]}>
                <span>Add-Ons</span>
                <p>{`(${Object.keys(order.addons).length}) Add-On`}</p>
              </div>
              {Object.entries(order.addons).length > 0 && (
                <div
                  onClick={() => toggleShowMore("addons")}
                  className={style.viewMore}
                >
                  View more{" "}
                  {showMoreMap["addons"] ? <SlArrowUp /> : <SlArrowDown />}
                </div>
              )}
            </div>
            <div className={style["box-extra"]}>
              {Object.entries(order.addons).length > 0 ? (
                <div
                  className={style["addon-list"]}
                  style={{ display: showMoreMap["addons"] ? "block" : "none" }}
                >
                  {Object.entries(order.addons).map(
                    ([addonId, { addonName, addonPrice }]) => (
                      <div
                        key={addonId}
                        className={style["addon-item-detailed"]}
                      >
                        <p>{addonName}</p>
                        <p>{formatCurrency(addonPrice)}</p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          {/* Frequency section */}
          <hr />
          <div className={`${style["box-detailed"]} ${style["frequency"]}`}>
            <div className={style["box-detailed-icon"]}>
              <CiRepeat />
            </div>
            <div className={style["box-detailed-content"]}>
              <span>Frequency</span>
              <p>Once</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${style["container-resume"]} ${style["last-container"]}`}
      >
        <div className={style["picker-date"]}>
          <div className={style.labelLine}>
            <span>Date, Time and Location</span>
            <div className={style.labelLineHr}>
              <hr />
            </div>
          </div>
        </div>

        <div
          className={`${style["box-container"]} ${style["date-time-location"]}`}
        >
          {/* Type of vehicle section */}
          <div className={`${style["box-detailed-second"]} ${style["date"]}`}>
            <div className={style["box-detailed-icon"]}>
              <CiCalendar />
            </div>
            <div className={style["box-detailed-content"]}>
              <span>Date</span>
              {order.date && <p>{formatDate(order.date)}</p>}
            </div>
          </div>
          <hr />
          <div className={`${style["box-detailed-second"]} ${style["time"]}`}>
            <div className={style["box-detailed-icon"]}>
              <CiClock2 />
            </div>
            <div className={style["box-detailed-content"]}>
              <span>Time</span>
              {order.date && <p>{formatTime(order.date)}</p>}
            </div>
          </div>
          <div className={`${style["box-detailed-second"]} ${style["time"]}`}>
            <div className={style["box-detailed-icon"]}></div>
            <div className={style["box-detailed-content"]}>
              <span>Duration of service</span>
              {order.date && <p>{duracionFormateada}</p>}
            </div>
          </div>
          <hr />
          <div
            className={`${style["box-detailed-second"]} ${style["location"]}`}
          >
            <div className={style["box-detailed-icon"]}>
              <CiLocationOn />
            </div>
            <div className={style["box-detailed-content"]}>
              <span>Location</span>
              {order.address && <p>{order.address.address} {order.address.city}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className={style.actionPrice}>
        <div className={style["actionPrice-content"]}>
          <div className={style["actionPrice-price"]}>
            <span>Subtotal:</span>
            <p>{formatCurrency(order.subtotal)}</p>
          </div>
          <div className={style["actionPrice-button"]}>
            <button onClick={handleSubmit}>BOOKING</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
