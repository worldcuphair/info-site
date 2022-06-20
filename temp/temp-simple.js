import { useEffect, useRef, useState } from 'react';
import {
  Engine,
  Render,
  Bodies,
  World,
  Composites,
  Composite,
  Mouse,
  MouseConstraint
} from 'matter-js';
import ballSrc from '../public/images/2022 world cup ball.png';
import useWindowSize from '../hooks/useWindowSize';

function Simple(props) {
  const canvas = useRef();
  const engine = useRef(Engine.create());
  const size = useWindowSize();
  const [windowSize, setWindowSize] = useState({
    w: undefined,
    h: undefined
  });
  const [render, setRender] = useState(null);
  const [wallTop, setWallTop] = useState(null);
  const [wallBottom, setWallBottom] = useState(null);
  const [wallLeft, setWallLeft] = useState(null);
  const [wallRight, setWallRight] = useState(null);
  useEffect(() => {
    console.log(size);
    setWindowSize({
      w: size.width,
      h: size.height
    });
    return () => {};
  }, [size]);

  useEffect(() => {
    let canvasWidth = windowSize.w
      ? windowSize.w
      : document.documentElement.clientWidth;
    let canvasHeight = windowSize.h
      ? windowSize.h
      : document.documentElement.clientHeight;
    console.log(size);

    // render.bounds.max.x = document.documentElement.clientWidth;
    // render.bounds.max.y = document.documentElement.clientHeight;
    // render.options.width = document.documentElement.clientWidth;
    // render.options.height = document.documentElement.clientHeight;
    // render.canvas.width = document.documentElement.clientWidth;
    // render.canvas.height = document.documentElement.clientHeight;

    const stack = Composites.stack(1, 10, 10, 50, 5, 5, (x, y) => {
      return Bodies.circle(x, y, 70, {
        render: {
          sprite: {
            texture: ballSrc.src,
            xScale: 0.125,
            yScale: 0.125
          }
        }
      });
    });

    const frame = 1;

    let wallTop = Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, frame, {
      isStatic: true
    });
    let wallBottom = Bodies.rectangle(
      canvasWidth / 2,
      canvasHeight,
      canvasWidth,
      frame,
      {
        isStatic: true
      }
    );
    let wallRight = Bodies.rectangle(
      canvasWidth,
      canvasHeight / 2,
      frame,
      canvasHeight,
      {
        isStatic: true
      }
    );
    let wallLeft = Bodies.rectangle(0, canvasHeight / 2, frame, canvasHeight, {
      isStatic: true
    });

    Composite.add(engine.current.world, [
      wallBottom,
      wallTop,
      wallLeft,
      wallRight,
      stack
    ]);

    // World.add(engine.current.world, [
    //   Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
    //   Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
    //   Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
    //   Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
    //   stack
    // ]);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    World.add(engine.current.world, mouseConstraint);
    Engine.run(engine.current);
    Render.run(render);

    // window.addEventListener('resize', () => {
    //   render.bounds.max.x = document.documentElement.clientWidth;
    //   render.bounds.max.y = document.documentElement.clientHeight;
    //   render.options.width = document.documentElement.clientWidth;
    //   render.options.height = document.documentElement.clientHeight;
    //   render.canvas.width = document.documentElement.clientWidth;
    //   render.canvas.height = document.documentElement.clientHeight;
    //   canvasWidth = document.documentElement.clientWidth;
    //   canvasHeight = document.documentElement.clientHeight;
    //   wallTop = Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, frame, {
    //     isStatic: true
    //   });
    //   wallBottom = Bodies.rectangle(
    //     canvasWidth / 2,
    //     canvasHeight,
    //     canvasWidth,
    //     frame,
    //     {
    //       isStatic: true
    //     }
    //   );
    //   wallRight = Bodies.rectangle(
    //     canvasWidth,
    //     canvasHeight / 2,
    //     frame,
    //     canvasHeight,
    //     {
    //       isStatic: true
    //     }
    //   );
    //   wallLeft = Bodies.rectangle(0, canvasHeight / 2, frame, canvasHeight, {
    //     isStatic: true
    //   });
    //   Composite.add(engine.current.world, [
    //     wallBottom,
    //     wallTop,
    //     wallLeft,
    //     wallRight
    //   ]);
    //   console.log(wallBottom, wallTop, wallLeft, wallRight);
    //   console.log(canvasWidth, canvasHeight);
    // });

    return () => {
      // Render.stop(render);
      // World.clear(engine.current.world);
      // Engine.clear(engine.current);
      // render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      // render.textures = {};
    };
  }, [render]);

  return (
    <div className='ball'>
      <div ref={canvas} />
    </div>
  );
}

export default Simple;
