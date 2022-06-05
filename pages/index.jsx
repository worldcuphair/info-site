import Button from '../components/button.js';
import React from 'react';
import Image from 'next/image';
import imgsrc from '../public/images/nestor pintana ref.jpg';

const index = (props) => {
  return (
    <article className='outer-cont'>
      <section className='inner-cont'>
        <header>
          <h1>world cup hair</h1>
        </header>
        <div className='fill'>
          <Image src={imgsrc} />
        </div>
      </section>
    </article>
  );
};

export default index;
