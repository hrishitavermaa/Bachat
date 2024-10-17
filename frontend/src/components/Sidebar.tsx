import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { LuWallet  } from "react-icons/lu";
import { FaLocationCrosshairs } from "react-icons/fa6";
import logo from "../assets/Bachat.png";

export default function Sidebar() {



  return (
    <div className="fixed bg-dark h-full p-0 m=0 w-[16rem] mt-[-3rem] text-xl text-gray-400">
      <div className="w-full flex justify-center items-center mt-[5rem]">
        <img src={logo} />
      </div>
      <ul className="mt-[5rem]">
        <Link
          to="/"
          className="flex item-center gap-x-2 py-5 hover:bg-gray-800 w-full p-7"
        >
          <MdOutlineDashboard className="mt-1" />
          <li>Dashboard</li>
        </Link>
        <Link
          to="/transactions"
          className="flex item-center gap-x-2 py-5 hover:bg-gray-800 w-full p-7"
        >
          <GrTransaction className="mt-1" />
          <li>Transactions</li>
        </Link>
        <Link
          to="/portfolio"
          className="flex item-center gap-x-2 py-5 hover:bg-gray-800 w-full p-7"
        >
          <LuWallet className="mt-1" />
          <li>Portfolio</li>
        </Link>
        <Link
          to="/trips"
          className="flex item-center gap-x-2 py-5 hover:bg-gray-800 w-full p-7"
        >
          <FaLocationCrosshairs className="mt-1" />
          <li>Trips</li>
        </Link>
      </ul>
    </div>
  );
}
