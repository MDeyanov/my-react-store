import React from "react";
import { Link } from "react-router-dom";

export const ProductItem = ({
    _id,
    title,
    category,
    price,
    imageUrl,
}) => {
    return (
        <div className="allProducts">
            <div className="allProducts-info">
                <img src={imageUrl} />
                <h6>Category: {category}</h6>
                <h2>Title: {title}</h2>
                <h2>Price: {price}$ per kg</h2>
                <Link to={`/products/${_id}`} className="details-button">Details</Link>
            </div>
        </div>
    );
};