import axios from "axios";

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const getOrders = async () => {
  try {
    let result = (
      await axios.get(`${url}/getAllOrders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
    ).data;
    console.log(result.data, "adsfadfhello");
    return {
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};

export const sendCodesForOrders = async (data) => {
  try {
    let result = (
      await axios.post(`${url}/sendProductCodeEmail`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
    ).data;

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};

export const getDashboardData = async () => {
  try {
    let result = (
      await axios.get(`${url}/getDashboardData`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
    ).data;

    return {
      message: result.message,
      data: result.data,
      orders: result.lastOrders,
      graph: result.salesData,
    };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};
