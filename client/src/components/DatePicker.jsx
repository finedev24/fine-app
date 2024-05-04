import React, { Component } from "react";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availabilityMap: this.createDateAvailableTimesMap(
        props.availabilities,
        props.businessTimeZone
      ),
      selectedDate: new Date().toISOString().split("T")[0],
    };
  }

  createDateAvailableTimesMap(availabilities, businessTimeZone) {
    const dateAvailableTimesMap = {};
    if (!availabilities) return dateAvailableTimesMap; // Otra opción es lanzar un error o manejar la situación de otra manera
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
        time: this.formatToAmPm(businessTime),
      });
      dateAvailableTimesMap[startDate] = availableTimes;
    });
    return dateAvailableTimesMap;
  }

  formatToAmPm(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours % 12 ? hours % 12 : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${date.getHours() >= 12 ? "pm" : "am"}`;
  }
  selectNewDate = (date) => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate, availabilityMap } = this.state;
    const availabities = availabilityMap[selectedDate] || [];
    return (
      <div>
        <p>Select Date:</p>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => this.selectNewDate(e.target.value)}
        />
        <div id="available-times">
          {availabities.length > 0 ? (
            availabities.map((availability) => (
              <form
                key={availability.date}
                action={
                  this.props.bookingId
                    ? `/booking/${this.props.bookingId}/reschedule?startAt=${availability.date}`
                    : "/contact"
                }
                method={this.props.bookingId ? "post" : "get"}
              >
                {/* Hidden inputs for GET contact action */}
                {this.props.bookingId && (
                  <>
                    <input
                      type="hidden"
                      name="serviceId"
                      value={this.props.serviceId}
                    />
                    <input
                      type="hidden"
                      name="staff"
                      value={availability.teamMemberId}
                    />
                    <input
                      type="hidden"
                      name="startAt"
                      value={availability.date}
                    />
                    <input
                      type="hidden"
                      name="version"
                      value={this.props.serviceVersion}
                    />
                  </>
                )}
                <button className="available-time" type="submit">
                  {availability.time}
                </button>
              </form>
            ))
          ) : (
            <p className="no-times-available-msg">
              There are no times available for this date - please select a new
              date.
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default DatePicker;
