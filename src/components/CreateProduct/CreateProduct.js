import React from 'react';
import { useForm } from "../../hooks/useForm";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export const CreateProduct = ({
    onCreateProductSubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        category: '',
        weight: '',
        price: '',
        imageUrl: '',
    }, onCreateProductSubmit);
    return (
        <Form id="create" method="post" onSubmit={onSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Product Title:</Form.Label>
                <Form.Control value={values.title} onChange={changeHandler} type="text" id="title" name="title" placeholder="Product Title" />               
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Category:</Form.Label>
                <Form.Control value={values.category} onChange={changeHandler} type="text" id="category" name="category" placeholder="Category" />               
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Weight:</Form.Label>
                <Form.Control value={values.weight} onChange={changeHandler} type="text" id="weight" name="weight" placeholder="Weight" />               
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Price:</Form.Label>
                <Form.Control value={values.price} onChange={changeHandler} type="text" id="price" name="price" placeholder="Price" />               
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Image:</Form.Label>
                <Form.Control value={values.imageUrl} onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />               
            </Form.Group>

                      
            <Button variant="primary" type="submit">
                Create product
            </Button>
        </Form>
    );
};