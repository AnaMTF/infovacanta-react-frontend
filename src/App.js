import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { MyNavbar as Navbar } from "./components/NewNavbar";
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
import { ScrollToTopButton } from "./components/ScrollToTopButton";

import { StatiuniOutlet } from "./pages/StatiuniOutlet";
import { NotFound } from "./pages/404";

import { Provider, useSelector } from 'react-redux';
import { store } from "./app/store";

import { Provider as LyketProvider } from '@lyket/react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContactPage } from "./pages/ContactPage";

import { ProfileOtherUser } from "./pages/ProfileOtherUser";
import { ProfilOutlet } from "./pages/ProfilOutlet";

import { Settings as SettingsPage } from "./pages/Settings";

// import { WebchatProvider, useClient } from '@botpress/webchat';

import "@fortawesome/fontawesome-free/css/all.css";
import "./css/savebuttons.css";
import { EditReview } from "./pages/EditReview";
import { SavedReviews } from "./pages/SavedReviews";

import { GoogleAuthCallback } from "./components/GoogleAuthCallback";

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

  const user = useSelector((state) => state.user.user);

  // const botpressClient = useClient({
  //   clientId: '75424437-4b00-4535-8cf2-b56dbabe0397',
  // });

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        {/* <Provider store={store}> */}
        <LyketProvider apiKey="pt_49ef1b9862ddcdc97d841106b33e79">
          <Router>
            <Navbar />
            <Routes>
              <Route index element={user ? <Navigate to="/main" /> : <Home />} />
              <Route path="/login" element={user ? <Navigate to="/main" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/main" /> : <Register />} />
              <Route path="/auth/callback" element={<GoogleAuthCallback />} />

              <Route path="/new" element={<NewReview />} />
              <Route path="/edit/:reviewId" element={<EditReview />} />

              <Route path="/main" element={user ? <Main /> : <Navigate to="/" />} />
              {/* pagina principala cu statiuni (cate un card pentru fiecare statiune) */}
              <Route path="/statiuni" element={user ? <StatiuniOutlet /> : <Navigate to="/" />}>
                {/* pagina cu detalii despre o statiune */}
                <Route index element={user ? <Statiuni list={lista_statiuni} /> : <Navigate to="/" />} />
                <Route path=":nume" element={user ? <Statiune /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* pagina cu profilul utilizatorului */}
              <Route path="/profil" element={<ProfilOutlet />}>
                <Route path="" element={user ? <Profile /> : <Navigate to="/" />} />
                <Route path=":userId" element={user ? <ProfileOtherUser /> : <Navigate to="/" />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* pagina cu rezultatele cautarii */}
              <Route path="/cautare/:keyword" element={user ? <Rezultate /> : <Navigate to="/" />} />

              <Route path="/contact" element={<ContactPage />} />
              <Route path="/setari" element={user ? <SettingsPage /> : <Navigate to="/" />} />

              <Route path="/saved" element={user ? <SavedReviews /> : <Navigate to="/" />} />
            </Routes>
          </Router>
          <Footer />
        </LyketProvider>
        {/* </Provider> */}
      </QueryClientProvider>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
