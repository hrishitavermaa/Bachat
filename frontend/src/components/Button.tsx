import { createElement } from "react";
import { ButtonProps } from "../utils/types";

export default function Button(props: ButtonProps) {
  const { label } = props;

  return (
    <button className={"p-5 w-[30rem] bg-accent rounded-md font-bold flex items-center justify-center gap-2 "+props.className} onClick={props.onClick}>
      {typeof label === "string"
        ? label
        : createElement(
            label
          )
      }
    </button>
  );
}
