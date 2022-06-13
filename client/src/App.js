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
import UserVerify from "./components/UserVerify";
import AddArticle from "./pages/AddArticle";
import Articles from "./pages/Articles";
import Categories from "./pages/Categories";
import CategoryArticles from "./pages/CategoryArticles";
import Dashboard from "./pages/Dashboard";
import DivisionArticles from "./pages/DivisionArticles";
import Home from "./pages/Home";
import HomeVideos from "./pages/HomeVideos";
import Login from "./pages/Login";
import SingleArticle from "./pages/SingleArticle";
import SingleDivision from "./pages/SingleDivion";
import Users from "./pages/Users";
import Videos from "./pages/Videos";
import Auth from "./utils/auth";

export const UserContext = createContext();

const App = () => {
  const [open, setOpen] = useState(false);
  const [verify, setVerify] = useState(false);

  const updateModal = (v) => {
    setOpen(v);
  }

  const updateVerify = (v) => {
    setVerify(v);
  }

  return (
    <UserContext.Provider value={{ open, updateModal, verify, updateVerify }}>
      <BrowserRouter>
        {Auth.isUserAuthenticated() && <Navbar />}
        {!Auth.isUserAuthenticated() && <MenuBar />}
        <UserLogin />
        <UserVerify />
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/latest" element={ <CategoryArticles /> } />
          <Route path="/videos" element={ <HomeVideos /> } />
          <Route path="/divisions" element={ <DivisionArticles /> } />
          <Route path="/division/:divID/:divName" element={ <SingleDivision /> } />
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
          <Route path="/admin/add/article/:slug" exact element={<ProtectedRoute />}>
            <Route path="/admin/add/article/:slug" exact element={ <AddArticle />} />
          </Route>
          <Route path="/admin/categories" exact element={<ProtectedRoute />}>
            <Route path="/admin/categories" exact element={ <Categories />} />
          </Route>
          <Route path="/admin/videos" exact element={<ProtectedRoute />}>
            <Route path="/admin/videos" exact element={ <Videos />} />
          </Route>
          <Route path="/admin/users" exact element={<ProtectedRoute />}>
            <Route path="/admin/users" exact element={ <Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>  
  );
}

export default App;
