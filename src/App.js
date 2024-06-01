import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { InfoVacantaNavbar as Navbar } from "./components/Navbar";

import { Home } from "./pages/Home";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Statiuni } from "./pages/Statiuni";
import { Profil } from "./pages/Profil";
// import RegisterTemp from "./pages/RegisterTemp";
// import EditReview from "./pages/EditReviewTemp";

import { Provider } from 'react-redux';

import "./css/header.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/statiuni" element={<Statiuni />} />
          <Route path="/profil" element={<Profil />} />
          {/* <Route path="/main" element={<Main />} />
          <Route path="/register" element={<RegisterTemp />} />
          <Route path="/editreview" element={<EditReview />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
