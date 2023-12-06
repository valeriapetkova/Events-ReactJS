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
import EventEdit from './components/event-edit/EventEdit';
import NotFound from './components/not-found/NotFound';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<GuestGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AuthGuard />}>
            <Route path="/events/create" element={<EventCreate />} />
            <Route path="/events/:eventId/edit" element={<EventEdit />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
