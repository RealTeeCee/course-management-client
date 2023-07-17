const {
  default: axiosInstance,
  axiosBearer,
} = require("../../api/axiosInstance");

export const requestLoadOrderHistory = (data) => {
  return axiosBearer.post(`/orders/history`, data);
};
export const requestLoadOrderHistoryRefund = (data) => {
  return axiosBearer.post(`/orders/history/refund`, data);
};
export const requestLoadInvoice = (data) => {
  return axiosBearer.post(`/orders/invoice`, data, {
    headers: {
      "Access-Control-Allow-Origin": `http://localhost:3000`,
    },
    responseType: "blob",
  });
};
