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
import Login from "./pages/Login";
import Videos from "./pages/Videos";
import Auth from "./utils/auth";

const App = () => {
  return (
      <BrowserRouter basename="/admin">
        {Auth.isUserAuthenticated() && <Navbar />}
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/" exact element={<ProtectedRoute />}>
            <Route path="/" exact element={ <Dashboard />} />
          </Route>
          <Route path="/" exact element={<ProtectedRoute />}>
            <Route path="/articles" exact element={ <Articles />} />
          </Route>
          <Route path="/" exact element={<ProtectedRoute />}>
            <Route path="/add/article" exact element={ <AddArticle />} />
          </Route>
          <Route path="/" exact element={<ProtectedRoute />}>
            <Route path="/categories" exact element={ <Categories />} />
          </Route>
          <Route path="/" exact element={<ProtectedRoute />}>
            <Route path="/videos" exact element={ <Videos />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
