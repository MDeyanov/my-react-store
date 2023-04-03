import React, { useEffect, useReducer, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { paintingReducer } from '../../reducers/paintingReducer';
import { paintingServiceFactory } from '../../services/paintingService';
import * as reviewService from '../../services/reviewService';
import { AddReview } from './AddReview/AddReview';
import { useService } from '../../hooks/useService';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { usePaintingContext } from '../../contexts/PaintingContext';

export const PaintingDetails = () => {
    const { paintingId } = useParams();
    const { userId, isAuthenticated, userEmail } = useAuthContext();
    const { deletePainting } = usePaintingContext();
    const paintingService = useService(paintingServiceFactory);
    const [painting, dispatch] = useReducer(paintingReducer, {});
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            paintingService.getOne(paintingId),
            reviewService.getAll(paintingId)
        ]).then(([paintingData, reviewsData]) => {
            const paintingState = { ...paintingData, reviews: reviewsData };
            dispatch({ type: 'PAINTING_FETCH', payload: paintingState });
            setReviews(reviewsData);
        });
    }, [paintingId]);

    const onReviewSubmit = async (values) => {
        const response = await reviewService.create(paintingId, values.review);

        const newReview = {
            _id: response._id,
            author: { email: userEmail },
            review: response.review
        };

        setReviews([...reviews, newReview]);
    };

    const isOwner = painting._ownerId === userId;

    const onDeleteClick = async () => {

        const result = window.confirm(`Are you sure you want to delete ${painting.title}`);
        if (result) {
            await paintingService.delete(painting._id);
            /* dispatch({ type: 'PAINTING_DELETE', payload: painting._id }); */
            deletePainting(painting._id);
            navigate('/paintings');
        }
    };

    return (
        <Container id='painting-details' className="border border-secondary rounded p-4">
            <h1>Painting Details</h1>
            <Row>
                <Col sm={12} md={6} lg={4}>
                    <Image src={painting.imageUrl} alt={painting.title} fluid />
                </Col>
                <Col sm={12} md={6} lg={8}>
                    <h1>{painting.title}</h1>
                    <p className='mb-0'>Size: {painting.size}</p>
                    <p className='mb-4'>Price: {painting.price}</p>
                    <p>{painting.summary}</p>
                    {isOwner && (
                        <div className='mb-4'>
                            <Link to={`/paintings/${painting._id}/edit`} className='mr-2'>
                                <Button>Edit</Button>
                            </Link>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <Button variant='danger' onClick={onDeleteClick}>
                                Delete
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className='mt-4'>Reviews:</h5>
                    <ul className='list-unstyled'>
                        {reviews &&
                            reviews.map((review) => (
                                <li key={review._id} className='border border-secondary rounded p-3 mb-3'>
                                    <p className='mb-0'>
                                        <span className="font-weight-bold fs-5 text-primary">{review.author.email}:</span>
                                        &nbsp;
                                        <span className="ml-2">{review.review}</span>
                                    </p>
                                </li>
                            ))}
                    </ul>
                    {!reviews && <p className='no-review'>No reviews.</p>}
                </Col>
            </Row>
            {isAuthenticated && <AddReview onReviewSubmit={onReviewSubmit} />}

        </Container >
    );
};
