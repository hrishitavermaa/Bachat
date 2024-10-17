import { InputProps } from "../utils/types";

export default function Input(props: InputProps) {
  return (
    <div className="grid gap-y-3">
      {props.label && <label className="font-semibold">{props.label}</label>}
      <input
        className={
          "bg-dark px-7 py-5 w-[30rem] border-none outline-none rounded-md " +
          props.className
        }
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.callback}
        type={props.type ? props.type : "text"}
      />
    </div>
  );
}
