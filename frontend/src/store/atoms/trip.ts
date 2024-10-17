import { atom } from "recoil";
import { AllTripSelector } from "../selectors/trip";

export const AllTripAtom = atom({
  key: "AllTripAtom",
  default: AllTripSelector,
});
