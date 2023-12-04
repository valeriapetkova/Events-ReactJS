import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';

import styles from './Login.module.css';

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        email: '',
        password: '',
    });

    return (
        <div className="container">
            <h2 className={styles.heading}>Login</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={values.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} value={values.password} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className="field">
                <span>If you don't have profile click <Link to="/register">here</Link></span>
            </p>
        </div>
    );
}