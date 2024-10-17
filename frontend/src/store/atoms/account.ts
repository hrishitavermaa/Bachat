import { atom } from "recoil";
import { AccountSelector } from "../selectors/account";

export const AccountAtom = atom({
  key: "AccountAtom",
  default: AccountSelector,
});
