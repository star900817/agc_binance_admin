import axios from 'axios';

// const url = 'http://3.231.101.194/api'
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const getBitaqtyGifts = async () => {
  try {
    let result = (
      await axios.get(`${url}/getAllGiftCards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;
    return {
      success: result.success,
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};

export const fetchAllBitaQtyThirdParty = async () => {
  try {
    let result = (
      await axios.get(`${url}/bitaqaty`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;
    console.log(result.data, 'adsfadsf');
    let res = [];
    if (result.data) {
      result.data.map((bitaqty) => {
        res.push({ ...bitaqty, productTag: 'bitaqty' });
      });
    }

    return { success: result.success, message: result.message, data: res };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    let result = (
      await axios.delete(`${url}/deleteBitaqtyGifts?cardId=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;

    return { success: result.success, message: result.message };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};

export const deleteBinance = async (id) => {
  try {
    let result = (
      await axios.delete(`${url}/deleteBinanceGifts?cardId=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;

    return { success: true, message: result.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const updateproduct = async (data) => {
  try {
    console.log('again', data);
    const productUpdateFormData = new FormData();
    productUpdateFormData.append('image', data.image);
    productUpdateFormData.append('cardId', data.cardId);
    productUpdateFormData.append('category', data.category);
    productUpdateFormData.append('subCategory', data.subCategory);
    productUpdateFormData.append('colection', data.colection);
    productUpdateFormData.append(
      'productDetails',
      JSON.stringify(data.productDetails)
    );
    data?.price && productUpdateFormData.append('price', data?.price || 0);
    console.log('here', productUpdateFormData);
    let result = await axios.put(
      `${url}/updateBitaqtyGifts`,
      productUpdateFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      }
    );
    return { success: result.success, message: result.message };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};

export const updateBinance = async (data) => {
  try {
    const updateProductFormData = new FormData();
    updateProductFormData.append('title', data?.title);
    updateProductFormData.append('price', data?.price);
    updateProductFormData.append('priceInSAR', data?.priceInSAR);
    updateProductFormData.append('image', data?.image);
    updateProductFormData.append('colection', data?.colection);
    updateProductFormData.append('category', data?.category);
    updateProductFormData.append('subCategory', data?.subCategory);
    updateProductFormData.append('productTag', data?.productTag);
    updateProductFormData.append('cardId', data?._id);
    updateProductFormData.append('baseToken', data.baseToken);
    updateProductFormData.append('faceToken', data.faceToken);
    updateProductFormData.append('minQty', data.minQty);
    updateProductFormData.append('isDualToken', data.isDualToken);
    updateProductFormData.append('description', data.description);

    let result = await axios.put(
      `${url}/updateBinanceGifts`,
      updateProductFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      }
    );
    return { success: result.success, message: result.message };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};

export const addProduct = async (data) => {
  try {
    const addProductFormData = new FormData();
    addProductFormData.append('image', data.image);
    addProductFormData.append('category', data.category);
    addProductFormData.append('colection', data.colection);
    addProductFormData.append('subCategory', data.subCategory);
    addProductFormData.append('priceInSAR', data.priceInSAR);
    addProductFormData.append('isFeatured', data.isFeatured);
    addProductFormData.append(
      'productDetails',
      JSON.stringify(data.productDetails)
    );
    addProductFormData.append('description', data.description);

    data?.price && addProductFormData.append('price', data?.price || 0);

    let result = await axios.post(
      `${url}/addBitaqtyGifts`,
      addProductFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      }
    );

    return { success: result.success, message: result.message };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};

export const addBinance = async (data) => {
  try {
    const addProductFormData = new FormData();
    addProductFormData.append('title', data.title);
    addProductFormData.append('price', data.price);
    addProductFormData.append('priceInSAR', data.priceInSAR);
    addProductFormData.append('image', data.image);
    addProductFormData.append('colection', data.colection);
    addProductFormData.append('category', data.category);
    addProductFormData.append('subCategory', data.subCategory);
    addProductFormData.append('productTag', data.productTag);
    addProductFormData.append('baseToken', data.baseToken);
    addProductFormData.append('faceToken', data.faceToken);
    addProductFormData.append('minQty', data.minQty);
    addProductFormData.append('isDualToken', data.isDualToken);
    addProductFormData.append('description', data.description);

    // need to changhe the API

    let result = await axios.post(
      `${url}/addBinanceGifts`,
      addProductFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      }
    );
    return { success: result.data.success, message: result.data.message };
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const fetchAllBinanceGifts = async () => {
  try {
    let result = (
      await axios.get(`${url}/getBinanceGifts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      })
    ).data;

    return { success: result.success, message: result.message, data: result };
  } catch (error) {
    console.log('error', error);
    return { success: false, message: error.response.data.message };
  }
};
