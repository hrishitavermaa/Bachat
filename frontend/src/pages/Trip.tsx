import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import Input from "../components/Input";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../components/Button";
import { add, deleteTrip } from "../api/trip";
import { successToast } from "../utils/toast";
import { AllTripAtom } from "../store/atoms/trip";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import { TripType } from "../utils/types";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Trip() {
  const [destination, setDestination] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const trips = useRecoilValueLoadable(AllTripAtom);

  const tripRefresher = useRecoilRefresher_UNSTABLE(AllTripAtom);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    callback: Dispatch<SetStateAction<string>>
  ) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const yearsDifference = toDate.getFullYear() - fromDate.getFullYear();
    const monthsDifference = toDate.getMonth() - fromDate.getMonth();

    const totalMonthsDifference = yearsDifference * 12 + monthsDifference;
    const monthly: number = Number.parseInt(amount) / totalMonthsDifference;

    const added = await add(
      destination,
      toDate,
      fromDate,
      Number.parseInt(amount),
      monthly,
      totalMonthsDifference
    );

    if (added) {
      successToast("Trip added successfully");

      setDestination("");
      setAmount("");
      setTo("");
      setFrom("");
    }
  };

  const deletedTrip = async (id: string) => {
    const deleted: Boolean = await deleteTrip(id);

    if (deleted) {
      tripRefresher();
      successToast("Transaction Deleted Successfully");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-2 mb-5">Trips</h1>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mt-10">
            <Input
              label="Destination"
              placeholder="Enter destination"
              value={destination}
              callback={(e) => {
                handleChange(e, setDestination);
              }}
            />

            <Input
              label="Amount"
              placeholder="Enter amount"
              value={amount}
              callback={(e) => {
                handleChange(e, setAmount);
              }}
            />
          </div>
          <div className="flex items-center justify-between mt-10">
            <Input
              type="date"
              label="From"
              placeholder="Enter from-date"
              value={from}
              callback={(e) => {
                handleChange(e, setFrom);
              }}
            />

            <div className="pt-5">
              <FaArrowRight />
            </div>

            <Input
              type="date"
              label="To"
              placeholder="Enter to-date"
              className="mb-2"
              value={to}
              callback={(e) => {
                handleChange(e, setTo);
              }}
            />
          </div>
          <div className="w-full flex items-center justify-center mt-10">
            <Button label="Submit" />
          </div>
        </form>
      </div>
      <div className="overflow-x-auto">
        {trips.state === "loading" ? (
          <div>Loading...</div>
        ) : trips.contents.length === 0 ? (
          <div>No trips for now...</div>
        ) : (
          <table className="w-full text-left border-collapse shadow-md rounded-lg">
            <thead className="bg-dark text-white">
              <tr>
                <th className="p-3">Destination</th>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Months</th>
                <th className="p-3">Monthly</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {trips.contents.map((transaction: TripType) => {
                return (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-500 last:border-none transition duration-150"
                  >
                    <td className="p-3">{transaction.destination}</td>
                    <td className="p-3">
                      {transaction.from.toString()}
                    </td>
                    <td className="p-3">
                      {transaction.to.toString()}
                    </td>
                    <td className="p-3">{transaction.amount}</td>
                    <td className="p-3">{transaction.months}</td>
                    <td className="p-3">{transaction.monthly}</td>
                    <td className="text-red-500 mt-3">
                      <FaRegTrashAlt
                        onClick={() => {
                          deletedTrip(transaction.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
