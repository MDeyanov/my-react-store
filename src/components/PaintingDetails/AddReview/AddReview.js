import React from "react";
import { Form, Button } from 'react-bootstrap';

import { useForm } from "../../../hooks/useForm";

export const AddReview = ({
    onReviewSubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        review: ''
    }, onReviewSubmit);

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicReview">
                <Form.Label>Add new review:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="review"
                    placeholder="Enter review"
                    value={values.review}
                    onChange={changeHandler}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Review
            </Button>
        </Form>
    );
};