import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/authContext';

import Header from './components/header/Header';
import Home from './components/home/Home';
import EventList from './components/event-list/EventList';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import EventCreate from './components/event-create/EventCreate';
import EventDetails from './components/event-details/EventDetails';
import NotFound from './components/not-found/NotFound';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/create" element={<EventCreate />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
