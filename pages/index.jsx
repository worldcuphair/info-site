import Button from '../components/button.js';
import React, { useRef } from 'react';
import Image from 'next/image';
import imgsrc from '../public/images/nestor pintana ref.jpg';

import Balls from '../components/balls.js';

const index = (props) => {
  const ref = useRef(null);
  return (
    <article className='outer-cont'>
      <section className='inner-cont'>
        <header ref={ref}>
          <h1>world cup hair</h1>
        </header>
        <div className='fill'>
          <Image src={imgsrc} />
        </div>
        <Balls />
      </section>
    </article>
  );
};

export default index;
