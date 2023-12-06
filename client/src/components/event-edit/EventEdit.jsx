import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as eventService from '../../services/eventService';

import styles from './EventEdit.module.css';

export default function EventEdit() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [ event, setEvent ] = useState({
        title: '',
        eventDate: '',
        eventTime: '',
        category: '',
        imageUrl: '',
        description: '',
    });

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
        <div className="container">
                <h2 className={styles.heading}>Edit event</h2>
                <Form onSubmit={editEventSubmitHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter event title" name="title" onChange={onChange} value={event.title} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" placeholder="Date" name="eventDate" onChange={onChange} value={event.eventDate} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="text" placeholder="Time" name="eventTime" onChange={onChange} value={event.eventTime} />
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

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="Add image url" name="imageUrl" onChange={onChange} value={event.imageUrl} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" onChange={onChange} value={event.description} />
                    </Form.Group>

                    <Button variant="info" type="submit">Edit</Button>
                </Form>
            </div>
    );
}