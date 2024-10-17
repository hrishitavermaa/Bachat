import { selector } from "recoil";
import { fetchAllTrip } from "../../api/trip";

export const AllTripSelector = selector({
  key: "AllTripSelector",
  get: async () => {
    const response = await fetchAllTrip();
    return response;
  },
});
