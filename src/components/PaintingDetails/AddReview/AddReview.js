import React from "react";
import { useForm } from "../../../hooks/useForm";

export const AddReview = ({
    onReviewSubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        review: ''
    }, onReviewSubmit);

    return (
        <article className="create-review">
            <label>Add new review:</label>
            <form className="form" onSubmit={onSubmit}>
                <textarea name="review" placeholder="Review......" value={values.review} onChange={changeHandler}></textarea>
                <input className="btn submit" type="submit" value="Add Review" />
            </form>
        </article>
    );
};