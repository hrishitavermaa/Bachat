import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { signin } from "../api/user";
import { useNavigate } from "react-router-dom";
import { successToast } from "../utils/toast";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    callback: Dispatch<SetStateAction<string>>
  ) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signed = await signin(email, password);

    if (signed) {
      successToast("Signed up successfully");

      navigate("/");

      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full grid place-content-center items-center">
      <form className="grid gap-y-7" onSubmit={handleSubmit}>
        <div className="grid gap-y-3">
          <h1 className="text-5xl font-bold">
            Sign<span className="text-accent">In</span>
          </h1>
          <p className="text-md text-gray-400 font-medium">
            Sign in to the application.
          </p>
        </div>
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
        <Button label="Submit" />
      </form>
    </div>
  );
}
