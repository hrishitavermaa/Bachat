import { useRecoilValueLoadable } from "recoil";
import { AllTransactionAtom } from "../store/atoms/transaction";
import { TransactionsType } from "../utils/types";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";

export default function TransactionTab() {
  const transactions = useRecoilValueLoadable(AllTransactionAtom);

  return (
    <div className="bg-dark w-[610px] px-10 py-5 rounded-lg">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold mt-2">Recent Transactions</h1>
        <Link to="/transactions">
          <GoArrowUpRight className="fixed left-[830px] text-2xl text-accent" />
        </Link>
      </div>
      <div className="py-5 pt-[2rem]">
        <div className="overflow-x-auto max-h-[250px] no-scrollbar">
          <div>
            {transactions.state === "loading" ? (
              <div>Loading...</div>
            ) : transactions.contents === null ? (
              <div>No transactions for now...</div>
            ) : (
              <table className="w-full text-left border-collapse shadow-md rounded-[10%]">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Category</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.contents.map(
                    (transaction: TransactionsType) => {
                      return (
                        <tr
                          key={transaction.id}
                          className=" transition duration-150"
                        >
                          <td className="p-3">{transaction.title}</td>
                          <td className="p-3">{transaction.amount}</td>
                          <td className="p-3">{transaction.category}</td>
                          <td>
                            <div
                              className={`flex text-sm justify-center items-center ${
                                transaction.type === "RECEIVED"
                                  ? "bg-[#073800]"
                                  : "bg-[#380000]"
                              } p-0 aspect-square rounded-[50%]`}
                            >
                              {transaction.type === "RECEIVED" ? (
                                <FaArrowDown className="text-green-500" />
                              ) : (
                                <FaArrowUp className="text-red-500" />
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
