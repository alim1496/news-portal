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
import Videos from "./pages/Videos";

const App = () => {
  return (
    <BrowserRouter basename="/admin">
      <Navbar />
      <Routes>
        <Route path="/" element={ <Dashboard />} />
        <Route path="/articles" element={ <Articles />} />
        <Route path="/add/article" element={ <AddArticle />} />
        <Route path="/categories" element={ <Categories />} />
        <Route path="/videos" element={ <Videos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
