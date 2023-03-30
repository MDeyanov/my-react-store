import React from 'react';
import { useForm } from "../../hooks/useForm";
import {Form, Button} from 'react-bootstrap';
import { usePaintingContext } from '../../contexts/PaintingContext';


export const CreateProduct = () => {   
    const { onCreatePaintingSubmit } = usePaintingContext();
    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        size: '',
        price: '',
        imageUrl: '',
        summary: '',
    }, onCreatePaintingSubmit);

    return (
        <Form id="create" method="post" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Product Title:</Form.Label>
                <Form.Control value={values.title} onChange={changeHandler} type="text" id="title" name="title" placeholder="Product Title" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Size:</Form.Label>
                <Form.Control value={values.size} onChange={changeHandler} type="text" id="size" name="size" placeholder="Size" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Price:</Form.Label>
                <Form.Control value={values.price} onChange={changeHandler} type="text" id="price" name="price" placeholder="Price" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Image:</Form.Label>
                <Form.Control value={values.imageUrl} onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Summary:</Form.Label>
                <Form.Control value={values.category} onChange={changeHandler} type="text" id="summary" name="summary" placeholder="Summary" />
            </Form.Group>


            <Button variant="primary" type="submit">
                Create product
            </Button>
        </Form>
    );
};