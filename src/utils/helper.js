import { toast } from "react-toastify";
import { MESSAGE_GENERAL_FAILED } from "../constants/config";

// Input: 123456 - Output: 123.456 using For Count items
export function formatNumber(number) {
  if (number === null || isNaN(number)) number = 0;
  const formattedNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formattedNumber;
}

// priceStr: 1,000,000 - Output: 1000000
export function convertStrMoneyToInt(strMoney) {
  if (strMoney === 0) return strMoney;
  const numberString = strMoney.replace(/,/g, "");
  const intValue = parseInt(numberString, 10);
  if (Number.isNaN(intValue)) return 0;

  return intValue;
}

// number: 1000000 - Output: 1,000,000
export function convertIntToStrMoney(number) {
  if (number === null) {
    number = 0;
  }
  const numberString = number.toString();
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(numberWithoutCommas);
}

// Using in Catch message, Input an error is required
export function showMessageError(error) {
  if (error.response && error.response.data) {
    toast.error(error.response.data.message);
  } else {
    toast.error(MESSAGE_GENERAL_FAILED);
  }
}

// Get Duration for Video
export function getDurationFromVideo(
  e,
  setValue = () => {},
  name = "duration"
) {
  const video = document.createElement("video");

  video.preload = "metadata";
  video.onloadedmetadata = function () {
    setValue(name, Math.round(video.duration));
  };

  video.src = URL.createObjectURL(e.target.files[0]);
}

// Convert second to DiffForHumans Timming, Input: 96, output: 1 min 36 seconds
export function convertSecondToDiffForHumans(seconds = 3600) {
  // >= 1 hour
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    let formattedDuration = `${hours} ${hours >= 1 ? "hours" : "hour"}`;

    if (minutes >= 1) {
      formattedDuration += ` ${minutes} ${minutes >= 1 ? "mins" : "min"}`;
    }

    return formattedDuration;
  } else if (seconds >= 60) {
    // >= 1 min
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    let formattedDuration = `${minutes} ${minutes >= 1 ? "mins" : "min"}`;

    if (remainingSeconds >= 1) {
      formattedDuration += ` ${remainingSeconds} ${
        remainingSeconds >= 1 ? "seconds" : "second"
      }`;
    }

    return formattedDuration;
  } else {
    // Less than 1 minute
    return `${Math.round(seconds)} ${seconds >= 1 ? "seconds" : "second"}`;
  }
}

// Convert second to Time, Input: 96, output: 1:36
export function convertSecondToTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  if (hours > 0) {
    return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
  } else {
    return `${minutes}:${padZero(seconds)}`;
  }

  function padZero(num) {
    return num.toString().padStart(2, "0");
  }
}
