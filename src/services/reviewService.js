import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/reviews';
const request = requestFactory();

export const getAll = async (paintingId) => {
    const searchQuery = encodeURIComponent(`paintingId="${paintingId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const reviews = Object.values(result);

    return reviews;
};

export const create = async (paintingId, review) => {
    const result = await request.post(baseUrl, { paintingId, review });

    return result;
};