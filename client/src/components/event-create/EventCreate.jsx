import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import useForm from '../../hooks/useForm';
import * as eventService from '../../services/eventService';
import { formValidate } from '../../utils/validateFields';

import styles from './EventCreate.module.css';

export default function EventCreate() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validateHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        const error = formValidate(name, value);
        setErrors(error);
    }

    const createEventSubmitHandler = async (values) => {
        try {
            await eventService.create(values);

            navigate('/events');
        } catch (error) {
            console.log(error);
        }
    }

    const { values, onChange, onSubmit } = useForm(createEventSubmitHandler, {
        title: '',
        eventDate: '',
        eventTime: '',
        category: 'Back-End Development',
        description: '',
    });


    return (
        <>
            <div className={styles.errMsg}>
                {errors.title && (
                    <p>{errors.title}</p>
                )}
                {errors.description && (
                    <p>{errors.description}</p>
                )}
            </div>

            <div className={styles.crContainer}>
                <div className={styles.formCrContainer}>
                    <h2 className={styles.crHeading}>Create event</h2>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter event title" name="title" onChange={onChange} value={values.title} onBlur={validateHandler} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Date" name="eventDate" onChange={onChange} value={values.eventDate} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="time" placeholder="Time" name="eventTime" onChange={onChange} value={values.eventTime} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" placeholder="Choose category" name="category" onChange={onChange} value={values.category} >
                                <option value="Back-End Development">Back-End Development</option>
                                <option value="Front-End Development">Front-End Development</option>
                                <option value="Quality Assurance">Quality Assurance</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Business Intelligence">Business Intelligence</option>
                                <option value="Infrastructure">Infrastructure</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" onChange={onChange} value={values.description} onBlur={validateHandler} required />
                        </Form.Group>

                        <Button variant="info" type="submit" className={styles.crBtn}>Create</Button>
                    </Form>
                </div>
            </div>
        </>
    );
}