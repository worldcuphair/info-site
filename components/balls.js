import { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World, Composites, Common } from 'matter-js';
import Matter from 'matter-js';
import ballSrc from '../public/images/2022 world cup ball.png';

function Balls(props) {
  const canvas = useRef();
  const isPressed = useRef(false);
  const engine = useRef(Engine.create());

  useEffect(() => {
    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const render = Render.create({
      element: canvas.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    });

    // add bodies
    // const stack = Composites.stack(
    //   100,
    //   600 - 21 - 20 * 20,
    //   10,
    //   10,
    //   20,
    //   0,
    //   (x, y) => {
    //     return Bodies.circle(x, y, 20, {
    //       render: {
    //         sprite: {
    //           texture: ballSrc.src
    //         }
    //       }
    //     });
    //   }
    // );

    const stack = Composites.stack(1, 1, 10, 5, 5, 5, function (x, y) {
      return Bodies.circle(x, y, 20, {
        render: {
          sprite: {
            texture: ballSrc.src,
            xScale: 0.125,
            yScale: 0.125
          }
        }
      });
    });

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
      stack
    ]);

    // add mouse control
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    // fit the render viewport to the canvas
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: cw, y: ch }
    });

    World.add(engine.current.world, mouseConstraint);
    Engine.run(engine.current);
    Render.run(render);

    const handleResize = () => {
      // render.bounds.max.x = window.innerWidth;
      // render.bounds.max.y = window.innerHeight;
      // render.options.width = window.innerWidth;
      // render.options.height = window.innerHeight;
      // render.canvas.width = window.innerWidth;
      // render.canvas.height = window.innerHeight;
      // canvas.current.style.width = window.innerWidth;
      // canvas.current.style.height = window.innerHeight;
      // render.canvas.style.width = window.innerWidth;
      // render.canvas.style.height = window.innerHeight;
      if (render.canvas) {
        // render.canvas.width = window.innerWidth;
        // render.canvas.height = window.innerHeight;
      }
      console.log(canvas.current, render.canvas);
    };

    window.addEventListener('resize', () => {
      handleResize();
    });

    return () => {
      window.removeEventListener('resize', () => handleResize);
      Render.stop(render);
      World.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  const handleDown = () => {
    isPressed.current = true;
  };

  const handleUp = () => {
    isPressed.current = false;
  };

  const handleAddCircle = (e) => {
    // if (isPressed.current) {
    const ball = Bodies.circle(e.clientX, e.clientY, 20, {
      mass: 10,
      restitution: 0.9,
      friction: 0.005,
      render: {
        fillStyle: '#0000ff',
        sprite: {
          texture: ballSrc.src,
          xScale: 0.125,
          yScale: 0.125
        }
      }
    });
    World.add(engine.current.world, [ball]);
    // }
  };

  return (
    <div className='ball'>
      <div ref={canvas} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default Balls;
