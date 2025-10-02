import random from '../utils/random';

abstract class Figure {
  x: number = 0;
  y: number = 0;
  velX: number = 0;
  velY: number = 0;
  color: string = 'rgba(255, 255, 255, 1)';
  size: number = 1;

  constructor(x: number, y: number, velX: number, velY: number, color: string, size: number) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  update(widthBg: number, heightBg: number): void {
    if (this.x + this.size >= widthBg) {
      this.velX = -this.velX;
    }
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= heightBg) {
      this.velY = -this.velY;
    }
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect(figures: Array<Figure>): void {
    for (let j = 0; j < figures.length; j++) {
      if (!(this === figures[j])) {
        const dx = this.x - figures[j].x;
        const dy = this.y - figures[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size / 2 + figures[j].size) {
          figures[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        }
      }
    }
  }
}

export class Ball extends Figure {
  draw(canvasContext: CanvasRenderingContext2D): void {
    canvasContext.beginPath();
    canvasContext.lineWidth = 7;
    canvasContext.strokeStyle = this.color;
    canvasContext.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    canvasContext.stroke();
  }
}

export class Cross extends Figure {
  draw(canvasContext: CanvasRenderingContext2D): void {
    canvasContext.lineWidth = 7;
    canvasContext.lineCap = 'round';
    canvasContext.strokeStyle = this.color;
    canvasContext.beginPath();
    canvasContext.moveTo(this.x - this.size, this.y - this.size);
    canvasContext.lineTo(this.x + this.size, this.y + this.size);
    canvasContext.moveTo(this.x + this.size, this.y - this.size);
    canvasContext.lineTo(this.x - this.size, this.y + this.size);
    canvasContext.stroke();
  }
}
