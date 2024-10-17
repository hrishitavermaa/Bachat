import { selector } from "recoil";
import { fetchAllTransaction } from "../../api/transaction";

export const AllTransactionSelector = selector({
  key: "AllTransactionsSelector",
  get: async () => {
    const response = await fetchAllTransaction();
    return response;
  },
});
