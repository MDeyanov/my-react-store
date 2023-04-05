import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

import { useForm } from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import { paintingServiceFactory } from "../../services/paintingService";
import { usePaintingContext } from "../../contexts/PaintingContext";

import styles from './EditPainting.module.css'

export const EditPainting = () => {
    const [imageUrl, setImageUrl] = useState("");
    const { onPaintingEditSubmit } = usePaintingContext();
    const { paintingId } = useParams();
    const paintingService = useService(paintingServiceFactory);

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        _id: '',
        title: '',
        size: '',
        price: '',
        imageUrl: '',
        summary: '',
    }, onPaintingEditSubmit);

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dzac3ggur",
                uploadPreset: "react-course",
            },
            (error, result) => {
                if (result.event === "success" && result.info.url !== undefined) { 
                    values.imageUrl=imageUrl;                 
                    setImageUrl(result.info.url);
                    values.imageUrl= result.info.url;
                }
            }
        );
        widget.open();
    };

    useEffect(() => {
        paintingService.getOne(paintingId)
            .then(result => {
                changeValues(result);
            });
    }, [paintingId]);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Edit</h2>
            </div>
            <Form id="edit" method="post" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Title:</Form.Label>
                    <Form.Control
                        value={values.title}
                        onChange={changeHandler}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Product Title"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                        value={values.size}
                        onChange={changeHandler}
                        type="text"
                        id="size"
                        name="size"
                        placeholder="Size"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        value={values.price}
                        onChange={changeHandler}
                        type="text"
                        id="price"
                        name="price"
                        placeholder="Price"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image:</Form.Label>
                    <Form.Control
                        id="imageUrl"
                        name="imageUrl"
                        onChange={changeHandler}
                        value={values.imageUrl}
                        disabled
                    />
                    <Button variant="primary" onClick={openWidget} type="button">
                        Upload Image
                    </Button>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Summary:</Form.Label>
                    <Form.Control
                        value={values.category}
                        onChange={changeHandler}
                        type="text"
                        id="summary"
                        name="summary"
                        placeholder="Summary"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Edit Product
                </Button>
            </Form>
        </div>
    );
}