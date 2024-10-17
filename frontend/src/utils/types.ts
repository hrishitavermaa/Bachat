import { ChangeEventHandler, MouseEventHandler } from "react";
import { IconType } from "react-icons";

export type InputProps = {
  label?: string;
  placeholder: string;
  value: string;
  callback: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  className?: string;
};

export type ButtonProps = {
  label: string | IconType;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type TransactionsType = {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: string;
  category: string;
  date: Date;
};

export type TripType = {
  id: string;
  destination: string;
  from: Date;
  to: Date;
  amount: number;
  monthly: number;
  months: number;
};
