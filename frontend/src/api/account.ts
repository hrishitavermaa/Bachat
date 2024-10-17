import axios, { isAxiosError } from "axios";
import { errorToast } from "../utils/toast";

export const fetchAccount = async () => {
  try {
    const response = await axios.get("/api/v1/account/profile");
    return response.data.message;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
  }
};

export const incToken = async () => {
  try {
    const response = await axios.get("/api/v1/account/token");
    return response.data.message;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
  }
};
