
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ViewProduct from './Pages/ViewProduct';
import Login from './Components/Login/Login';
import { useAuth } from './auth/Authcontext';
import SignUp from './Components/SignUp/SignUp';


function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={user ? <Navigate to='/'/>:<Login/>}/>
        <Route path='/signup' element={ <SignUp /> }/>
        <Route path='/'  element={user ? <Home /> : <Navigate to="/login" />}/>
        <Route path='/viewProduct/:id'element={user ? <ViewProduct /> : <Navigate to="/login" />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
