import Button from '../components/button.js';
import React, { useRef } from 'react';
import Image from 'next/image';
import imgsrc from '../public/images/nestor pintana ref.jpg';

import Canvas from '../components/Canvas.js';

const index = (props) => {
  const ref = useRef(null);
  return (
    <article className='outer-cont'>
      <section className='inner-cont'>
        <header ref={ref}>
          <h1>world cup hair</h1>
        </header>
        <div className='grid-container'>
          <div className='twitch-area'>
            <div className='left-area'></div>
            <div className='center-area'>
              <iframe
                src='https://clips.twitch.tv/embed?clip=ElatedCrypticTermiteBuddhaBar-WUNc9zjdlQJx88P1&parent=worldcup.hair'
                frameBorder='0'
                allowFullScreen='true'
                scrolling='no'
              ></iframe>
            </div>
            <div className='right-area'></div>
          </div>
        </div>
        <Canvas />
      </section>
    </article>
  );
};

export default index;
