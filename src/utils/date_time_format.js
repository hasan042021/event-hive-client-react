import moment from "moment";

export function formatDate(dateString) {
  const formattedDate = moment(dateString).format(" MMMM Do, YYYY");
  return formattedDate;
}
export function convertTo12HourFormat(timeString) {
  const time = moment(timeString, "HH:mm:ss");
  const formattedTime = time.format("h:mm A");
  return formattedTime;
}
export const isWithinDateRange = (eventDate, startDate, endDate) => {
  if (!startDate || !endDate) return true; // If no range is selected, show all events
  return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
};
