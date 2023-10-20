import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="home" element={<Home />} />
          <Route path="movie/:movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
