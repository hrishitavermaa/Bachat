import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { web3Balance } from "../api/transaction";

export default function Portfolio() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    callback: Dispatch<SetStateAction<string>>
  ) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bal = await web3Balance(address);

    if (bal) {
      setBalance(bal);
      setAddress("");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-2 mb-5">Web3 Portfolio</h1>
      <form className="flex items-center gap-x-5" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter solana wallet address"
          value={address}
          callback={(e) => {
            handleChange(e, setAddress);
          }}
        />
        <Button label="Balance" className="w-1/6" />
      </form>
      <div className="mt-5 text-3xl">Balance: {balance} {balance ? "sol" : ""}</div>
    </div>
  );
}
