import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as participantService from '../../services/participantService';
import AuthContext from '../../contexts/authContext';

import styles from './Participants.module.css';

export default function Participants({
    _ownerId
}) {
    const [participants, setParticipants] = useState([]);
    const [joined, setJoin] = useState(false);
    const { eventId } = useParams();
    const { email, userId, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        participantService.getAll(eventId)
            .then(setParticipants)
            .catch(err => {
                console.log(err);
            });
    }, [eventId]);

    useEffect(() => {
        participantService.getJoinedParticipant(eventId, userId)
            .then(result => {
                if (result === 1) {
                    setJoin(true);
                } else {
                    setJoin(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [eventId, userId]);

    const joinEventHandler = async (e) => {
        e.preventDefault();

        try {
            const newParticipant = await participantService.create(eventId, email);

            setParticipants(state => [...state, newParticipant]);

            setJoin(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div id="participants">Participants:
                <span id="participants-count">
                    {participants.length}
                </span>
            </div>

            {(isAuthenticated && userId !== _ownerId) && (
                <div>
                    {!joined ? (
                        <div className={styles.jBtn}>
                            <Button variant="primary" onClick={joinEventHandler}>Join event</Button>
                        </div>
                    )
                        :
                        (
                            <p className={styles.txtField}>You joined the event! You will receive an email with more information about the event.</p>
                        )}
                </div>
            )}

            {(isAuthenticated && userId === _ownerId) && (
                <>
                    <div className={styles.participantsField}>Participant emails:
                        <span id="participants-emails">
                            {participants.map(participant => (
                                <p key={participant._id}>{participant.email}</p>
                            ))}

                            {participants.length === 0 && (
                                <p className={styles.noArticles}>No participants yet</p>
                            )}

                        </span>
                    </div>
                </>
            )}
        </>
    );
}