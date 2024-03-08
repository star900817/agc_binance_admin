import axios from "axios";

const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;
export const login = async (emailOrPhone, password) => {
  try {
    let result = (
      await axios.post(`${url}/signInByAdmin`, { emailOrPhone, password })
    ).data;

    if (result.success) {
      localStorage.setItem("admin_token", result.accessToken);
      localStorage.setItem(
        "accessList",
        JSON.stringify(result.data.userAccess)
      );
    }

    return { success: result.success, message: result.message };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: error.response.data.message };
  }
};
