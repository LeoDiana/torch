import { canvas, center, moveCursor, turnOnCustomCursor } from '../graphics';
import { getColorOnRainbow, lineLength } from '../math';
import anime from 'animejs/lib/anime.es';

export function circles (): void {
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
