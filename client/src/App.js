import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import AddArticle from "./pages/AddArticle";
import Articles from "./pages/Articles";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Dashboard />} />
        <Route path="/articles" element={ <Articles />} />
        <Route path="/add/article" element={ <AddArticle />} />
        <Route path="/categories" element={ <Categories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
