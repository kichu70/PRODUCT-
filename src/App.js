
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import ViewProduct from './Pages/ViewProduct';
import Login from './Components/Login/Login';
import { useAuth } from './auth/Authcontext';
import Addproduct from './Components/Addproduct/Addproduct';


function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>

{/* <Addproduct/> */}


        {user?(
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/viewProduct/:id' element={<ViewProduct/>}/>
      </Routes>
        ):(
          <Login/>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
