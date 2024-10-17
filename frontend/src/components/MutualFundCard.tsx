import { useRecoilValueLoadable } from "recoil";
import { fetchReturn } from "../utils/sip";
import Button from "./Button";
import { AccountAtom } from "../store/atoms/account";

export default function MutualFundCard() {
  const account = useRecoilValueLoadable(AccountAtom);

  return (
    <div className="bg-dark w-[600px] px-10 py-10 rounded-lg">
      {account.state === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-7">
            Long Term Investments
          </h1>
          <p className="text-gray-400 mb-2">Best Mutual Fund (1 yr returns)</p>
          <h2 className="text-2xl">ABSL PSU Equity Fund(39.78% returns)</h2>
          <p className="text-gray-400 mt-10">
            1 yr returns (as per your accounts)
          </p>
          {fetchReturn(account.contents.balance) === 0 ? (
            <div className="mt-10 text-3xl">Not investible amount</div>
          ) : (
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl mt-2">
                  ₹{fetchReturn(account.contents.balance)}
                </h2>
                <p className="text-gray-400 mt-2">
                  If you invest ₹{account.contents.balance / 36}/month
                </p>
              </div>
              <Button label="Invest now" className="py-1 w-[7rem]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
