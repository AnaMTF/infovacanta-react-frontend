import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { InfoVacantaNavbar as Navbar } from "./components/Navbar";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { Statiuni } from "./pages/Statiuni";
import RegisterTemp from "./pages/RegisterTemp";
import EditReview from "./pages/EditReviewTemp";


import { Provider } from 'react-redux';
//import { store } from './app/store.old';

function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/statiuni" element={<Statiuni />} />
          <Route path="/register" element={<RegisterTemp />} />
          <Route path="/editreview" element={<EditReview />} />
        </Routes>
      </Router>
      {/* </Provider> */}
    </div>
  );
}

export default App;
