//MatterStepTwo.js
import React, { useEffect, useState, useRef } from 'react';
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

const STATIC_DENSITY = 1;

function Canvas() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const [constraints, setContraints] = useState();
  const [scene, setScene] = useState();

  const handleResize = () => {
    setContraints(boxRef.current.getBoundingClientRect());
  };

  useEffect(() => {
    let engine = Engine.create();
    let world = engine.world;
    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        wireframes: false,
        background: 'transparent'
      }
    });

    console.log(
      Math.floor(window.innerWidth / 70),
      Number(Math.floor(window.innerHeight / 140))
    );

    const stack = Composites.stack(
      10,
      10,
      Math.floor(window.innerWidth / 70),
      Math.floor(window.innerHeight / 280),
      5,
      5,
      (x, y) => {
        console.log(x, y);
        return Bodies.circle(x, y, 70, {
          render: {
            sprite: {
              texture: ballSrc.src,
              xScale: 0.125,
              yScale: 0.125
            }
          }
        });
      }
    );

    let wallBottom = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight,
      window.innerWidth,
      1,
      {
        isStatic: true
      }
    );
    let wallRight = Bodies.rectangle(
      window.innerWidth,
      (window.innerHeight / 2) * 2,
      1,
      window.innerHeight,
      {
        isStatic: true,
        render: {
          fillStyle: 'blue'
        }
      }
    );
    let wallLeft = Bodies.rectangle(
      0,
      (window.innerHeight / 2) * 2,
      1,
      window.innerHeight,
      {
        isStatic: true,
        render: {
          fillStyle: 'blue'
        }
      }
    );

    World.add(world, [stack, wallBottom, wallRight, wallLeft]);

    Engine.run(engine);
    Render.run(render);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        angularStiffness: 0,
        render: {
          visible: false
        }
      }
    });

    World.add(world, mouseConstraint);

    render.mouse = mouse;

    setContraints(boxRef.current.getBoundingClientRect());
    setScene(render);

    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (constraints) {
      let { width, height } = constraints;

      // Dynamically update canvas and bounds
      scene.bounds.max.x = width;
      scene.bounds.max.y = height;
      scene.options.width = width;
      scene.options.height = height;
      scene.canvas.width = width;
      scene.canvas.height = height;

      // Dynamically update floor
      const wallBottom = scene.engine.world.bodies[0];
      const wallLeft = scene.engine.world.bodies[2];
      const wallRight = scene.engine.world.bodies[1];

      console.log(scene.engine.world.bodies);
      console.log(width, height);

      Body.setPosition(wallBottom, {
        x: width / 2,
        y: height
      });

      Body.setVertices(wallBottom, [
        { x: 1, y: height },
        { x: width, y: height },
        { x: width, y: height + STATIC_DENSITY },
        { x: 1, y: height + STATIC_DENSITY }
      ]);

      Body.setPosition(wallRight, {
        x: width,
        y: height / 2
      });

      Body.setPosition(wallLeft, {
        x: 0,
        y: height / 2
      });
    }
  }, [scene, constraints]);

  return (
    <div className='ball' ref={boxRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
