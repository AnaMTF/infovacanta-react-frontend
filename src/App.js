import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { Statiuni } from "./pages/Statiuni";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/statiuni" element={<Statiuni />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
