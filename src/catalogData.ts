import { circles, elasticSurface, spiral } from './animations';

interface AnimationData {
  title: string
  description: string
  animation: () => void
}

export const catalog: AnimationData[] = [{
  title: 'Spiral',
  description: 'Our first animation!',
  animation: spiral
}, {
  title: 'Circles',
  description: 'It looks like circles on water',
  animation: circles
}, {
  title: 'Elastic',
  description: 'This is solar system? or what?',
  animation: elasticSurface
}];
