import axios from "axios";

// const url = 'http://3.231.101.194/api'
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const getUsers = async () => {
  try {
    let result = (
      await axios.get(`${url}/getUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
    ).data;

    return {
      success: result.success,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};

export const getCustomerUser = async () => {
  try {
    let result = (
      await axios.get(`${url}/getCustomerUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
    ).data;

    return {
      success: result.success,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};

export const createUsers = async (data) => {
  try {
    let result = (
      await axios.post(`${url}/user`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
    ).data;

    return {
      success: result.success,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};

export const updateUsers = async (data) => {
  try {
    let result = (
      await axios.put(`${url}/user`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
    ).data;

    return {
      success: result.success,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};

export const deleteUsers = async (id) => {
  try {
    let result = (
      await axios.delete(`${url}/user?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
    ).data;

    return { success: result.success, message: result.message };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};
