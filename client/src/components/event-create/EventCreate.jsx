import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import useForm from '../../hooks/useForm';
import * as eventService from '../../services/eventService';

import styles from './EventCreate.module.css';

export default function EventCreate() {
    const navigate = useNavigate();

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
        imageUrl: '',
        description: '',
    });


    return (
        <>
            <div className="container">
                <h2 className={styles.heading}>Create event</h2>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter event title" name="title" onChange={onChange} value={values.title} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="text" placeholder="Date" name="eventDate" onChange={onChange} value={values.eventDate} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Time</Form.Label>
                        <Form.Control type="text" placeholder="Time" name="eventTime" onChange={onChange} value={values.eventTime} />
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

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="Add image url" name="imageUrl" onChange={onChange} value={values.imageUrl} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" onChange={onChange} value={values.description} />
                    </Form.Group>

                    <Button variant="info" type="submit">Create</Button>
                </Form>
            </div>

        </>
    );
}