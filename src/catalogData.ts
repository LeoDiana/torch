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
  description: 'Take a look deeper into the middle of geometric truth. A tunnel of colorful figures will take you through the new hills of thoughts.',
  animation: spiral
}, {
  id: 2,
  title: 'Circles',
  description: 'Сircles on the water slowly envelop your whole being. sinking deeper, multi-colored dust dispels the darkness of space.',
  animation: circles
}, {
  id: 3,
  title: 'Elastic',
  description: 'Like a pendulum, everything returns to its starting point. There is no beginning and no end, the cycle is endless.',
  animation: elasticSurface
}];
