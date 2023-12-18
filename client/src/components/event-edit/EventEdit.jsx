import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as eventService from '../../services/eventService';
import { formValidate } from '../../utils/validateFields';

import styles from './EventEdit.module.css';

export default function EventEdit() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [errors, setErrors] = useState({});
    const [event, setEvent] = useState({
        title: '',
        eventDate: '',
        eventTime: '',
        category: '',
        description: '',
    });

    const validateHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        const error = formValidate(name, value);
        setErrors(error);
    }

    useEffect(() => {
        eventService.getOne(eventId)
            .then(result => {
                setEvent(result);
            })
            .catch(err => {
                console.log(err);
            });
    }, [eventId]);

    const editEventSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await eventService.edit(eventId, values);

            navigate('/events');
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (e) => {
        setEvent(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

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

            <div className={styles.edContainer}>
                <div className={styles.formEdContainer}>
                    <h2 className={styles.edHeading}>Edit event</h2>
                    <Form onSubmit={editEventSubmitHandler}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter event title" name="title" onChange={onChange} value={event.title} onBlur={validateHandler} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" placeholder="12.11.2023" name="eventDate" onChange={onChange} value={event.eventDate} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="text" placeholder="10:30" name="eventTime" onChange={onChange} value={event.eventTime} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" placeholder="Choose category" name="category" onChange={onChange} value={event.category} >
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
                            <Form.Control as="textarea" rows={3} name="description" onChange={onChange} value={event.description} onBlur={validateHandler} required />
                        </Form.Group>

                        <Button variant="info" type="submit" className={styles.edBtn}>Edit</Button>
                    </Form>
                </div>
            </div>
        </>
    );
}