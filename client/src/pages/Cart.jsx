import React, { useState } from "react";
import styles from "../styles/Cart.module.css";
import { useRegFormContext } from "../providers/RegFormProvider";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FaCheck, FaRegCheckCircle, FaArrowRight } from "react-icons/fa";
import { SlArrowRightCircle } from "react-icons/sl";

function Cart() {
  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleShowMore = (serviceId) => {
    setShowMoreMap((prevMap) => ({
      ...prevMap,
      [serviceId]: !prevMap[serviceId],
    }));
  };

  const [order] = useRegFormContext();

  return (
    <div>
      <div className={styles.ProgressBar}>
        <div className={styles.pb13}></div>
        <div className={styles.pb23}></div>
        <div className={styles.pb33}></div>
      </div>
      <h2>My Cart</h2>
      <p>Summary of your services</p>
      <div className={styles["item-box"]}>
        <div className={styles["item-title"]}>
          <h4>Sedan</h4>
          <p>Service: Exterior Detailing - Golden Hour</p>
          <span>2 Add-Ons</span>
        </div>
        <div className={styles["item-content"]}>
          <div
            onClick={() => toggleShowMore()}
            className={styles.viewMore}
          >
            VIEW MORE{" "}
            {showMoreMap ? <SlArrowUp /> : <SlArrowDown />}
          </div>
          <span>
            Total <b>$260</b>
          </span>
        </div>
        <div className={styles["item-detailed"]}>
          <div className={styles["item-detailed-service"]}>
            <span>{"Golden hour (exterior detailing)"}</span>
            <span className={styles["price-detail"]}>$150</span>
          </div>
          <div className={styles["item-detailed-addons"]}>
            <h4>Add Ons:</h4>
            <div className={styles["addon-list"]}>
              <div className={styles["addon-item"]}>
                <div className={styles["addon-item-left"]}>
                  <FaCheck />
                  <span>Engine detail</span>
                </div>
                <div className={styles["addon-item-right"]}>
                  <span className={styles["price-detail"]}>$60</span>
                </div>
              </div>
              <div
                onClick={() => toggleShowMore(service.id)}
                className={styles.viewMore}
              >
                Add more
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["add-item"]}>
        <span>Add another vehicle</span>
        <SlArrowRightCircle />
      </div>
    </div>
  );
}

export default Cart;
