import { useState, useEffect, useContext } from 'react';

import * as eventService from '../../services/eventService';
import AuthContext from '../../contexts/authContext';

import EventListItem from '../event-list/event-list-item/EventListItem';
import styles from './Profile.module.css';

export default function Profile() {
    const [myEvents, setMyEvents] = useState([]);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        eventService.getMyEvents(userId)
            .then(result => setMyEvents(result))
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <h3 className={styles.prHeader}>My Events</h3>
            <div className={styles.prContainer}>

                {myEvents.map(event => (
                    <EventListItem key={event._id} {...event} />
                ))}

                {myEvents.length === 0 && (
                    <h3 className={styles.noEvents}>You have no events yet.</h3>
                )}

            </div>
        </>
    );
}