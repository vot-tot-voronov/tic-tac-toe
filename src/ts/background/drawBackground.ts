import { animateFigures } from './animateFigures';
import { Ball, Cross } from './figures';

function drawBackground() {
  const canvasBg = <HTMLCanvasElement>document.getElementById('bg-canvas');
  const canvasContext = <CanvasRenderingContext2D>canvasBg.getContext('2d');
  const gameWrapper = <HTMLDivElement>document.querySelector('.game-warapper');

  canvasBg.width = gameWrapper.clientWidth;
  canvasBg.height = gameWrapper.clientHeight;

  const balls: Array<Ball> = [];
  const crosses: Array<Cross> = [];

  const bodyObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const { inlineSize, blockSize } = entry.borderBoxSize[0];

      canvasBg.width = inlineSize;
      canvasBg.height = blockSize;
    });
  });

  bodyObserver.observe(gameWrapper);

  animateFigures({ canvasContext, balls, crosses });
}

export default drawBackground;
