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

    const [titleError, setTitleError] = useState("");
    const [sizeError, setSizeError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [summaryError, setSummaryError] = useState("");

    const openWidget = () => {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dzac3ggur",
                uploadPreset: "react-course",
            },
            (error, result) => {
                if (result.event === "success" && result.info.url !== undefined) {
                    values.imageUrl = imageUrl;
                    setImageUrl(result.info.url);
                    values.imageUrl = result.info.url;
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

    const validateForm = () => {
        let isValid = true;

        if (!values.title.trim()) {
            setTitleError("Title is required");
            isValid = false;
        } else if (!/^[A-Za-z0-9]{3,16}/.test(values.title)) {
            setTitleError("Title must be between 3 and 16 characters and shouldn't include any special character!");
            isValid = false;
        } else {
            setTitleError("");
        }

        if (!values.size.trim()) {
            setSizeError("Size is required");
            isValid = false;
        } else if (!/^\d{1,3}x\d{1,3}$/.test(values.size)) {
            setSizeError("Size must be in this format example: 70x40 (70 centimeters height and 40 width!");
            isValid = false;
        } else {
            setSizeError("");
        }

        if (!values.price.trim()) {
            setPriceError("Price is required");
            isValid = false;
        } else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) {
            setPriceError("Price must be a valid number with up to 2 decimal places");
            isValid = false;
        } else {
            setPriceError("");
        }

        if (!values.summary.trim()) {
            setSummaryError("Summary is required");
            isValid = false;
        } else {
            setSummaryError("");
        }

        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            onSubmit();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Edit</h2>
            </div>
            <Form id="edit" method="post" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Product Title:</Form.Label>
                    <Form.Control
                        value={values.title}
                        onChange={changeHandler}
                        onBlur={() => {
                            if (!values.title.trim()) {
                                setTitleError("Title is required");
                            } else if (!/^[A-Za-z0-9]{3-16}/.test(values.title)) {

                            } else {
                                setTitleError("");
                            }
                        }}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Product Title"
                    />
                    {titleError && (
                        <div className="text-danger">{titleError}</div>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                        value={values.size}
                        onChange={changeHandler}
                        onBlur={() => {
                            if (!values.size.trim()) {
                                setSizeError("Size is required");
                            } else if (!/^\d{1,3}x\d{1,3}$/.test(values.size)) {
                                setSizeError("Size must be in this format example: 70x40 (70 centimeters height and 40 width!");
                            } else {
                                setSizeError("");
                            }
                        }}
                        type="text"
                        id="size"
                        name="size"
                        placeholder="Size"
                    />
                    {sizeError && (
                        <div className="text-danger">{sizeError}</div>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                        value={values.price}
                        onChange={changeHandler}
                        onBlur={() => {
                            if (!values.price.trim()) {
                                setPriceError("Price is required");
                            } else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) {
                                setPriceError("Price must be a valid number with up to 2 decimal places");
                            } else {
                                setPriceError("");
                            }
                        }}
                        type="text"
                        id="price"
                        name="price"
                        placeholder="Price"
                    />
                    {priceError && (
                        <div className="text-danger">{priceError}</div>
                    )}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image:</Form.Label>
                    <div className={styles.imageContainer}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="product" />
                        ) : (
                            <div className={styles.noImage}>
                                No image selected
                            </div>
                        )}
                        <Button
                            onClick={openWidget}
                            className={styles.uploadButton}
                            variant="primary"
                        >
                            {imageUrl ? "Change Image" : "Upload Image"}
                        </Button>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Summary:</Form.Label>
                    <Form.Control
                        value={values.category}
                        onChange={changeHandler}
                        onBlur={() => {
                            if (!values.summary.trim()) {
                                setSummaryError("Summary is required");
                            } else {
                                setSummaryError("");
                            }
                        }}
                        type="text"
                        id="summary"
                        name="summary"
                        placeholder="Summary"
                    />
                    {summaryError && (
                        <div className="text-danger">{summaryError}</div>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Edit Product
                </Button>
            </Form>
        </div>
    );
}