import React, { useState } from "react";
import styles from "../styles/Addons.module.css";
import { useForm } from "react-hook-form";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";

function Addons() {
  const addons = [
    {
      id: 1,
      name: "Engine detail",
      price: 60,
    },
    {
      id: 2,
      name: "Paint water spot removal",
      price: 50,
    },
    {
      id: 3,
      name: "Headlight restoration",
      price: 50,
    },
    {
      id: 4,
      name: "Shampoo Mats",
      price: 50,
    },
    {
      id: 5,
      name: "Interior leather conditioning",
      price: 50,
    },
    {
      id: 6,
      name: "Pet hair removal",
      price: 50,
    },
    {
      id: 7,
      name: "Odor removal",
      price: 100,
    },
    {
      id: 8,
      name: "Baby car seat sanitization",
      price: 50,
    },
    {
      id: 9,
      name: "Clay bar treatment and polish (Paint correction)",
      price: 250,
    },
  ];

  const [selectedAddons, setSelectedAddons] = useState([]);

  const handleAddonClick = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
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
      dispatch({ type: "SET_ADDONS_DATA", data: { addon: selectedAddons } });
    }
    navigate("/date");
    console.log(values);
  };

  return (
    <div>
      <div className={styles.ProgressBar}>
        <div className={styles.pb13}></div>
        <div className={styles.pb23}></div>
        <div className={styles.pb33}></div>
      </div>
      <h2>Addons</h2>
      <p>Select any must-have-add-ons:</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            {addons.map((addon) => (
              <div
                key={addon.id}
                className={`${styles.list} ${
                  selectedAddons.includes(addon.id) ? styles.selected : ""
                }`}
                onClick={() => {
                  handleAddonClick(addon.id);
                  document.getElementById(addon.id).click();
                }}
              >
                <div className={styles.listSection}>
                  <div className={styles.listSectionLabel}>
                    <label htmlFor={addon.id} style={{ cursor: "pointer" }}>
                      {addon.name}
                    </label>
                  </div>
                  <div className={styles.listSectionContent}>
                    <span>${addon.price}</span>
                    <input
                      id={addon.id}
                      type="checkbox"
                      value={addon.id}
                      name="addon"
                      {...register("addon")}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.action}>
          <div className={styles["action-content"]}>
            <button type="submit">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Addons;
