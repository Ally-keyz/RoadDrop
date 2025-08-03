import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Welcome from "./Landing/Welcome";

const root  = document.getElementById("root");

if(!root) throw new Error("Route is not defined");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Welcome />} />
    </Routes>
  </BrowserRouter>,
);
