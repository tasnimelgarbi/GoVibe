import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollTop";
import Navbar from './header/Navbar';
import Home from './home/Home';
import Book from './booking/Book';
import Detailes from './home/Detailes';

function App() {
  return (
    <>
  <Router>
     <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/details" element={<Detailes />} />
      </Routes>
  </Router>
    </>
  );
}

export default App;


