import "./index.css";
import 'react-circular-progressbar/dist/styles.css';
import 'antd/dist/antd.css';

import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Diagnosis from "./pages/Diagnoses";
import Historic from "./pages/Historic";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="home" element={<Diagnosis />} />
          <Route path="history" element={<Historic />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
