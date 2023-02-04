import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./GlobalContext";
import Welcome from "./components/Welcome";
import Header from "./components/Header";
import Signup from "./components/Signup";
import { ConcertLatest } from "./components/ConcertLatest";
import { SearchPage } from "./components/SearchPage";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/concerts" element={<ConcertLatest />} />
            <Route path="/searchpage" element={<SearchPage />} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
