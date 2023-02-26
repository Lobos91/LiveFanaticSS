import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./GlobalContext";
import Welcome from "./components/Welcome";
import Header from "./components/Header";
import Signup from "./components/Signup";
import { SearchPage } from "./components/SearchPage";
import Explore from "./components/Explore";
import { UserPage } from "./components/UserPage";
import { Book } from "./components/Book";
import { Streaming } from "./components/Streaming";

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
            <Route path="/user" element={<UserPage />} />
            <Route path="/concert" element={<Book />} />
            <Route path="/searchpage" element={<SearchPage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/streaming/:id" element={<Streaming />} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
