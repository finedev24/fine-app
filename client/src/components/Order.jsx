import React, { useState } from "react";
import { useRegFormContext } from "../providers/RegFormProvider";
import style from "../styles/Order.module.css";
import { BiCar } from "react-icons/bi";
import {
  CiStar,
  CiRepeat,
  CiCalendar,
  CiClock2,
  CiMapPin,
} from "react-icons/ci";
import { FiCheck } from "react-icons/fi";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const Order = () => {
  const [order] = useRegFormContext();
  const [showMoreMap, setShowMoreMap] = useState({});

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
                <BiCar />
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
            <div className={style["box-extra"]}>
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

      <div className={style["container-resume"]}>
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
          <hr />
          <div
            className={`${style["box-detailed-second"]} ${style["location"]}`}
          >
            <div className={style["box-detailed-icon"]}>
              <CiMapPin />
            </div>
            <div className={style["box-detailed-content"]}>
              <span>Location</span>
              {order.address && <p>{order.address.address}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
