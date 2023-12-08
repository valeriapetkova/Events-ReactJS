import { useState, useEffect } from 'react';

import * as eventService from '../../services/eventService';
import EventListItem from './event-list-item/EventListItem';

import styles from './EventList.module.css';

export default function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventService.getAll()
            .then(result => setEvents(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className="list-container">
            <h2 className={styles.listHeading}>All IT events in one place!</h2>

            <div className={styles.eventList}>
                {events.map(event => (
                    <EventListItem key={event._id} {...event} />
                ))}

                {events.length === 0 && (
                    <h3 className={styles.noArticles}>No events yet</h3>
                )}
            </div>

        </div>
    );
}