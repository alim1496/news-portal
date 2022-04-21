import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import ProtectedRoute from "./components/ProtectedRoute";
import AddArticle from "./pages/AddArticle";
import Articles from "./pages/Articles";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Videos from "./pages/Videos";
import Auth from "./utils/auth";

const App = () => {
  return (
      <BrowserRouter>
        {Auth.isUserAuthenticated() && <Navbar />}
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/admin/login" element={ <Login />} />
          <Route path="/admin" exact element={<ProtectedRoute />}>
            <Route path="/admin" exact element={ <Dashboard />} />
          </Route>
          <Route path="/admin/articles" exact element={<ProtectedRoute />}>
            <Route path="/admin/articles" exact element={ <Articles />} />
          </Route>
          <Route path="/admin/add/article" exact element={<ProtectedRoute />}>
            <Route path="/admin/add/article" exact element={ <AddArticle />} />
          </Route>
          <Route path="/admin/categories" exact element={<ProtectedRoute />}>
            <Route path="/admin/categories" exact element={ <Categories />} />
          </Route>
          <Route path="/admin/videos" exact element={<ProtectedRoute />}>
            <Route path="/admin/videos" exact element={ <Videos />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
