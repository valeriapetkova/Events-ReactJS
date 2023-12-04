import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';

import styles from './Register.module.css';

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);
    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    return (
        <div className="container">
            <h2 className={styles.heading}>Register</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" name="username" onChange={onChange} value={values.username} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={values.email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} value={values.password} />
                    <Form.Text className="text-muted">
                        Your password must be at least 5 symbols.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Repeat password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat password" name="repeatPassword" onChange={onChange} value={values.repeatPassword} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p className="field">
                <span>If you already have profile click <Link to="/login">here</Link></span>
            </p>
        </div>
    );
}