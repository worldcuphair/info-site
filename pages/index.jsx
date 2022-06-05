import Button from '../components/button.js';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import imgsrc from '../public/images/nestor pintana ref.jpg';

const index = (props) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.addEventListener('transitionend', (e) => {
      console.log('Transition ended');
      const confettiSettings = { target: e.target };
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
    });

    return () => confetti.clear();
  }, []); // add the var dependencies or not
  return (
    <article className='outer-cont'>
      <section className='inner-cont'>
        <header ref={ref}>
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
