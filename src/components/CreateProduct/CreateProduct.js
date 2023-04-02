import React, { useState } from 'react';
import { useForm } from "../../hooks/useForm";
import { Form, Button } from 'react-bootstrap';
import { usePaintingContext } from '../../contexts/PaintingContext';


export const CreateProduct = () => {
    const [imageUrl, setImageUrl] = useState("");
    const { onCreatePaintingSubmit } = usePaintingContext();
    const { values, changeHandler, onSubmit } = useForm({
        title: '',
        size: '',
        imageUrl: '',
        price: '',
        summary: '',
    }, onCreatePaintingSubmit);

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dzac3ggur",
                uploadPreset: "react-course",
            },
            (error, result) => {
                if (result.event === "success" && result.info.url !== undefined) {
                    setImageUrl(result.info.url);
                }
            }
        );

        widget.open();
    };

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
                <Form.Control
                    id="imageUrl"
                    name="imageUrl"
                    onChange={changeHandler}
                    value={values.imageUrl = imageUrl}
                    disabled
                />
                <Button variant="primary" onClick={openWidget} type="button">
                    Upload Image
                </Button>
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
