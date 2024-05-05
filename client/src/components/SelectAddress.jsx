import React, {useState} from "react";
import styles from "../styles/Address.module.css";
import { useForm } from "react-hook-form";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";

import Order from "./Order";

function Address() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const [, dispatch] = useRegFormContext();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'onChange' }); // Cambiar a 'onChange' para validar en cada cambio

  const onSubmit = (values) => {
    if (isValid) {
      dispatch({ type: "SET_ADDRES_DATA", data: values });
    }
    navigate("/vehicle");
  };

  const isSubmitDisabled = !isValid || address.trim() === ''; // Deshabilitar si no es válido o la dirección está vacía

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
          placeholder="Enter address"
          {...register("address")}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <div className={styles.action}>
          <div className={styles["action-content"]}>
            <div className={styles.action}>
              <div className={styles["action-content"]}>
                <button type="submit" disabled={isSubmitDisabled}>CONTINUE</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Address;