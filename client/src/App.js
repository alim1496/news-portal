import { createContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import MenuBar from "./components/MenuBar";
import Navbar from './components/Navbar';
import ProtectedRoute from "./components/ProtectedRoute";
import UserLogin from "./components/UserLogin";
import AddArticle from "./pages/AddArticle";
import Articles from "./pages/Articles";
import Categories from "./pages/Categories";
import CategoryArticles from "./pages/CategoryArticles";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import HomeVideos from "./pages/HomeVideos";
import Login from "./pages/Login";
import SingleArticle from "./pages/SingleArticle";
import Videos from "./pages/Videos";
import Auth from "./utils/auth";

export const UserContext = createContext();

const App = () => {
  const [open, setOpen] = useState(false);

  const updateModal = (v) => {
    setOpen(v);
  }

  return (
    <UserContext.Provider value={{ open, updateModal }}>
      <BrowserRouter>
        {Auth.isUserAuthenticated() && <Navbar />}
        {!Auth.isUserAuthenticated() && <MenuBar />}
        <UserLogin />
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/latest" element={ <CategoryArticles /> } />
          <Route path="/videos" element={ <HomeVideos /> } />
          <Route path="/category/:catID/:catName" element={ <CategoryArticles /> } />
          <Route path="/article/:articleID/:articleTitle" element={ <SingleArticle /> } />
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
    </UserContext.Provider>  
  );
}

export default App;
