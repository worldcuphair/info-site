import { useEffect, useRef, useState } from 'react';
import {
  Engine,
  Render,
  Body,
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
  const [render, setRender] = useState({});

  useEffect(() => {
    let canvasWidth = windowSize.w
      ? windowSize.w
      : document.documentElement.clientWidth;
    let canvasHeight = windowSize.h
      ? windowSize.h
      : document.documentElement.clientHeight;
    console.log(size);
    const newRender = Render.create({
      element: canvas.current,
      engine: engine.current,
      options: {
        wireframes: true,
        background: 'transparent'
      }
    });

    setRender(newRender);

    console.log(render, newRender);

    newRender.bounds.max.x = document.documentElement.clientWidth;
    newRender.bounds.max.y = document.documentElement.clientHeight;
    newRender.options.width = document.documentElement.clientWidth;
    newRender.options.height = document.documentElement.clientHeight;
    newRender.canvas.width = document.documentElement.clientWidth;
    newRender.canvas.height = document.documentElement.clientHeight;

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
    Render.run(newRender);

    window.addEventListener('resize', () => {
      let prevWidth = window.innerWidth;
      newRender.bounds.max.x = document.documentElement.clientWidth;
      newRender.bounds.max.y = document.documentElement.clientHeight;
      newRender.options.width = document.documentElement.clientWidth;
      newRender.options.height = document.documentElement.clientHeight;
      newRender.canvas.width = document.documentElement.clientWidth;
      newRender.canvas.height = document.documentElement.clientHeight;
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;

      Body.setPosition(wallBottom, {
        x: canvasWidth / 2,
        y: canvasHeight
      });
      // Body.scale(wallBottom, canvasWidth / 2, 1);

      Body.setPosition(wallTop, {
        x: canvasWidth / 2,
        y: 0
      });
      // Body.scale(wallTop, canvasWidth / 2, 0);

      Body.setPosition(wallLeft, {
        x: 0,
        y: canvasHeight / 2
      });
      // Body.scale(wallLeft, 0, canvasHeight / 2);

      Body.setPosition(wallRight, {
        x: canvasWidth,
        y: canvasHeight / 2
      });
      // Body.scale(wallRight, canvasWidth, canvasHeight / 2);

      // console.log(wallBottom, wallTop, wallLeft, wallRight);
      console.log(
        canvasWidth,
        canvasHeight,
        document.documentElement.clientWidth,
        window.innerWidth
      );
    });

    return () => {
      // Render.stop(render);
      // World.clear(engine.current.world);
      // Engine.clear(engine.current);
      // render.canvas.remove();
      // render.canvas = null;
      // render.context = null;
      // render.textures = {};
    };
  }, []);

  useEffect(() => {
    console.log(size);
    setWindowSize({
      w: size.width,
      h: size.height
    });
    return () => {};
  }, [size]);

  return (
    <div className='ball'>
      <div ref={canvas} />
    </div>
  );
}

export default Simple;
