import axios from 'axios';

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;
// const url = "http://localhost:3001/api/";

export const createCategory = async (data) => {
  try {
    let result = (
      await axios.post(`${url}/addCategory`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;
    console.log('result', result);

    return {
      success: result.code,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log('error', error);
    // return { success: false, message: error.data.message };
  }
};

export const getCategories = async () => {
  try {
    let result = (
      await axios.get(`${url}/getCategoryS`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;
    return {
      success: result.code,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};

export const swapCategory = async (firstID, secondID) => {
  try {
    let x = {
      firstID,
      secondID,
    };
    let result = (
      await axios.post(`${url}/swapCategory`, x, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;

    return {
      success: result.code,
      message: result.message,
    };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};

export const deleteCategory = async (id) => {
  try {
    let x = {
      categoryId: id,
    };
    let result = (
      await axios.post(`${url}/deleteCategory`, x, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;

    return {
      success: result.code,
      message: result.message,
    };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};

export const updateCategoryDetail = async (data) => {
  try {
    let result = (
      await axios.post(`${url}/editCategory`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;
    console.log('result', result);

    return {
      success: result.code,
      message: result.message,
    };
  } catch (error) {
    console.log('error', error);
    // return { success: false, message: error.data.message };
  }
};
