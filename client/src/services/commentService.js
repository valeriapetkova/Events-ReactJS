import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/comments';

export const getAll = async (eventId) => {
    const query = new URLSearchParams({
        where: `eventId="${eventId}"`,
        load: `owner=_ownerId:users`,
    });

    const result = await request.get(`${baseUrl}?${query}`);

    return result;
};

export const create = async (eventId, comment, email) => {
    const newComment = await request.post(baseUrl, {eventId, comment, email});

    return newComment;
};

export const remove = async (commentId) => await request.remove(`${baseUrl}/${commentId}`);