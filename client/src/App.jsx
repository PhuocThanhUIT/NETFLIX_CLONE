import Home from './pages/home/Home';
import "./app.scss"
import Watch from './pages/watch/Watch';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
const App = () => {
  const user = true;
  return (
    <BrowserRouter>
    <Routes>
      {user && (
        <>
        <Route path="/movies" element={<Home type="movies" />}/>
      
        <Route path="/series" element={<Home type="series" />}/>
  
        <Route path="/watch" element={<Watch />}/>
        </>
      )}
      <Route path="/"  element={user? <Home />:<Register/>}/>
    
      <Route path="/register" element={!user?<Register />:<Home/>}/>

      <Route path="/login" element={!user?<Login />:<Home/>}/>
      
    </Routes>
  </BrowserRouter>
  );
};

export default App;