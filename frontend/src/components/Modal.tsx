import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import Input from "./Input";
import { addTxn } from "../api/transaction";
import { successToast } from "../utils/toast";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { AllTransactionAtom } from "../store/atoms/transaction";

type ModalProps = {
  tTitle: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ tTitle, isOpen, onClose }: ModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const transactionsRefresher = useRecoilRefresher_UNSTABLE(AllTransactionAtom);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    callback: Dispatch<SetStateAction<string>>
  ) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const added = await addTxn({
      title,
      description,
      amount: Number.parseInt(amount),
      type,
      category,
    });
    if (added) {
      transactionsRefresher();
      successToast("Transaction added successfully");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <form
        className="bg-theme p-8 rounded-lg w-[35rem]"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h2 className="text-xl font-bold mb-10">{tTitle}</h2>
        <div className="space-y-5">
          <Input
            label="Title"
            value={title}
            callback={(e) => {
              handleChange(e, setTitle);
            }}
            placeholder="Enter title"
            className="w-full px-5 py-3"
          />
          <Input
            label="Description"
            value={description}
            callback={(e) => {
              handleChange(e, setDescription);
            }}
            placeholder="Enter description"
            className="w-full px-5 py-3"
          />
          <Input
            label="Amount"
            value={amount}
            callback={(e) => {
              handleChange(e, setAmount);
            }}
            placeholder="Enter amount"
            className="w-full px-5 py-3"
          />

          <div>
            <label className="block mb-2">Type</label>
            <div className="relative">
              <select
                name="type"
                value={type}
                onChange={(e) => handleChange(e, setType)}
                className="bg-dark px-7 py-5 w-[30rem] text-gray-400 border-none outline-none rounded-md appearance-none pr-10"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="RECEIVED">Credit</option>
                <option value="SENT">Debit</option>
              </select>
              <div className="absolute inset-y-0 right-7 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="relative">
            <label className="block mb-2">Category</label>
            <select
              name="category"
              value={category}
              onChange={(e) => handleChange(e, setCategory)}
              className="bg-dark px-7 py-5 w-[30rem] text-gray-400 border-none outline-none rounded-md appearance-none pr-10"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="health">Health</option>
              <option value="education">Education</option>
            </select>
            <div className="absolute inset-y-0 right-7 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
