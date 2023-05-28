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
