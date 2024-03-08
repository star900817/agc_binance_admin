import axios from 'axios';

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;
// const url = "http://localhost:3001/api/";

export const createCollection = async (data) => {
  try {
    let result = (
      await axios.post(`${url}/addCollection`, data, {
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

export const getCollections = async () => {
  try {
    let result = (
      await axios.get(`${url}/getCollectionsS`, {
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

export const deleteCollection = async (id) => {
  try {
    let x = {
      collectionId: id,
    };
    let result = (
      await axios.post(`${url}/deleteCollection`, x, {
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

export const updateCollectionDetail = async (data) => {
  try {
    let result = (
      await axios.post(`${url}/editCollection`, data, {
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

export const swapCollection = async (firstID, secondID) => {
  try {
    let x = {
      firstID,
      secondID,
    };
    let result = (
      await axios.post(`${url}/swapCollection`, x, {
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
