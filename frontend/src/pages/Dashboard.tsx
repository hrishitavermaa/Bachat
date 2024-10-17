import { useState } from "react";
import MutualFundCard from "../components/MutualFundCard";
import Quiz from "../components/Quiz";
import SlotMachine from "../components/SlotMachine";
import TransactionTab from "../components/TransactionTab";
import { incToken } from "../api/account";
import { useRecoilStateLoadable } from "recoil";
import { AccountAtom } from "../store/atoms/account";

export default function Dashboard() {
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [account, setAccount] = useRecoilStateLoadable(AccountAtom);

  const handleWin = () => {
    setHasWon(true);
    setIsQuizVisible(true);
  };

  const handleQuizComplete = async () => {
    const response = await incToken();

    setAccount(response);

    setIsQuizVisible(false);
    setHasWon(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="mt-7 flex justify-between">
        <TransactionTab />
        <MutualFundCard />
      </div>
      {account.state === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-dark w-[700px] px-10 py-5 rounded-lg mt-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mt-3">Slot Machine</h1>
            <p className="text-2xl">Token: {account.contents.token}</p>
          </div>
          <SlotMachine onWin={handleWin} />
          {isQuizVisible && <Quiz onComplete={handleQuizComplete} />}
          {hasWon && !isQuizVisible && (
            <p>
              Congratulations! You won. Complete the quiz to claim your reward.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
