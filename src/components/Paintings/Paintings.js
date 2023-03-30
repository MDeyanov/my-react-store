import React from "react";
import { PaintingItem } from "./PaintingItem/PaintingItem";
import { Row, Col } from "react-bootstrap";
import { usePaintingContext } from "../../contexts/PaintingContext";

export const Paintings = () => {
    const {paintings} = usePaintingContext();
  return (
    <section id="paintings-page">
      <h1>All Paintings</h1>

      {paintings.length > 0 ? (
        <Row xs={1} md={2} lg={4}>
          {paintings.map((painting) => (
            <Col key={painting._id} className="mb-4">
              <PaintingItem {...painting} />
            </Col>
          ))}
        </Row>
      ) : (
        <h3 className="no-paintings">No paintings yet</h3>
      )}
    </section>
  );
};