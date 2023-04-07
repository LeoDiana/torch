import animationElastic from './img/animation_elastic.png';
import animationSpiral from './img/animation_spiral.png';
import animationCircles from './img/animation_circles.png';
import { circles, elasticSurface, spiral } from './animations';

interface AnimationData {
  id: number
  title: string
  description: string
  animationImage: string
  animation: () => void
}

export const catalog: AnimationData[] = [{
  id: 1,
  title: 'Spiral',
  description: 'Take a look deeper into the middle of geometric truth. A tunnel of colorful figures will take you through the new hills of thoughts.',
  animationImage: animationSpiral,
  animation: spiral
}, {
  id: 2,
  title: 'Circles',
  description: 'Circles on the water slowly envelop your whole being. sinking deeper, multi-colored dust dispels the darkness of space.',
  animationImage: animationCircles,
  animation: circles
}, {
  id: 3,
  title: 'Elastic',
  description: 'Like a pendulum, everything returns to its starting point. There is no beginning and no end, the cycle is endless. Tab to see the real magic.',
  animationImage: animationElastic,
  animation: elasticSurface
}];
