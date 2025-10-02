import random from '../../utils/random';
import { Ball, Cross } from '../figures';
import { IAnimateFiguresProps } from './types';

export function animateFigures(props: IAnimateFiguresProps) {
  const { canvasContext, balls, crosses } = props;

  const gameWrapper = document.querySelector('.game-warapper') as HTMLDivElement;
  const widthBg = gameWrapper.clientWidth;
  const heightBg = gameWrapper.clientHeight;

  canvasContext.fillStyle = 'rgba(25, 23, 23, 0.5)';
  canvasContext.fillRect(0, 0, widthBg, heightBg);

  while (balls.length < 25) {
    const ball = new Ball(
      random(0, widthBg),
      random(0, heightBg),
      random(-7, 7),
      random(-7, 7),
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      random(10, 20),
    );

    balls.push(ball);

    const cross = new Cross(
      random(0, widthBg),
      random(0, heightBg),
      random(-7, 7),
      random(-7, 7),
      'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
      random(10, 20),
    );

    crosses.push(cross);
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw(canvasContext);
    crosses[i].draw(canvasContext);
    balls[i].update(widthBg, heightBg);
    crosses[i].update(widthBg, heightBg);
    balls[i].collisionDetect(balls);
    crosses[i].collisionDetect(crosses);
  }

  return requestAnimationFrame(() => animateFigures({ ...props }));
}
