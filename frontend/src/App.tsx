import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Transaction from "./pages/Transaction";
import Signin from "./pages/Signin";
import { RecoilRoot } from "recoil";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Portfolio from "./pages/Portfolio";
import Trip from "./pages/Trip";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="m-[3rem] ml-[18.67rem]">
        <RecoilRoot>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/trips" element={<Trip />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </RecoilRoot>
      </div>
    </BrowserRouter>
  );
}

export default App;
