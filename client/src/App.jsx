import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
          {user ? <Home /> : <Navigate to="/register" />}>
        </Route>
        <Route path="/register" element=
          {!user ? <Register /> : <Navigate to="/" />}>
        </Route>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
        {user && (
          <>
            <Route path="/movies" element={
              <Home type="movie" />}>
            </Route>
            <Route path="/series" element={
              <Home type="series" />}>
            </Route>
            <Route path="/watch" element={
              <Watch />}>
            </Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;