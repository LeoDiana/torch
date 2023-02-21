import { circles, elasticSurface, spiral } from './animations';

interface AnimationData {
  id: number
  title: string
  description: string
  animation: () => void
}

export const catalog: AnimationData[] = [{
  id: 1,
  title: 'Spiral',
  description: 'Our first animation!',
  animation: spiral
}, {
  id: 2,
  title: 'Circles',
  description: 'It looks like circles on water',
  animation: circles
}, {
  id: 3,
  title: 'Elastic',
  description: 'This is solar system? or what?',
  animation: elasticSurface
}];
