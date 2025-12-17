import { BrowserRouter, Routes, Route } from "react-router-dom";
import Giving from "./pages/Giving";
import GivingNew from "./pages/GivingNew";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GivingNew />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
