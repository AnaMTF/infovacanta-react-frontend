import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { InfoVacantaNavbar as Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Statiuni } from "./pages/Statiuni";
import { NewReview } from "./pages/NewReview";
import { Profile } from "./pages/Profile";
import { Rezultate } from "./pages/Rezultate";
import { Statiune } from "./pages/StatiuneIndividuala";

import { Provider } from 'react-redux';
import { store } from "./app/store";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  // lista cu statiuni; incalca principiul Open/Closed din SOLID!!!!!!!! dar aia e pana la urma
  // am actionat asa pentru a nu face un request catre server pentru a obtine lista statiunilor
  // dar daca vom mai avea de adaugat statiuni trebuie modificat si aici
  const lista_statiuni = [
    "mamaia",
    "constanta",
    "eforie-nord",
    "eforie-sud",
    "costinesti",
    "vama-veche",
    "olimp",
    "neptun",
    "jupiter",
    "venus",
    "saturn",
    "mangalia",
    "2-mai",
    "tuzla",
    "gura-portitei",
    "agigea",
    "vadu",
    "corbu",
    "muntele-mic",
    "straja",
    "sinaia",
    "predeal",
    "poiana-brasov",
    "azuga",
    "paltinis",
    "semenic",
    "balea",
    "vatra-dornei",
    "transalpina",
    "busteni",
    "ranca",
    "superski-cavnic",
    "borsa",
    "bucovina",
    "baile-felix",
    "baile-herculane",
    "baile-tusnad",
    "baile-techirghiol",
    "baile-olanesti"
  ];

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
        <Provider store={store}>
          <Router>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/main" element={<Main />} />
              <Route path="/new" element={<NewReview />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* pagina principala cu statiuni (cate un card pentru fiecare statiune) */}
              <Route path="/statiuni" element={<Statiuni list={lista_statiuni} />}>
                {/* pagina cu detalii despre o statiune */}
                <Route path=":nume" element={<Statiune />} />
              </Route>

              {/* pagina cu profilul utilizatorului */}
              <Route path="/profil" element={<Profile />} />

              {/* pagina cu rezultatele cautarii */}
              <Route path="/cautare/:keyword" element={<Rezultate />} />
            </Routes>
          </Router>
          <Footer />
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
