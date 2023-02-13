import Two from 'two.js';

const params = { fullscreen: true };
const elem = document.body;
export const canvas = new Two(params).appendTo(elem);

canvas.play();

export const center = {
  x: canvas.width / 2,
  y: canvas.height / 2
};
