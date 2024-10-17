import { atom } from "recoil";
import { AllTransactionSelector } from "../selectors/transaction";

export const AllTransactionAtom = atom({
  key: "AllTransactionAtom",
  default: AllTransactionSelector,
});
