import Two from 'two.js';
import anime from 'animejs/lib/anime.es.js';

const params = { fullscreen: true };
const elem = document.querySelector('#canvas') as HTMLElement;
export const canvas = new Two(params).appendTo(elem);

canvas.play();

export const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

export const clear = (): void => {
  canvas.clear();
  anime.running.length = 0;
};
