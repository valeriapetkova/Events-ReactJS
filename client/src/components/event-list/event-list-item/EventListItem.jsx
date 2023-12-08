import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import styles from './EventListItem.module.css';

export default function EventListItem({
    _id,
    title,
    eventDate,
    eventTime,
    category,
}) {
    return (
        <div className={styles.cardBorder}>
            <Card style={{ width: '18rem' }} className={styles.eventListItem}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>Date: {eventDate}</Card.Text>
                    <Card.Text>Time: {eventTime}</Card.Text>
                    <Card.Text>Categoty: {category}</Card.Text>
                    <Button as={Link} to={`/events/${_id}`} variant="info">Details</Button>
                </Card.Body>
            </Card>
        </div>
    );
}