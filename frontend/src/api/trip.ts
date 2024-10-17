import axios, { isAxiosError } from "axios";
import { errorToast } from "../utils/toast";

export const add = async (
  destination: string,
  to: Date,
  from: Date,
  amount: number,
  monthly: number,
  months: number
) => {
  try {
    const payload = { destination, from, to, amount, monthly, months };
    const rexponse = await axios.post("/api/v1/trip/add", payload);
    return rexponse.data.success;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
    return false;
  }
};

export const deleteTrip = async (id: string) => {
  try {
    const rexponse = await axios.delete("/api/v1/trip/" + id);
    return rexponse.data.success;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
    return false;
  }
};

export const fetchAllTrip = async () => {
  try {
    const response = await axios.get("/api/v1/trip/all");
    return response.data.message;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
  }
};
