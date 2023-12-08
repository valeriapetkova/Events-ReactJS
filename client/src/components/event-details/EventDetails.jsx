import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import * as eventService from '../../services/eventService';
import AuthContext from '../../contexts/authContext';

import Participants from '../participants/Participants';
import styles from './EventDetails.module.css';

export default function EventDetails() {
    const navigate = useNavigate();
    const [event, setEvent] = useState([]);
    const { eventId } = useParams();
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        eventService.getOne(eventId)
            .then(setEvent)
            .catch(err => {
                console.log(err);
            });
    }, [eventId]);

    const deleteButtonClickHandler = async () => {
        const confirmation = confirm(`Are you sure you want to delete ${event.title}?`);

        if(confirmation) {
            try {
                await eventService.remove(eventId);
    
                navigate('/events');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className={styles.container}>
                <Card className={styles.cardContainer}>
                    <Card.Header as="h5">{event.title}</Card.Header>
                    <Card.Body>
                        <Card.Title>Category: {event.category}</Card.Title>
                        <Card.Text>Date: {event.eventDate}</Card.Text>
                        <Card.Text>Time: {event.eventTime}</Card.Text>
                        <Card.Text>Description: {event.description}</Card.Text>
                        
                        <Participants {...event}/>

                        {userId === event._ownerId && ( 
                            <div className={styles.btns}>
                                <Button as={Link} to={`/events/${eventId}/edit`} variant="info" className={styles.dBtn}>Edit</Button>
                                <Button variant="info" onClick={deleteButtonClickHandler} className={styles.dBtn}>Delete</Button>
                            </div>
                        )}

                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
