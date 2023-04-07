import { canvas, center } from '../graphics';
import { getColorOnRainbow } from '../math';
import anime from 'animejs/lib/anime.es';

export const spiral = (): void => {
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
