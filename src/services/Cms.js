import axios from "axios";
import { separateCMSImages } from "../util/helper";

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const getCms = async (cmsType = "partnerLogo") => {
  try {
    let result = (
      await axios.get(`${url}/cms/getCMSImages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      })
    ).data;

    let separatedItems = separateCMSImages(result.data, cmsType);

    return {
      success: result.success,
      message: result.message,
      data: separatedItems,
    };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    let result = (
      await axios.delete(`${url}/cms/deleteCMSImage?imageId=${id}`, {
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

export const addProduct = async (data, imageType = "partnerLogo") => {
  try {
    const addProductFormData = new FormData();
    addProductFormData.append("imageType", imageType);

    data?.map((image) => {
      addProductFormData.append("partnerlogo", image);
    });

    let result = await axios.post(
      `${url}/cms/addPartnerLogoImage`,
      addProductFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    );

    return { success: true, message: result.data.message };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};

export const addCardSliderImages = async (data, imageType = "cardslider") => {
  try {
    const addProductFormData = new FormData();
    addProductFormData.append("imageType", imageType);

    data?.map((image) => {
      addProductFormData.append("cardslider", image);
    });

    let result = await axios.post(
      `${url}/cms/addCardSliderImage`,
      addProductFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    );

    return { success: true, message: result.data.message };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};
