import { Vector } from 'two.js/src/vector';
import { center } from './graphics';

export function lineLength (x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export function degToRad (deg: number): number {
  return deg * Math.PI / 180;
}

export function coordsOnAxis (axisAngle: number, distance: number): Vector {
  return new Vector(
    center.x + distance * Math.sin(axisAngle),
    center.y - distance * Math.cos(axisAngle)
  );
}

export function getColorOnRainbow (steps: number, index: number): string {
  return `hsl(${360 / steps * index}, 100%, 50%)`;
}
