import {
  canvas,
  center,
  clear,
  hideHintText,
  hintText,
  moveCursor, showHintText,
  turnOnCustomCursor
} from './graphics';
import anime from 'animejs/lib/anime.es.js';
import { lineLength, getColorOnRainbow, degToRad, coordsOnAxis } from './math';
import { type Ellipse } from 'two.js/src/shapes/ellipse';
import { type Circle } from 'two.js/src/shapes/circle';

export const simpleReactRotation = (): void => {
  clear();

  const width = 400;
  const rect = canvas.makeRectangle(center.x, center.y, width, width);

  rect.stroke = 'hsla(0, 100%, 50%, 1)';
  rect.linewidth = 3;
  rect.noFill();

  const target = {
    hue: 0
  };

  anime({
    targets: [rect, target],
    rotation: 2 * Math.PI,
    hue: 360,
    loop: true,
    duration: 6000,
    easing: 'linear',
    update: () => {
      rect.stroke = `hsla(${target.hue}, 100%, 50%, 1)`;
      console.log(target);
    }
  });
};

export function circlesSimple (): void {
  clear();

  const selectedColor = 'red';
  const defaultColor = 'white';

  const selectedLineWidth = 5;
  const defaultLineWidth = 1;

  const count = 30;
  const minR = 50;
  const maxR = 800;
  const delta = (maxR - minR) / count;

  const circles = Array.from({ length: count }).map((el, i) => {
    const circle = canvas.makeCircle(center.x, center.y, delta * i);
    circle.noFill();
    circle.stroke = defaultColor;
    circle.linewidth = defaultLineWidth;
    return circle;
  });

  let selectedIndex = 0;

  document.onmousemove = (event) => {
    circles[selectedIndex].stroke = defaultColor;
    circles[selectedIndex].linewidth = defaultLineWidth;

    const mouseDistFromCenter = lineLength(event.clientX, event.clientY, center.x, center.y);

    const offset = 0.2;
    const currCircleIndex = Math.floor(mouseDistFromCenter / delta + offset);

    circles[currCircleIndex].stroke = selectedColor;
    circles[currCircleIndex].linewidth = selectedLineWidth;

    selectedIndex = currCircleIndex;
  };
}

export function circles (): void {
  clear();
  turnOnCustomCursor();

  const count = 30;
  const minR = 50;
  const maxR = 800;
  const delta = (maxR - minR) / count;

  const defaultColor = '#000';
  const selectedLineWidth = 8;
  const defaultLineWidth = 0.8;
  const getColor = getColorOnRainbow.bind(null, count);

  let selectedIndex = 0;

  const circles = Array.from({ length: count }).map((el, i) => {
    const circle = canvas.makeCircle(center.x, center.y, minR + delta * i);
    circle.noFill();
    circle.stroke = defaultColor;
    circle.linewidth = defaultLineWidth;
    return circle;
  });

  const animes = circles.map((circle, i) =>
    anime({
      targets: circle,
      radius: {
        value: '+=15',
        duration: 2200,
        delay: -900,
        easing: 'easeInOutElastic(1, 0.7)'
      },
      stroke: {
        duration: 6000,
        value: [getColor(i), defaultColor]
      },
      update: () => {
        if (i === selectedIndex) {
          circles[i].stroke = getColor(i);
        }
      }
    })
  );

  function blick (): void {
    animes.forEach((anim, i) => {
      setTimeout(() => {
        anim.restart();
      }, 50 * i);
    });
  }

  const showHintDelay = 5000;
  let timer = setInterval(blick, showHintDelay);

  document.onmousemove = (event) => {
    moveCursor(event.clientX, event.clientY);

    const mouseDistFromCenter = lineLength(event.clientX, event.clientY, center.x, center.y);
    const offset = 0.2;
    const currCircleIndex = Math.floor(mouseDistFromCenter / delta + offset);

    circles[selectedIndex].linewidth = defaultLineWidth;
    circles[currCircleIndex].linewidth = selectedLineWidth;

    animes[selectedIndex].restart();
    selectedIndex = currCircleIndex;

    clearInterval(timer);
    timer = setInterval(blick, showHintDelay);
  };
}

export const spiral = (): void => {
  clear();

  const count = 35;
  const widthMax = 600;
  const widthMin = 130;
  const deltaWidth = (widthMax - widthMin) / count;
  const rotationOffset = 0.09;
  const rotationEndPoint = 2 * Math.PI;

  const squares = Array.from({ length: count }).map((square, i) =>
    canvas.makeRectangle(center.x, center.y, widthMin + deltaWidth * i, widthMin + deltaWidth * i)
  );

  squares.forEach((square, i) => {
    square.stroke = getColorOnRainbow(count, i);
    square.linewidth = 2;
    square.noFill();
    square.opacity = 1;
    square.rotation = rotationOffset * i;
  });

  (function rotationAnimation () {
    const duration = 16000;
    const delay = 160;
    const velocity = rotationEndPoint / duration;

    const target = {
      time: 0
    };

    anime({
      targets: [target],
      loop: true,
      duration,
      time: duration,
      easing: 'linear',
      update: () => {
        squares.forEach((square, i) => {
          square.rotation = velocity * (target.time - delay * i);
        });
      }
    });
  })();

  (function opacityAnimation () {
    const duration = 3000;
    const delay = 0.16;

    const target = {
      rad: 0
    };

    anime({
      targets: [target],
      loop: true,
      duration,
      rad: rotationEndPoint,
      easing: 'linear',
      update: () => {
        squares.forEach((square, i) => {
          square.opacity = Math.sin(target.rad - delay * i);
        });
      }
    });
  })();
};

export function elasticSurface (): void {
  clear();

  const count = 15;
  const diskTilt = degToRad(45);
  const axisTilt = degToRad(15);
  const mainCircleR = 15;
  const minR = 80;
  const maxR = 400;
  const delta = (maxR - minR) / count;
  const axisLength = 400;

  const defaultColor = '#FFF';
  const defaultLineWidth = 1;
  const hintCircleOpacity = 0.5;
  const hintCirclesOpacity = 0.7;
  const getColor = getColorOnRainbow.bind(null, count);

  function drawCircles (opacity = 1): Ellipse[] {
    return Array.from({ length: count }).map((el, i) => {
      const r = minR + delta * i;
      const circle = canvas.makeEllipse(center.x, center.y, r, r);
      circle.noFill();
      circle.stroke = getColor(i);
      circle.linewidth = defaultLineWidth;
      circle.height = r * Math.sin(diskTilt);
      circle.rotation = axisTilt;
      circle.opacity = opacity;
      return circle;
    });
  }

  function drawMainCircle (opacity = 1): Circle {
    const circle = canvas.makeCircle(center.x, center.y, mainCircleR);
    circle.noStroke();
    circle.opacity = opacity;
    return circle;
  }

  const end = coordsOnAxis(axisTilt, axisLength);
  const begin = coordsOnAxis(axisTilt, -axisLength);
  const axis = canvas.makeLine(begin.x, begin.y, end.x, end.y);
  axis.linewidth = 0.2;
  axis.stroke = defaultColor;

  const circles = drawCircles();
  const hintCircles = drawCircles(hintCirclesOpacity);

  const mainCircle = drawMainCircle();
  const hintCircle = drawMainCircle(hintCircleOpacity);

  const hintTarget = {
    distance: 0
  };

  const hintAnimation = anime({
    targets: hintTarget,
    duration: 3500,
    distance: [0, 200, -40, 0],
    easing: 'easeInOutSine',
    loop: true,
    endDelay: 2000,
    update: () => {
      hintCircle.position = coordsOnAxis(axisTilt, hintTarget.distance);
      hintCircles.forEach((circle, i) => {
        const deltaDist = hintTarget.distance / count * i;
        circle.position = coordsOnAxis(axisTilt, hintTarget.distance - deltaDist);
      });
    }
  });

  const textAnim = anime({
    targets: hintText,
    opacity: '+=0.2',
    scale: 1.03,
    loop: true,
    duration: 1000,
    direction: 'alternate',
    easing: 'linear'
  });

  function stopHint (): void {
    textAnim.pause();
    hintAnimation.pause();
    hideHintText();
    hintCircle.opacity = 0;
    hintCircles.forEach((circle) => {
      circle.opacity = 0;
    });
    circles.forEach((circle) => {
      circle.opacity = 1;
    });
  }

  function startHint (): void {
    textAnim.restart();
    hintAnimation.restart();
    showHintText();
    hintCircle.opacity = hintCircleOpacity;
    hintCircles.forEach((circle) => {
      circle.opacity = hintCirclesOpacity;
    });
    circles.forEach((circle) => {
      circle.opacity = 0;
    });
  }

  const animationDuration = 2000;
  const blickCount = 3;

  const target = {
    time: animationDuration,
    blickOffset: 0
  };

  const deltas = Array.from({ length: count }).map(() => 0);

  const animation = anime({
    targets: target,
    time: 0,
    blickOffset: count * blickCount,
    duration: animationDuration,
    easing: 'easeOutElastic(1, 0.28)',
    begin: () => {
      circles.forEach((circle, i) => {
        deltas[i] = (center.y - circle.position.y) / animationDuration;
      });
    },
    update: () => {
      circles.forEach((circle, i) => {
        circle.position = coordsOnAxis(axisTilt, deltas[i] * target.time);
        mainCircle.position = coordsOnAxis(axisTilt, deltas[0] * target.time);
        circle.stroke = getColor((target.blickOffset + i) % count);
      });
    }
  });

  const showHintDelay = 5000;
  let movingEnabled = false;

  stopHint();
  let timer: NodeJS.Timeout = setTimeout(() => {
    startHint();
  }, showHintDelay);

  document.onmousedown = () => {
    movingEnabled = true;
    stopHint();
    clearTimeout(timer);
  };

  document.onmouseup = () => {
    movingEnabled = false;
    animation.play();

    timer = setTimeout(() => {
      startHint();
    }, showHintDelay);
  };

  document.onmousemove = (event) => {
    if (movingEnabled) {
      const mouseY = center.y - event.clientY;
      mainCircle.position = coordsOnAxis(axisTilt, mouseY);

      circles.forEach((circle, i) => {
        const deltaDist = mouseY / count * i;
        circle.position = coordsOnAxis(axisTilt, mouseY - deltaDist);
      });
    }
  };
}
