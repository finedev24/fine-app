import React, { useState } from "react";

function DatePickerHandler ({
  availabilities,
  serviceId,
  serviceVersion,
  bookingId,
  businessTimeZone,
  //regFormContext
}) {
  const [availabilityMap, setAvailabilityMap] = useState(
    createDateAvailableTimesMap(availabilities, businessTimeZone)
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState(renderAvailableTimes());

  function createDateAvailableTimesMap(availabilities, businessTimeZone) {
    const dateAvailableTimesMap = {};
    availabilities.forEach((availability) => {
      const startAtDate = new Date(availability.startAt);
      const businessTime = new Date(
        startAtDate.toLocaleString("en-US", { timeZone: businessTimeZone })
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
  }

  function formatToAmPm(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours % 12 ? hours % 12 : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${date.getHours() >= 12 ? "pm" : "am"}`;
  }

  function handleDateChange(date) {
    setSelectedDate(date);
    setAvailableTimes(renderAvailableTimes());
    return availableTimes;
  }

  function renderAvailableTimes() {
    const availabilities =
      availabilityMap[formatDate(selectedDate)] || [];
    if (!availabilities || availabilities.length === 0) {
      // No hay disponibilidad para el día seleccionado
      return <div>No available times for selected date</div>;
    }
    return availabilities.map((availability) => (
      <button
        key={availability.date}
        className="available-time"
        onClick={() => handleTimeSelection(availability)}
      >
        {availability.time}
      </button>
    ));
  }

  function handleTimeSelection(availability) {
    const { teamMemberId, date } = availability;
    const [order, dispatch] = regFormContext;

    if (dispatch) {
      dispatch({ type: "SET_DATETIME_DATA", data: date });
      console.log("Values:", {
        service: serviceId,
        date,
      });
      console.log(order);
    } else {
      console.error("Dispatch is not defined in RegFormContext");
    }
  }

  function formatDate(date) {
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
  }

  return (
    <>
      <h2>HOLA</h2>
      <p>Hola</p>
    </>
  );
};

export default DatePickerHandler;
