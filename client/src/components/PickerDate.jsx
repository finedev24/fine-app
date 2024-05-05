import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";
import { FiClock } from "react-icons/fi";
import style from "../styles/SelectDateBooking.module.css";

const PickerDate = ({ serviceId, serviceVersion, bookingId, timezone }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const regFormContext = useRegFormContext();
  const [order, dispatch] = regFormContext;
  const navigate = useNavigate();

  const baseUrl = "https://fine-node-1.onrender.com/availability/anyStaffMember/";

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const url = baseUrl + order.service.serviceId;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAvailabilities(data.availabilities);
      } catch (error) {
        console.error(
          "There was a problem fetching the availabilities:",
          error
        );
      }
    };

    fetchAvailabilities();
  }, []);

  useEffect(() => {
    setAvailableTimes(renderAvailableTimes());
  }, [availabilities, selectedDate]);

  const renderAvailableTimes = () => {
    const dateAvailableTimesMap = createDateAvailableTimesMap();
    const availabilitiesForDate =
      dateAvailableTimesMap[formatDate(selectedDate)];
    if (!availabilitiesForDate || availabilitiesForDate.length === 0) {
      return <div>No available times for selected date</div>;
    }
    return availabilitiesForDate.map((availability) => (
      <button
        key={availability.date}
        className="available-time"
        onClick={() => handleTimeSelection(availability)}
      >
        {availability.time}
      </button>
    ));
  };

  const createDateAvailableTimesMap = () => {
    const dateAvailableTimesMap = {};
    availabilities.forEach((availability) => {
      const startAtDate = new Date(availability.startAt);
      const businessTime = new Date(
        startAtDate.toLocaleString("en-US", { timeZone: timezone })
      );
      const month = ("0" + (businessTime.getMonth() + 1)).slice(-2);
      const date = ("0" + businessTime.getDate()).slice(-2);
      const startDate = `${businessTime.getFullYear()}-${month}-${date}`;
      const availableTimes = dateAvailableTimesMap[startDate] || [];
      availableTimes.push({
        date: availability.startAt,
        teamMemberId: availability.appointmentSegments[0].teamMemberId,
        time: formatToAmPm(businessTime),
      });
      dateAvailableTimesMap[startDate] = availableTimes;
    });
    return dateAvailableTimesMap;
  };

  const formatToAmPm = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours % 12 ? hours % 12 : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${date.getHours() >= 12 ? "pm" : "am"}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (availability) => {
    const { teamMemberId, date } = availability;

    if (dispatch) {
      const formattedDate = new Date(date).toISOString();
      dispatch({ type: "SET_DATE_DATA", data: formattedDate });
      navigate("/booking/order");
    } else {
      console.error("Dispatch is not defined in RegFormContext");
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

  const duracionEnMilisegundos = order.duration;
  const duracionEnHoras = duracionEnMilisegundos / 3600000; // Convertir a horas

  const horas = Math.floor(duracionEnHoras); // Obtener la parte entera de las horas
  const minutos = Math.round((duracionEnHoras - horas) * 60); // Calcular los minutos restantes

  let duracionFormateada = "";
  if (horas === 1) {
    duracionFormateada += `${horas} hora`;
  } else {
    duracionFormateada += `${horas} horas`;
  }

  if (minutos > 0) {
    if (horas === 1) {
      duracionFormateada += ` ${minutos} minutos`;
    } else {
      duracionFormateada += ` y ${minutos} minutos`;
    }
  }

  return (
    <div className="availability">
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
            <b>{duracionFormateada}</b>
          </span>
        </div>
      </div>

      <div className={style["select-datetime-item"]}>
        <div className={style.labelLine}>
          <span>Date</span>
          <div className={style.labelLineHr}>
            <hr />
          </div>
        </div>
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={(current) => current && current < moment().endOf("day")}
          showTime={false}
          allowClear={false}
          onChange={handleDateChange}
        />
      </div>

      <div className={style["select-datetime-item"]}>
        <div className={style.labelLine}>
          <span>Time</span>
          <div className={style.labelLineHr}>
            <hr />
          </div>
        </div>
        <div id="available-times" className={style["available-times"]}>
          {availableTimes}
        </div>
      </div>
    </div>
  );
};

export default PickerDate;
