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

const cursor = document.querySelector('#cursor') as HTMLElement;

export const turnOnCustomCursor = (): void => {
  document.body.style.cursor = 'none';
  cursor.style.display = 'block';
};

export const turnOffCustomCursor = (): void => {
  document.body.style.cursor = 'pointer';
  cursor.style.display = 'none';
};

export const moveCursor = (x: number, y: number): void => {
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
};

export const clear = (): void => {
  canvas.clear();
  anime.running.length = 0;
};
