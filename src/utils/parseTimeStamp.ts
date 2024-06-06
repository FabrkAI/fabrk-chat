// typescript
export function formatTimeStampToHumanReadableShortDateTime(
  timestamp: string
): string {
  // Create a Date object from the timestamp string
  const date = new Date(timestamp);

  // Extract the components from the Date object
  const month = date.getMonth() + 1; // Months are zero-based, so we need to add 1
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Convert the hours to a 12-hour format
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const amPm = hour < 12 ? "AM" : "PM";

  // Prepare formatted strings for each component
  const monthStr = month.toLocaleString("en-US", { minimumIntegerDigits: 1 });
  const dayStr = day.toLocaleString("en-US", { minimumIntegerDigits: 1 });
  const hourStr = hour12.toLocaleString("en-US", { minimumIntegerDigits: 1 });
  const minuteStr = minute.toLocaleString("en-US", { minimumIntegerDigits: 2 });

  // Combine the formatted strings into the final result
  return `${monthStr}/${dayStr}/${year} ${hourStr}:${minuteStr} ${amPm}`;
}

export function formatTimeStampToHumanReadableDateTimeSeconds(
  timestamp: string
): string {
  // Create a Date object from the timestamp string
  const date = new Date(timestamp);

  // Extract the components from the Date object
  const month = date.getMonth() + 1; // Months are zero-based, so we need to add 1
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Convert the hours to a 12-hour format
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const amPm = hour < 12 ? "AM" : "PM";

  // Prepare formatted strings for each component
  const monthStr = month.toLocaleString("en-US", { minimumIntegerDigits: 1 });
  const dayStr = day.toLocaleString("en-US", { minimumIntegerDigits: 1 });
  const hourStr = hour12.toLocaleString("en-US", { minimumIntegerDigits: 1 });
  const minuteStr = minute.toLocaleString("en-US", { minimumIntegerDigits: 2 });
  const seconds = date.getSeconds();

  // Combine the formatted strings into the final result
  return `${monthStr}/${dayStr}/${year} ${hourStr}:${minuteStr}:${seconds} ${amPm}`;
}

export function formatTimeStampToHumanReadableTime(timestamp: string): string {
  if (!timestamp) return "";
  // Create a Date object from the timestamp string
  const date = new Date(timestamp);

  const hour = date.getHours();
  const minute = date.getMinutes();

  // Convert the hours to a 12-hour format
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const amPm = hour < 12 ? "AM" : "PM";

  const hourStr = hour12.toLocaleString("en-US", { minimumIntegerDigits: 1 });
  const minuteStr = minute.toLocaleString("en-US", { minimumIntegerDigits: 2 });

  // Combine the formatted strings into the final result
  return `${hourStr}:${minuteStr} ${amPm}`;
}

export function formatFullDateToShortDate(inputDate: string): string {
  if (!inputDate) return "";
  const dateParts = inputDate.split("-");
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  return `${month}/${day}`;
}

// Wed Sep 06 2023 00:00:00 GMT-0400 (Eastern Daylight Time) to 2023-09-06 format
export function convertDateToRawDate(inputDate: Date): string {
  if (!inputDate) return "";

  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1; // JavaScript months are 0-based
  const day = inputDate.getDate();

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

export function yearMonthDayToMonthDayYear(inputDate: string): string {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Months are 0-based in JS
  const day = date.getUTCDate();

  return `${month}/${day}/${year}`;
}

export function formatTimestampToHumanReadable(timestamp: number): string {
  // Convert the Unix timestamp from seconds to milliseconds
  const date = new Date(timestamp * 1000);

  // Format the date
  return date.toLocaleString("en-US", {
    month: "short", // abbreviated month name
    day: "numeric", // day of the month
    year: "numeric", // year
    hour: "numeric", // hour
    minute: "2-digit", // minute with two digits
    hour12: true, // use 12-hour format
  });
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function numericMonthYearToString(month: number, year: number): string {
  if (month < 1 || month > 12) return "";
  if (year < 0) return "";
  const monthStr = months[month - 1];

  return `${monthStr} ${String(year)}`;
}

export function numericMonthDayYearToString(
  month: number,
  day: number,
  year: number
): string {
  if (month < 1 || month > 12) return "";
  if (day < 1 || day > 31) return "";
  if (year < 0) return "";
  const monthStr = months[month - 1];

  return `${monthStr} ${String(day)}, ${String(year)}`;
}

export function extrapolateYearlyRevenue(
  totalRevenueToDate: number,
  startDate: string
): number {
  // Parse the start date and get the current date
  const start = new Date(startDate);
  const now = new Date();

  // Calculate the number of days between the start date and the current date
  const daysPassed = (now.getTime() - start.getTime()) / (1000 * 3600 * 24);

  // Calculate daily revenue
  const dailyRevenue = totalRevenueToDate / daysPassed;

  // Extrapolate to yearly revenue
  const yearlyRevenue = dailyRevenue * 365;

  return yearlyRevenue;
}

export function formatIntervalToHumanReadable(interval: string): string {
  // Check if the interval contains "NaN"
  if (interval.includes("NaN")) {
    return "N/A";
  }

  // Split the interval into components
  const components = interval.split(" ");
  let formattedComponents: string[] = [];

  // Iterate through the components and format
  for (let i = 0; i < components.length; i += 2) {
    let value = components[i];
    let unit = components[i + 1];

    // Check for zero values
    if (value !== "0") {
      // Format seconds to remove decimal
      if (unit.startsWith("second")) {
        value = Math.floor(parseFloat(value)).toString();
      }
      formattedComponents.push(`${value} ${unit}`);
    }
  }

  return formattedComponents.join(" ").trim();
}

export function secondsToTimeFormat(totalSeconds: number): string {
  const secondsPerMinute = 60;
  const minutesPerHour = 60;
  const hoursPerDay = 24;
  const secondsPerHour = secondsPerMinute * minutesPerHour;
  const secondsPerDay = secondsPerHour * hoursPerDay;

  const days = Math.floor(totalSeconds / secondsPerDay);
  const hours = Math.floor((totalSeconds % secondsPerDay) / secondsPerHour);
  const minutes = Math.floor(
    (totalSeconds % secondsPerHour) / secondsPerMinute
  );
  const seconds = totalSeconds % secondsPerMinute;

  let timeString = "";
  if (days > 0) {
    timeString += `${days} days `;
  }
  if (hours > 0) {
    timeString += `${hours} hours `;
    return timeString.trim();
  }
  if (minutes > 0) {
    timeString += `${minutes} minutes `;
  }
  if (seconds > 0 || totalSeconds === 0) {
    timeString += `${seconds} seconds`;
  }

  return timeString.trim();
}

export function getMonthStartAndEndDate({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  // JavaScript counts months from 0 to 11, so subtract 1 from the given month
  const startDate = new Date(year, month - 1, 1);

  // To get the last day of the month, move to the first day of the next month and subtract one day
  const endDate = new Date(year, month, 0);

  // Format the dates as "YYYY-MM-DD"
  const formatStartDate = startDate.toISOString().split("T")[0];
  const formatEndDate = endDate.toISOString().split("T")[0];

  return { startDate: formatStartDate, endDate: formatEndDate };
}

export function parseDateToTimestamp(date: string): number {
  if (!date) return 0;
  return new Date(date).getTime();
}
