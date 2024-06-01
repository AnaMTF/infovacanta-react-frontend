import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { InfoVacantaNavbar as Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Statiuni } from "./pages/Statiuni";

import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import "./css/styles.css";
import "./css/header.css";

function App() {
  const client = new QueryClient({
     defaultOptions: {
       queries: {
         refetchOnWindowFocus: false,
       },
     },
  });

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/statiuni" element={<Statiuni />} />
          </Routes>
        </Router>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
