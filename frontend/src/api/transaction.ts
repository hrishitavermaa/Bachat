import axios, { isAxiosError } from "axios";
import { errorToast } from "../utils/toast";
import { TransactionsType } from "../utils/types";

export const fetchAllTransaction = async () => {
  try {
    const response = await axios.get("/api/v1/transaction/all");
    return response.data.message;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
  }
};

export const addTxn = async (
  payload: Omit<TransactionsType, "id" | "date">
) => {
  try {
    const response = await axios.post("/api/v1/transaction/add", payload);
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

export const deleteTxn = async (id: string) => {
  try {
    const rexponse = await axios.delete("/api/v1/transaction/" + id);
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

export const web3Balance = async (id: string) => {
  try {
    const rexponse = await axios.get("/api/v1/account/web3/balance/" + id);
    return rexponse.data.message;
  } catch (err) {
    if (isAxiosError(err)) {
      errorToast(err.response?.data.message);
    } else {
      errorToast("Something went wrong");
    }
    return false;
  }
};
