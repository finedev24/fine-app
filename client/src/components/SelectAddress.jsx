import React, { useState } from "react";
import styles from "../styles/Address.module.css";
import { useForm } from "react-hook-form";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";

import Order from "./Order";

function Address() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const cityDefaultValue = "MIAMI (FLORIDA)";
  const stateDefaultValue = "FLORIDA";

  const [, dispatch] = useRegFormContext();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (values) => {
    if (isValid) {
      dispatch({ type: "SET_ADDRES_DATA", data: values });
    }
    navigate("/vehicle");
  };

  const isSubmitDisabled =
    !isValid ||
    address.trim() === "" ||
    name.trim() === "" ||
    email.trim() === "" ||
    phone.trim() === "";

  return (
    <div>
      <div className={styles.ProgressBar}>
        <div className={styles.pb13}></div>
        <div className={styles.pb23}></div>
        <div className={styles.pb33}></div>
      </div>
      <h2>Address</h2>
      <p>
        <b>Remember: We come right to your doorstep!</b>
        <br />
        Where will you schedule your detailing service?
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("city", { value: cityDefaultValue })}
          disabled
        />
        <input
          type="text"
          placeholder="Enter your address"
          {...register("address")}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <div className={styles.labelLine}>
            <span>Your contact info:</span>
            <div className={styles.labelLineHr}>
              <hr />
            </div>
          </div>
        <input
          type="text"
          placeholder="Enter your name"
          {...register("name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="tel"
          placeholder="Enter your phone number"
          {...register("phone")}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></input>

        <div className={styles.action}>
          <div className={styles["action-content"]}>
            <div className={styles.action}>
              <div className={styles["action-content"]}>
                <button type="submit" disabled={isSubmitDisabled}>
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Address;
