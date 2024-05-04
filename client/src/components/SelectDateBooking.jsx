import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import style from "../styles/SelectDateBooking.module.css";

function SelectDateBooking() {
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/aviability")
      .then((response) => response.json())
      .then((data) => setAddons(data.objects || []))
      .catch((error) => {
        console.error("Error al obtener los servicios:", error);
        setAddons([]);
      });
  }, []);

  const navigate = useNavigate();
  const [, dispatch] = useRegFormContext();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    if (isValid) {
      dispatch({
        type: "SET_DATETIME_DATA",
        data: { date: data.date, time: data.time },
      });
      console.log(data);
      navigate("/order");
    }
  };

  return (
    <div>
      <h2>Schedule your service</h2>
      <p>
        Please select a day and time that works for you, keeping in mind the
        estimated duration of service.
      </p>
      <div className={style["duration-box"]}>
        <div className={style["duration-box-icon"]}>
          <FiClock />
        </div>
        <div className={style["duration-box-content"]}>
          <span>Estimated duration of service</span>
          <span>
            <b>2 to 3 hours</b>
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style["select-datetime-item"]}>
          <div className={style.labelLine}>
            <label>Date</label>
            <div className={style.labelLineHr}>
              <hr />
            </div>
          </div>
          <input type="date" {...register("date")} />
        </div>
        <div className={style["select-datetime-item"]}>
          <div className={style.labelLine}>
            <label>Time</label>
            <div className={style.labelLineHr}>
              <hr />
            </div>
          </div>
          <input type="time" {...register("time")} />
        </div>
        <div className={style.action}>
          <div className={style["action-content"]}>
            <button type="submit">Enviar</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SelectDateBooking;
