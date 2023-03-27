/* import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


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
          <Nav.Item>
            <Link to="/products">Shop now</Link>
          </Nav.Item>
        </Card.Body>
      </Card>
    </div>
  );
};
 */
import React from 'react';
import { Link } from 'react-router-dom';
import HomeCSS from'./Home.module.css';
import logo from '../../utils/Logo.png';
import video from '../../utils/newvideo.mp4';


export const Home = () => {
  return (
    <section className={HomeCSS.showcase}>
      <header>
        <h2 className={HomeCSS.logo}>
          <img className={HomeCSS.imgLogo} src={logo} img />
        </h2>
        
        {/* <div className={HomeCSS.toggle}></div> */}
      </header>
      <video autoPlay loop muted>
        <source src={video} type="video/mp4"/> 
      </video>
      <div className={HomeCSS.overlay}></div>
      <div className={HomeCSS.text}>
        <h2>The Art is My Life</h2>
        <h3>Explore My Gallery</h3>

        <Link to="/products">Explore</Link>
      </div>
      <ul className={HomeCSS.social}>
        <li className={HomeCSS.fb}><Link to="/FacebookPage"><img src="https://i.ibb.co/x7P24fL/facebook.png" img /></Link></li>
        <li><Link href="/twitterPage"><img src="https://i.ibb.co/Wnxq2Nq/twitter.png" img /></Link></li>
        <li><Link href="/InstagramPage"><img src="https://i.ibb.co/ySwtH4B/instagram.png" img /></Link></li>
      </ul>
    </section>
  );
};