import React from 'react';
import { Card, Button } from 'react-bootstrap';

export const Home = () => {
    return (
        <div>
          <Card>
            <Card.Body>
              <Card.Title>Welcome to My Online Store</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod ligula vel tellus 
                dignissim hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
                posuere cubilia Curae; Quisque placerat ultrices nisl, sed vestibulum velit malesuada non.
              </Card.Text>
              <Button variant="primary">Shop Now</Button>
            </Card.Body>
          </Card>
        </div>
      );
};
