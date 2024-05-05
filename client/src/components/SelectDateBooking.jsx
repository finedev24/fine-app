import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import style from "../styles/SelectDateBooking.module.css";
import moment from "moment";

function SelectDateBooking() {
  const [addons, setAddons] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [, dispatch] = useRegFormContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm();

  useEffect(() => {
    fetch(
      "http://localhost:5000/availability/anyStaffMember/WE4B32NILFMNZYBAWX2AGYTL"
    )
      .then((response) => response.json())
      .then((data) => setAddons(data.objects || []))
      .catch((error) => {
        console.error("Error al obtener los servicios:", error);
        setAddons([]);
      });
  }, []);

  useEffect(() => {
    fetchAvailabilities();
  }, [selectedDate]);

  const fetchAvailabilities = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/availability/anyStaffMember/WE4B32NILFMNZYBAWX2AGYTL?date=${formatDate(
          selectedDate
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAvailabilities(data.availabilities);
    } catch (error) {
      console.error("There was a problem fetching the availabilities:", error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [year, month, day].join("-");
  };

  const renderAvailableTimes = () => {
    // Implementa la lógica de renderizado de tiempos disponibles aquí
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
      <div className="availability">
        <h4>Select appointment date</h4>
        <input
          type="date"
          value={moment(selectedDate).format("YYYY-MM-DD")}
          onChange={(e) => handleDateChange(e.target.value)}
        />
        <h4>Available Times</h4>
        <p>
          You can schedule an appointment between 4 hours and 30 days ahead of
          time.
        </p>
        <div id="available-times">{availableTimes}</div>
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
