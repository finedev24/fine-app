import React, { useState, useEffect } from "react";
import styles from "../styles/Addons.module.css";
import { useForm } from "react-hook-form";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";

function formatCurrency(amount) {
  const dollars = amount / 100;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dollars);
  return formatted;
}

function SelectAddons() {
  const [addonsTotalPrice, setAddonsTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [addons, setAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const navigate = useNavigate();
  const [order, dispatch] = useRegFormContext();

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((response) => response.json())
      .then((data) => setAddons(data.objects || []))
      .catch((error) => {
        console.error("Error al obtener los servicios:", error);
        setAddons([]);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const handleAddonClick = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const calculateSubtotal = () => {
    const selectedServiceData = order.service;
    if (selectedServiceData) {
      const servicePrice = parseFloat(selectedServiceData.price);

      const addonsTotalPrice = selectedAddons.reduce((total, addonId) => {
        const addon = addons.find((addon) => addon.id === addonId);
        if (addon && addon.itemData.variations.length > 0) {
          const addonPrice = parseFloat(
            addon.itemData.variations[0].itemVariationData.priceMoney.amount
          );
          return total + addonPrice;
        }
        return total;
      }, 0);

      const subtotal = servicePrice + addonsTotalPrice;
      console.log("Service Price:", servicePrice);
      console.log("Addons Total Price:", addonsTotalPrice);
      console.log("Subtotal:", subtotal);
      dispatch({ type: "SET_SUBTOTAL", data: subtotal });
      setAddonsTotalPrice(subtotal);
      setSubtotal(subtotal);
    }
  };

  useEffect(() => {
    calculateSubtotal();
  }, [selectedAddons]);

  const onSubmit = (values) => {
    if (isValid) {
      const addonsData = selectedAddons.map((addonId) => {
        const addon = addons.find((addon) => addon.id === addonId);
        const addonPrice =
          addon.itemData.variations[0].itemVariationData.priceMoney.amount;
        return {
          addonId: addonId,
          addonPrice: addonPrice,
          addonName: addon.itemData.name, // Agregar el nombre del addon
        };
      });
      dispatch({ type: "SET_ADDONS_DATA", data: addonsData });
    }
    navigate("/pickerdate");
  };

  const totalAddonsPrice = selectedAddons.reduce((total, addonId) => {
    const addon = addons.find((addon) => addon.id === addonId);
    if (addon && addon.itemData.variations.length > 0) {
      const addonPrice =
        addon.itemData.variations[0].itemVariationData.priceMoney.amount;
      return total + parseFloat(addonPrice);
    }
    return total;
  }, 0);

  return (
    <div>
      <h2>Addons</h2>
      <p>Select any must-have-add-ons:</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContent}>
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
                      {addon.itemData.name}
                    </label>
                  </div>
                  <div className={styles.listSectionContent}>
                    {addon.itemData.variations &&
                      addon.itemData.variations.length > 0 && (
                        <div key={addon.itemData.variations[0].id}>
                          <span>
                            {formatCurrency(
                              addon.itemData.variations[0].itemVariationData
                                .priceMoney?.amount || 0
                            )}
                          </span>
                        </div>
                      )}
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
            <p>Addons Total Price: {formatCurrency(totalAddonsPrice)}</p>
            <p>Subtotal: {formatCurrency(subtotal)}</p>
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

export default SelectAddons;
