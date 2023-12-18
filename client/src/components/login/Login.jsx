import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import AuthContext from '../../contexts/authContext';
import { formValidate } from '../../utils/validateFields';

import styles from './Login.module.css';

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const validateHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        const error = formValidate(name, value);
        setErrors(error);
    }

    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        email: '',
        password: '',
    });

    return (
        <>
            <div className={styles.errMsg}>
                {errors.email && (
                    <p>{errors.email}</p>
                )}
            </div>

            <div className={styles.container}>
                <div className={styles.formContainer}>
                    <h2 className={styles.heading}>Login</h2>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={values.email} onBlur={validateHandler} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} value={values.password} required />
                        </Form.Group>

                        <Button variant="info" type="submit" className={styles.btn}>
                            Login
                        </Button>
                    </Form>

                    <p className={styles.field}>Don't have an account? <Link to="/register">Click here</Link></p>

                </div>
            </div>
        </>
    );
}