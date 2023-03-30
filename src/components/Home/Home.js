import React from 'react';
import { Link } from 'react-router-dom';
import HomeCSS from'./Home.module.css';
import video from '../../utils/newvideo.mp4';


export const Home = () => {
  return (
    <section className={HomeCSS.showcase}>      
      <video autoPlay loop muted>
        <source src={video} type="video/mp4"/> 
      </video>
      <div className={HomeCSS.overlay}></div>
      <div className={HomeCSS.text}>
        <h2>The Art is My Life</h2>
        <h3>Explore My Gallery</h3>

        <Link to="/paintings">Explore</Link>
      </div>
      <ul className={HomeCSS.social}>
        <li className={HomeCSS.fb}><Link to="/FacebookPage"><img src="https://i.ibb.co/x7P24fL/facebook.png"  alt="logo fb" /></Link></li>
        <li><Link href="/twitterPage"><img src="https://i.ibb.co/Wnxq2Nq/twitter.png"  alt="logo tw" /></Link></li>
        <li><Link href="/InstagramPage"><img src="https://i.ibb.co/ySwtH4B/instagram.png"   alt="logo insta"/></Link></li>
      </ul>
    </section>
  );
};