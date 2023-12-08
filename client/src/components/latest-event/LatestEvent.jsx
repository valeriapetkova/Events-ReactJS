import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import styles from './LatestEvent.module.css';

export default function LatestEvent({
    _id,
    title,
    eventDate,
    eventTime,
    category,
}) {
    return (
        <Card style={{ width: '15rem', height: '300px'}} className={styles.latestEvents}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Date: {eventDate}</Card.Text>
                <Card.Text>Time: {eventTime}</Card.Text>
                <Card.Text>Category: {category}</Card.Text>
                <Button as={Link} to={`/events/${_id}`} variant="info">Details</Button>
            </Card.Body>
        </Card>
    );
}