import Two from 'two.js';
import anime from 'animejs/lib/anime.es.js';

const params = { fullscreen: true };
const canvasElem = document.querySelector('#canvas') as HTMLElement;
export const canvas = new Two(params).appendTo(canvasElem);

canvas.play();

export const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

let timer: NodeJS.Timeout;
export const setTimer = (t: NodeJS.Timeout): void => {
  timer = t;
};

const cursor = document.querySelector('#cursor') as HTMLElement;

export const turnOnCustomCursor = (): void => {
  canvasElem.style.cursor = 'none';
  cursor.style.display = 'block';
};

export const turnOffCustomCursor = (): void => {
  canvasElem.style.cursor = 'pointer';
  cursor.style.display = 'none';
};

export const moveCursor = (x: number, y: number): void => {
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
};

export const clear = (): void => {
  canvas.clear();
  anime.running.length = 0;
  hideHintText();
  clearTimeout(timer);
};

export const hintText = document.querySelector('#hint-text') as HTMLElement;

export const showHintText = (): void => {
  hintText.style.display = 'block';
};

export const hideHintText = (): void => {
  hintText.style.display = 'none';
};

hideHintText();
