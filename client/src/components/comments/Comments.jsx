import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import useForm from '../../hooks/useForm';
import * as commentService from '../../services/commentService';
import AuthContext from '../../contexts/authContext';
import { formValidate } from '../../utils/validateFields';

import styles from './Comments.module.css';

export default function Comments() {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [comments, setComments] = useState([]);
    const [errors, setErrors] = useState({});

    const { userId, email } = useContext(AuthContext);

    useEffect(() => {
        commentService.getAll(eventId)
            .then(result => setComments(result))
            .catch(err => {
                console.log(err);
            });
    }, [eventId]);

    const validateHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        const error = formValidate(name, value);

        setErrors(error);
    }

    const createCommentSubmitHandler = async (values) => {
        try {
            const newComment = await commentService.create(eventId, values.comment, email);

            setComments(state => [...state, newComment]);

            values.comment = '';

            navigate(`/events/${eventId}`);
        } catch (error) {
            console.log(error);
        }
    }

    const { values, onChange, onSubmit } = useForm(createCommentSubmitHandler, {
        comment: '',
    });

    const deleteCommentClickHandler = async (commentId) => {
        const confirmation = confirm('Are you sure you want to delete this comment?');

        if (confirmation) {
            try {
                await commentService.remove(commentId);

                setComments(state => state.filter(x => x._id !== commentId));

                navigate(`/events/${eventId}`);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h2 className={styles.cmHeader}>Comments</h2>
            <div className={styles.cmContainer}>
                <div className={styles.cmCards} >
                    {comments.map(c => (
                        <div key={c._id} className={styles.cmF} >
                            <p>{c.email}: {c.comment}</p>
                            {userId === c._ownerId && (
                                <div className={styles.btn}>
                                    <Button variant="light" onClick={() => deleteCommentClickHandler(c._id)} className={styles.dCmBtn}>X</Button>
                                </div>
                            )}
                        </div>

                    ))}
                </div>

                {comments.length === 0 && (
                    <p className={styles.noComments}>No comments yet.</p>
                )}
            </div>

            <div className={styles.errMsg}>
                {errors.comment && (
                    <p>{errors.comment}</p>
                )}
            </div>

            <div className={styles.cmMsg}>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Add new comment</Form.Label>
                        <Form.Control as="textarea" rows={2} name="comment" onChange={onChange} value={values.comment} onBlur={validateHandler} />
                    </Form.Group>

                    <Button variant="info" type="submit">Add</Button>
                </Form>
            </div>
        </>
    );
}