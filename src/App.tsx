import classes from "./App.module.css";
import Header from "./components/layoutArea/header/Header";
import Footer from "./components/layoutArea/footer/Footer";
import Login from "./components/layoutArea/main/login/Login";
import TodaysQuote from "./components/layoutArea/main/todaysQuote/TodaysQuote";
import FavoriteQuotes from "./components/layoutArea/main/favoriteQuotes/FavoriteQuotes";
import Page404 from "./components/layoutArea/main/page404/Page404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/layoutArea/main/signUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <header>
          <Header />
          <div id="googleSignInDiv"></div>
        </header>
        <main className={classes.Main}>
          <Routes>
            <Route path="/" element={<TodaysQuote />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/today" element={<TodaysQuote />} />
            <Route path="/favorite-quotes" element={<FavoriteQuotes />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        <footer className={classes.Footer}>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
