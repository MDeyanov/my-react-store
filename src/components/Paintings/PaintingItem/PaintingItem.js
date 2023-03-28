import React from "react";
import { Link } from "react-router-dom";

export const PaintingItem = ({
    _id,
    title,
    price,
    imageUrl,
}) => {
    return (
        <div className="allPaintings">
            <div className="allPaintings-info">
                <img src={imageUrl} alt="paintings"/>
               {/*  <h6>Category: {category}</h6> */}
                <h2>Title: {title}</h2>
                <h2>Price: {price}$</h2>
                <Link to={`/paintings/${_id}`} className="details-button">Details</Link>
            </div>
        </div>
    );
};