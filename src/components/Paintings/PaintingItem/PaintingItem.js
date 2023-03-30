import React from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

export const PaintingItem = ({ _id, title, price, imageUrl }) => {
  return (
    <div className="col-md-3 mb-4">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imageUrl} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Price: {price}$</Card.Text>
          <Link to={`/paintings/${_id}`} className="btn btn-primary">Details</Link>
        </Card.Body>
      </Card>
    </div>
  );
};