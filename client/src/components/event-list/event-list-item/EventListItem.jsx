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
    imageUrl,
}) {
    return (
        <Card style={{ width: '18rem' }} className={styles.eventListItem}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{eventDate}</Card.Text>
                <Card.Text>{eventTime}</Card.Text>
                <Card.Text>{category}</Card.Text>
                <Button as={Link} to={`/events/${_id}`} variant="primary">Details</Button>
            </Card.Body>
        </Card>
    );
}