import { canvas, center, hideHintText, setTimer, showHintText } from '../graphics';
import { coordsOnAxis, degToRad, getColorOnRainbow } from '../math';
import { type Ellipse } from 'two.js/src/shapes/ellipse';
import { type Circle } from 'two.js/src/shapes/circle';
import anime from 'animejs/lib/anime.es';

export function elasticSurface (): void {
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

  function stopHint (): void {
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
  let timer = setTimeout(() => {
    startHint();
  }, showHintDelay);
  setTimer(timer);

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
    setTimer(timer);
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
