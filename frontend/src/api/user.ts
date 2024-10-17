import axios, { isAxiosError } from "axios";
import { errorToast } from "../utils/toast";

export const signup = async (
  name: string,
  email: string,
  password: string,
  limit: number
): Promise<Boolean> => {
  try {
    const payload = { name, email, password, limit };
    const response = await axios.post("/api/v1/user/signup", payload);
    return response.data.success;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
    return false;
  }
};

export const signin = async (
  email: string,
  password: string
): Promise<Boolean> => {
  try {
    const payload = { email, password };
    const response = await axios.post("/api/v1/user/signin", payload);
    return response.data.success;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await axios.delete("/api/v1/user/logout");
    return response.data.success;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
    return false;
  }
};
