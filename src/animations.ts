import { canvas, center, clear } from './graphics';
import anime from 'animejs/lib/anime.es.js';
import { lineLength, getColorOnRainbow, degToRad, coordsOnAxis } from './math';

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

  anime.running.length = 0;
  canvas.clear();

  const defaultColor = '#000';

  const selectedLineWidth = 8;
  const defaultLineWidth = 0.8;

  const count = 30;
  const minR = 50;
  const maxR = 800;
  const delta = (maxR - minR) / count;

  let selectedIndex = 0;

  const getColor = getColorOnRainbow.bind(null, count);

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

  // const cursor = document.querySelector('#cursor') as HTMLElement;
  let timer = setInterval(blick, 5000);

  document.onmousemove = (event) => {
    // cursor.style.left = `${event.clientX}px`;
    // cursor.style.top = `${event.clientY}px`;
    const mouseDistFromCenter = lineLength(event.clientX, event.clientY, center.x, center.y);

    const offset = 0.2;
    const currCircleIndex = Math.floor(mouseDistFromCenter / delta + offset);

    circles[selectedIndex].linewidth = defaultLineWidth;
    circles[currCircleIndex].linewidth = selectedLineWidth;

    animes[selectedIndex].restart();
    selectedIndex = currCircleIndex;

    clearInterval(timer);
    timer = setInterval(blick, 5000);
  };
}

export const spiral = (): void => {
  clear();

  anime.running.length = 0;
  canvas.clear();
  const count = 35;
  const widthMax = 600;
  const widthMin = 130;
  const deltaWidth = (widthMax - widthMin) / count;

  const squares = Array.from({ length: count }).map((square, i) =>
    canvas.makeRectangle(center.x, center.y, widthMin + deltaWidth * i, widthMin + deltaWidth * i)
  );

  const rotationOffset = 0.09;

  squares.forEach((square, i) => {
    square.stroke = getColorOnRainbow(count, i);
    square.linewidth = 2;
    square.noFill();
    square.opacity = 1;
    square.rotation = rotationOffset * i;
  });

  const rotationEndPoint = 2 * Math.PI;

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

  const defaultColor = '#FFF';
  const defaultLineWidth = 1;
  const getColor = getColorOnRainbow.bind(null, count);

  const axisLength = 400;
  const end = coordsOnAxis(axisTilt, axisLength);
  const begin = coordsOnAxis(axisTilt, -axisLength);
  const axis = canvas.makeLine(begin.x, begin.y, end.x, end.y);
  axis.linewidth = 0.2;
  axis.stroke = defaultColor;

  const minR = 80;
  const maxR = 400;
  const delta = (maxR - minR) / count;

  const circles = Array.from({ length: count }).map((el, i) => {
    const r = minR + delta * i;
    const circle = canvas.makeEllipse(center.x, center.y, r, r);
    circle.noFill();
    circle.stroke = defaultColor;
    circle.linewidth = defaultLineWidth;
    circle.height = r * Math.sin(diskTilt);
    circle.rotation = axisTilt;
    return circle;
  });

  const mainCircleR = 15;
  const mainCircle = canvas.makeCircle(center.x, center.y, mainCircleR);
  mainCircle.noStroke();

  const hintCirclesOpacity = 0.7;
  const hintCircleOpacity = 0.5;

  const hintCircles = Array.from({ length: count }).map((el, i) => {
    const r = minR + delta * i;
    const circle = canvas.makeEllipse(center.x, center.y, r, r);
    circle.noFill();
    circle.stroke = getColor(i);
    circle.linewidth = defaultLineWidth;
    circle.height = r * Math.sin(diskTilt);
    circle.rotation = axisTilt;
    circle.opacity = hintCirclesOpacity;
    return circle;
  });

  const hintCircle = canvas.makeCircle(center.x, center.y, mainCircleR);
  hintCircle.noStroke();
  hintCircle.opacity = hintCircleOpacity;

  const hintTarget = {
    distance: 0
  };

  const hintAnim = anime({
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

  const hintTextOpacity = '0.5';
  const hintText = document.createElement('h2');
  hintText.innerText = 'Try to drag';
  hintText.style.position = 'absolute';
  hintText.style.color = 'white';
  hintText.style.top = '12%';
  hintText.style.right = '20%';
  hintText.style.opacity = hintTextOpacity;
  document.body.append(hintText);

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
    hintAnim.pause();
    hintText.style.opacity = '0';
    hintCircle.opacity = 0;
    hintCircles.forEach((circle) => {
      circle.opacity = 0;
    });
    circles.forEach((circle) => {
      circle.opacity = 1;
    });
  }

  stopHint();

  function startHint (): void {
    textAnim.restart();
    hintAnim.restart();
    hintText.style.opacity = hintTextOpacity;
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
  let mouseY = 0;

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

  let movingEnabled = false;
  let timer: NodeJS.Timeout = setTimeout(() => {
    startHint();
  }, 5000);

  document.onmousemove = (event) => {
    if (movingEnabled) {
      mouseY = center.y - event.clientY;
      mainCircle.position = coordsOnAxis(axisTilt, mouseY);

      circles.forEach((circle, i) => {
        const deltaDist = mouseY / count * i;
        circle.position = coordsOnAxis(axisTilt, mouseY - deltaDist);
      });
    }
  };

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
    }, 5000);
  };
}
