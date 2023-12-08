import { useEffect, useState } from "react";

import * as eventService from '../../services/eventService';
import LatestEvent from "../latest-event/LatestEvent";

import styles from './Home.module.css';

export default function Home() {
    const [latestEvents, setLatestEvents] = useState([]);

    useEffect(() => {
        eventService.getLatest()
            .then(result => {
                setLatestEvents(result)
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <div id={styles.home}>
            <div className={styles.homePage}>
                <h2 className={styles.homeHeading}>If you want to join your favorite events - you are at the right place!</h2>
                <h2 className={styles.latestHeading}>Latest Events</h2>
            </div>

            <div id={styles.latestEvents}>

                {latestEvents.map(event => <LatestEvent key={event._id} { ...event } />)}

                {latestEvents.length === 0 && <p className={styles.noArticles}>No events yet</p>}


            </div>


        </div>


    );
}