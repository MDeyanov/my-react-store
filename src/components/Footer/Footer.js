import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>&copy; 2023 My Online Store</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
