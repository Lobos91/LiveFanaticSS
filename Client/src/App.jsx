import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./GlobalContext";
import Welcome from "./components/Welcome";
import Header from "./components/Header";
import Signup from "./components/Signup";
import { ConcertLatest } from "./components/ConcertLatest";
import { SearchPage } from "./components/SearchPage";
import Explore from "./components/Explore";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <br />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/concerts" element={<ConcertLatest />} />
            <Route path="/searchpage" element={<SearchPage />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
