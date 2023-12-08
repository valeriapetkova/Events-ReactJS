import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../../contexts/authContext';

import styles from './Header.module.css';

export default function Header() {
  const { isAuthenticated, username } = useContext(AuthContext);
    return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">EventS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/events">All events</Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/events/create">Create event</Nav.Link>
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                <span className={styles.txt}>Welcome, {username}</span>
              </>
            )
              : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
              )
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}