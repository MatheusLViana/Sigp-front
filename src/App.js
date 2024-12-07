import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import NewPassword from './pages/NewPassword';
import Register from './pages/Register';
import Services from './pages/Services';
import Ouvidoria from './pages/Ouvidoria';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" exact={true} element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ouvidoria" element={<Ouvidoria />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
