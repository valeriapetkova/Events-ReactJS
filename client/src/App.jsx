import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';

import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
