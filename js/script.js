'use strict';

const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const fieldWidth = 450;
const fieldHeight = 800;

const racketImgBottom = new Image();
racketImgBottom.src = 'img/racketBottom.svg';

const racketImgTop = new Image();
racketImgTop.src = 'img/racketTop.svg';

const ball = {
  radius: 10,
  x: fieldWidth / 2,
  y: fieldHeight / 2,
  speedX: 0,
  speedY: 5,

  move: function () {
    this.x += this.speedX;
    this.y += this.speedY;
  },

  draw: function () {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#ff5b00';
    context.fill();
  },

  setSpeedY: function (time) {
    setInterval(() => {
      if (this.speedY > 0 && this.speedY < 10) {
        this.speedY += 0.5;
      } else if (this.speedY < 0 && this.speedY > -10) {
        this.speedY -= 0.5;
      }
    }, time * 1000);
  },

  checkCollision: function (racketTop, racketBottom) {
    if (this.x > fieldWidth - this.radius || this.x < this.radius) {
      this.speedX *= -1;
    }

    if (this.y - this.radius > fieldHeight || this.y + this.radius < 0) {
      if (this.y - this.radius > fieldHeight) {
        racketTop.score++;
      } else {
        racketBottom.score++;
      }
      racketTop.x = fieldWidth / 2 - 50;
      racketBottom.x = fieldWidth / 2 - 50;
      this.x = fieldWidth / 2;
      this.y = fieldHeight / 2;
      this.speedX = 0;
      // this.speedY = -1;
    }

    if ((this.y - racketTop.height - racketTop.y <= 0 && this.y - racketTop.height - racketTop.y >= -10) &&
      this.x > racketTop.x && this.x < racketTop.x + racketTop.width) {
      if (this.x - racketTop.x <= 55 && this.x - racketTop.x >= 45) {
        this.speedX = 0;
      } else if (this.x - racketTop.x >= 80) {
        this.speedX = 5;
      } else if (this.x - racketTop.x >= 60) {
        this.speedX = 3;
      } else if (this.x - racketTop.x > 55) {
        this.speedX = 1;
      } else if (this.x - racketTop.x <= 20) {
        this.speedX = -5;
      } else if (this.x - racketTop.x <= 40) {
        this.speedX = -3;
      } else if (this.x - racketTop.x < 45) {
        this.speedX = -1;
      }
      this.speedY *= -1;
    }

    if ((this.y - racketBottom.y >= 0 && this.y - racketBottom.y <= 10) &&
      this.x > racketBottom.x && this.x < racketBottom.x + racketBottom.width) {
      if (this.x - racketBottom.x <= 55 && this.x - racketBottom.x >= 45) {
        this.speedX = 0;
      } else if (this.x - racketBottom.x >= 80) {
        this.speedX = 5;
      } else if (this.x - racketBottom.x >= 60) {
        this.speedX = 3;
      } else if (this.x - racketBottom.x > 55) {
        this.speedX = 1;
      } else if (this.x - racketBottom.x <= 20) {
        this.speedX = -5;
      } else if (this.x - racketBottom.x <= 40) {
        this.speedX = -3;
      } else if (this.x - racketBottom.x < 45) {
        this.speedX = -1;
      }
      this.speedY *= -1;
    }
  }
};

class Rackets {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.score = 0;
  }

  draw(racket) {
    context.drawImage(racket, this.x, this.y, 100, 20);
  }

  drawScore() {
    context.fillStyle='white';
    if (this. y < 100) {
      context.fillText(`:${this.score}`, 70, 50);
    } else {
      context.fillText(`:${this.score}`, 70, 770);
    }
    context.font='30px sans-serif';
  }

  move(left, right) {
    if (left) {
      this.x -= 5;
    }
    if (right) {
      this.x += 5;
    }
    if (this.x <= 0) {
      this.x = 0;
    }
    if (this.x + this.width >= fieldWidth) {
      this.x = fieldWidth - this.width;
    }
  }
}

const racketTop = new Rackets(fieldWidth / 2 - 50, 85, 100, 15);
const racketBottom = new Rackets(fieldWidth / 2 - 50, 700, 100, 15);

let leftRacketBottom = false;
let rightRacketBottom = false;
let leftRacketTop = false;
let rightRacketTop = false;

document.addEventListener('keydown', evt => {
  if (evt.code === 'ArrowLeft') {
    leftRacketBottom = true;
  }

  if (evt.code === 'ArrowRight') {
    rightRacketBottom = true;
  }

  if (evt.code === 'KeyA') {
    leftRacketTop = true;
  }

  if (evt.code === 'KeyD') {
    rightRacketTop = true;
  }
});

document.addEventListener('keyup', evt => {
  if (evt.code === 'ArrowLeft') {
    leftRacketBottom = false;
  }

  if (evt.code === 'ArrowRight') {
    rightRacketBottom = false;
  }

  if (evt.code === 'KeyA') {
    leftRacketTop = false;
  }

  if (evt.code === 'KeyD') {
    rightRacketTop = false;
  }
});

function render() {
  context.clearRect(0, 0, fieldWidth, fieldHeight);
  ball.checkCollision(racketTop, racketBottom);
  ball.draw();
  ball.move();
  racketTop.drawScore();
  racketBottom.drawScore();
  racketTop.draw(racketImgTop);
  racketBottom.draw(racketImgBottom);
  racketTop.move(leftRacketTop, rightRacketTop);
  racketBottom.move(leftRacketBottom, rightRacketBottom);
  requestAnimationFrame(render);
}

ball.setSpeedY(5);

render();
