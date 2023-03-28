import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams,Link } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext";
import { paintingReducer } from "../../reducers/paintingReducer";
import { paintingServiceFactory } from "../../services/paintingService";
import * as reviewService from "../../services/reviewService";
import { AddReview } from "./AddReview/AddReview";
import {useService} from "../../hooks/useService";

export const PaintingDetails = () => {
    const { paintingId } = useParams;
    const { userId, isAuthenticated, userEmail } = useAuthContext;
    const [painting, dispatch] = useReducer(paintingReducer, {});
    const paintingService = useService(paintingServiceFactory);
    const navigate = useNavigate();

     console.log("im in painting details");
     console.log(painting.size);

    useEffect(() => {
        Promise.all([
            paintingService.getOne(paintingId),
            reviewService.getAll(paintingId),
        ]).then(([paintingData, reviews]) => {
            const paintingState = {
                ...paintingData,
                reviews,
            };

            dispatch({ type: 'PAINTING_FETCH', payload: paintingState })
        });
    }, [paintingId]);

    const onReviewSubmit = async (values) => {
        const response = await paintingService.create(paintingId, values.review);

        dispatch({
            type: 'REVIEW_ADD',
            payload: response,
            userEmail,
        });
    };

    const isOwner = painting._ownerId === userId;

    const onDeleteClick = async () => {
        await paintingService.delete(painting._id);

        // TODO: delete from state

        navigate('/paintings');
    };

    return (
        
        <section id="painting-details">
            <h1>Painting Details</h1>
            <div className="info-section">

                <div className="painting-header">
                    <img className="painting-img" src={painting.imageUrl} alt="random" />
                    <h1>{painting.title}</h1>
                    <span className="size">Size: {painting.size}</span>
                    <p className="type">{painting.price}</p>
                </div>

                <p className="text">{painting.summary}</p>

                <div className="details-reviews">
                    <h2>Reviews:</h2>
                    <ul>
                        {painting.reviews && painting.reviews.map(x => (
                            <li key={x._id} className="reviews">
                                <p>{x.author.email}: {x.review}</p>
                            </li>
                        ))}
                    </ul>



                    {!painting.reviews &&  (
                        <p className="no-review">No reviews.</p>
                    )}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/paintings/${painting._id}/edit`} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )}
            </div>

            {isAuthenticated && <AddReview onReviewSubmit={onReviewSubmit} />}
        </section>
    );
};