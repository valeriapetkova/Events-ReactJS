import * as request from "../lib/request";

const baseUrl = 'http://localhost:3030/data/participants';

export const getJoinedParticipant = async (eventId, userId) => {
    const query = `where=${encodeURIComponent(`eventId="${eventId}"`)}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`;
    const result = await request.get(`${baseUrl}?${query}`);

    return result;
};

export const getAll = async (eventId) => {
    const query = new URLSearchParams({
        where: `eventId="${eventId}"`,
        load: `owner=_ownerId:users`,
    });

    const result = await request.get(`${baseUrl}?${query}`);

    return result;
};

export const create = async (eventId, email) => {
    const newParticipant = await request.post(baseUrl, { eventId, email });

    return newParticipant;
};
