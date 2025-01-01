import './App.css';
import Navbar from './components/Navbar';

import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Account from './pages/Account';
import ChangePassword from './pages/ChangePassword'; // Import the ChangePassword component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/account' element={<Account />} />
        <Route path='/change-password' element={<ChangePassword />} /> {/* Add ChangePassword route */}
      </Routes>
    </>
  );
}

export default App;
