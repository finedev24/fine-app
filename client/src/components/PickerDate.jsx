import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { useRegFormContext } from "../providers/RegFormProvider";
import { useNavigate } from "react-router-dom";

const PickerDate = ({ serviceId, serviceVersion, bookingId, timezone }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const regFormContext = useRegFormContext(); // Obtener el contexto de RegFormProvider
  const { order, dispatch } = regFormContext;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/availability/anyStaffMember/WE4B32NILFMNZYBAWX2AGYTL"
        );
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
    const [order, dispatch] = regFormContext;

    if (dispatch) {
      const formattedDate = new Date(date).toISOString(); // Convertir la fecha a un formato legible
      dispatch({ type: "SET_DATE_DATA", data: formattedDate });
      navigate("/order");
      console.log(date);
      console.log(order);
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


  return (
    <div className="availability">
      <h4> Select appointment date </h4>
      <DatePicker
        format="YYYY-MM-DD"
        disabledDate={(current) => current && current < moment().endOf("day")}
        showTime={false} // No muestra el selector de hora
        allowClear={false}
        onChange={handleDateChange}
      />
      <h4> Available Times </h4>
      <p>
        {" "}
        You can schedule an appointment between 4 hours and 30 days ahead of
        time.{" "}
      </p>
      <div id="available-times">{availableTimes}</div>
    </div>
  );
};

export default PickerDate;
