import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import { AllTransactionAtom } from "../store/atoms/transaction";
import { TransactionsType } from "../utils/types";
import Button from "../components/Button";
import { CgImport, CgExport } from "react-icons/cg";
import Modal from "../components/Modal";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteTxn } from "../api/transaction";
import { successToast } from "../utils/toast";

export default function Transaction() {
  const transactions = useRecoilValueLoadable(AllTransactionAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transactionsRefresher = useRecoilRefresher_UNSTABLE(AllTransactionAtom);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const deleteTransaction = async (id: string) => {
    const deleted = await deleteTxn(id);

    if (deleted) {
      transactionsRefresher();
      successToast("Transaction Deleted Successfully");
    }
  };

  return (
    <div className="grid gap-y-7 p-5">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Transactions</h1>
        <div className="flex item-center gap-x-5">
          <div>
            <Button
              label="Add"
              className="w-[5rem] font-medium text-md p-2 bg-white text-black"
              onClick={handleOpenModal}
            />
            <Modal
              tTitle="Enter Transaction Details"
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>

          <Button label={CgExport} className="w-[5rem] text-xl p-2" />
          <Button label={CgImport} className="w-[5rem] text-xl p-2" />
        </div>
      </div>
      <div className="overflow-x-auto">
        {transactions.state === "loading" ? (
          <div>Loading...</div>
        ) : transactions.contents.length === 0 ? (
          <div>No transactions for now...</div>
        ) : (
          <table className="w-full text-left border-collapse shadow-md rounded-lg">
            <thead className="bg-dark text-white">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Type</th>
                <th className="p-3">Category</th>
                <th className="p-3">Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {transactions.contents.map((transaction: TransactionsType) => {
                return (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-500 last:border-none transition duration-150"
                  >
                    <td className="p-3">{transaction.title}</td>
                    <td className="p-3">{transaction.description}</td>
                    <td className="p-3">{transaction.amount}</td>
                    <td className="p-3">{transaction.type}</td>
                    <td className="p-3">{transaction.category}</td>
                    <td className="p-3">
                      {transaction.date
                        ? new Date(transaction.date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="text-red-500 mt-3">
                      <FaRegTrashAlt
                        onClick={() => {
                          deleteTransaction(transaction.id);
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
