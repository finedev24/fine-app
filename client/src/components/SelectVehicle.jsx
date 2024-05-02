import React, { useState } from "react";
import styles from "../styles/VehicleType.module.css";
import { useForm } from "react-hook-form";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";

import imgSedan from "../assets/sedan.png";
import imgSuv from "../assets/suv.png";
import imgTruck from "../assets/truck.png";
import imgMotorcycle from "../assets/motorcycle.png";

function VehicleType() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [vehicleNature, setVehicleNature] = useState("");

  const [, dispatch] = useRegFormContext();
  const { register, handleSubmit } = useForm();
  const onSubmit = (values) => {
    dispatch({ type: "SET_VEHICLE_DATA", data: values });
    navigate("/services");
    console.log(values);
  };

  return (
    <div>
      <div className={styles.ProgressBar}>
        <div className={styles.pb13}></div>
        <div className={styles.pb23}></div>
        <div className={styles.pb33}></div>
      </div>
      <h2>Vehicle</h2>
      <p>Select your type of vehicle</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`${styles.list} ${
            selectedVehicle === "sedan" ? styles.selected : ""
          }`}
          onClick={() => {
            setSelectedVehicle("sedan");
            document.getElementById("sedan").click();
          }}
        >
          <label htmlFor="sedan" style={{ cursor: "pointer" }}>
            Sedans
            <input
              id="sedan"
              type="radio"
              value="sedan"
              name="vehicle"
              {...register("vehicle")}
            />
          </label>
          <img src={imgSedan} alt="Sedan" />
        </div>

        <div
          className={`${styles.list} ${
            selectedVehicle === "suv" ? styles.selected : ""
          }`}
          onClick={() => {
            setSelectedVehicle("suv");
            document.getElementById("suv").click();
          }}
        >
          <label htmlFor="suv" style={{ cursor: "pointer" }}>
            SUV's
            <input
              id="suv"
              type="radio"
              value="suv"
              name="vehicle"
              {...register("vehicle")}
            />
          </label>
          <img src={imgSuv} alt="suv" />
        </div>

        <div
          className={`${styles.list} ${
            selectedVehicle === "truck" ? styles.selected : ""
          }`}
          onClick={() => {
            setSelectedVehicle("truck");
            document.getElementById("truck").click();
          }}
        >
          <label htmlFor="truck" style={{ cursor: "pointer" }}>
            Trucks & 3Rows SUVs
            <input
              id="truck"
              type="radio"
              value="truck"
              name="vehicle"
              {...register("vehicle")}
            />
          </label>
          <img src={imgTruck} alt="truck" />
        </div>

        <div
          className={`${styles.list} ${
            selectedVehicle === "motorcycle" ? styles.selected : ""
          }`}
          onClick={() => {
            setSelectedVehicle("motorcycle");
            document.getElementById("motorcycle").click();
          }}
        >
          <label htmlFor="motorcycle" style={{ cursor: "pointer" }}>
            Motorcycle
            <input
              id="motorcycle"
              type="radio"
              value="motorcycle"
              name="vehicle"
              {...register("vehicle")}
            />
          </label>
          <img src={imgMotorcycle} alt="motorcycle" />
        </div>

        <p>What is the nature of your vehicle?</p>

        <div className={styles.listw}>
          <div
            className={`${styles.listwelement} ${
              vehicleNature === "electric" ? styles.selected : ""
            }`}
            onClick={() => {
              setVehicleNature("electric");
              document.getElementById("electric").click();
            }}
          >
            <label htmlFor="electric">
              Electric
              <input
                id="electric"
                type="radio"
                value="electric"
                name="vehicletype"
                {...register("vehicletype")}
              />
            </label>
          </div>

          <div
            className={`${styles.listwelement} ${
              vehicleNature === "hybrid" ? styles.selected : ""
            }`}
            onClick={() => {
              setVehicleNature("hybrid");
              document.getElementById("hybrid").click();
            }}
          >
            <label htmlFor="hybrid">
              Hybrid
              <input
                id="hybrid"
                type="radio"
                value="hybrid"
                name="vehicletype"
                {...register("vehicletype")}
              />
            </label>
          </div>

          <div
            className={`${styles.listwelement} ${
              vehicleNature === "gas" ? styles.selected : ""
            }`}
            onClick={() => {
              setVehicleNature("gas");
              document.getElementById("gas").click();
            }}
          >
            <label htmlFor="gas">
              Gas
              <input
                id="gas"
                type="radio"
                value="gas"
                name="vehicletype"
                {...register("vehicletype")}
              />
            </label>
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

export default VehicleType;
