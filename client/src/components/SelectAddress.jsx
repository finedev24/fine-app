import React from "react";
import styles from "../styles/Address.module.css";
import { useForm } from "react-hook-form";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";

import Order from "./Order";

function Address() {
  const navigate = useNavigate();

  const [, dispatch] = useRegFormContext();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const onSubmit = (values) => {
    if (isValid) {
      dispatch({ type: "SET_ADDRES_DATA", data: values });
    }
    navigate("/vehicle");
  };

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
          placeholder="Enter adress"
          {...register("address")}
        ></input>
        <div className={styles.action}>
          <div className={styles["action-content"]}>
            <div className={styles.action}>
              <div className={styles["action-content"]}>
                <button type="submit">Enviar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Address;
