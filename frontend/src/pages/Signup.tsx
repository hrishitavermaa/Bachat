import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { signup } from "../api/user";
import { useNavigate } from "react-router-dom";
import { successToast } from "../utils/toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [limit, setLimit] = useState("");

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    callback: Dispatch<SetStateAction<string>>
  ) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signed = await signup(name, email, password, Number.parseInt(limit));

    if (signed) {
      successToast("Signed up successfully");

      navigate("/");

      setName("");
      setEmail("");
      setPassword("");
      setLimit("");
    }
  };

  return (
    <div className="w-full grid place-content-center items-center">
      <form className="grid gap-y-7" onSubmit={handleSubmit}>
        <div className="grid gap-y-3">
          <h1 className="text-5xl font-bold">
            Sign<span className="text-accent">Up</span>
          </h1>
          <p className="text-md text-gray-400 font-medium">
            Join our community now and save your money.
          </p>
        </div>
        <Input
          label="Name"
          placeholder="Enter name"
          value={name}
          callback={(e) => {
            handleChange(e, setName);
          }}
        />
        <Input
          label="Email"
          placeholder="Enter email"
          value={email}
          callback={(e) => {
            handleChange(e, setEmail);
          }}
        />
        <Input
          label="Password"
          placeholder="Create password"
          value={password}
          callback={(e) => {
            handleChange(e, setPassword);
          }}
          type="password"
        />
        <Input
          label="Limit"
          placeholder="Create account limit"
          value={limit}
          callback={(e) => {
            handleChange(e, setLimit);
          }}
        />
        <Button label="Submit" />
      </form>
    </div>
  );
}
