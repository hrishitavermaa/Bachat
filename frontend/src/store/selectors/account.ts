import { selector } from "recoil";
import { fetchAccount } from "../../api/account";

export const AccountSelector = selector({
  key: "AccountSelector",
  get: async () => {
    const response = await fetchAccount();
    return response;
  },
});
