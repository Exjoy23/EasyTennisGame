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
  speedY: 10,
  timer: 5,

  setTimer() {
    setInterval(() => {
      this.timer--;
    }, 1000);
  },

  checkTimer() {
    if (this.timer < 0) {
      this.speedX = 0;
      this.speedY = 0;
      this.timer = 0;
    }
  },

  drawTimer() {
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fillText(this.timer, 330, 50);
    context.fillText(this.timer, 330, 770);
    context.font = '30px sans-serif';
  },

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

  setScore: function (racketTop, racketBottom) {
    if (this.y - this.radius > fieldHeight || this.y + this.radius < 0) {
      if (this.y - this.radius > fieldHeight) {
        racketTop.score++;
      } else {
        racketBottom.score++;
      }
      racketTop.x = fieldWidth / 2 - 50;
      racketTop.y = fieldHeight / 2 - (fieldHeight / 2) + 50;
      racketBottom.x = fieldWidth / 2 - 50;
      racketBottom.y = fieldHeight / 2 + (fieldHeight / 2) - 100;
      this.x = fieldWidth / 2;
      this.y = fieldHeight / 2;
      this.speedX = 0;
    }
  },

  checkCollisionWithRacket: function (racket) {
    if (this.x - racket.x <= 55 && this.x - racket.x >= 45) {
      this.speedX = 0;
    } else if (this.x - racket.x >= 90) {
      this.speedX = 6;
    } else if (this.x - racket.x >= 80) {
      this.speedX = 5;
    } else if (this.x - racket.x >= 70) {
      this.speedX = 4;
    } else if (this.x - racket.x >= 60) {
      this.speedX = 3;
    } else if (this.x - racket.x > 55) {
      this.speedX = 1;
    } else if (this.x - racket.x <= 10) {
      this.speedX = -6;
    } else if (this.x - racket.x <= 20) {
      this.speedX = -5;
    } else if (this.x - racket.x <= 30) {
      this.speedX = -4;
    } else if (this.x - racket.x <= 40) {
      this.speedX = -3;
    } else if (this.x - racket.x < 45) {
      this.speedX = -1;
    }
  },

  checkCollision: function (racketTop, racketBottom) {
    if (this.x > fieldWidth - this.radius || this.x < this.radius) {
      switch (this.speedX) {
        case 6:
          this.speedX = -6;
          break;
        case 5:
          this.speedX = -5;
          break;
        case 4:
          this.speedX = -4;
          break;
        case 3:
          this.speedX = -3;
          break;
        case 1:
          this.speedX = -1;
          break;
        case -6:
          this.speedX = 6;
          break;
        case -5:
          this.speedX = 5;
          break;
        case -4:
          this.speedX = 4;
          break;
        case -3:
          this.speedX = 3;
          break;
        case -1:
          this.speedX = 1;
          break;
      }
    }

    if ((this.y - racketTop.height - racketTop.y <= 0 && this.y - racketTop.height - racketTop.y >= -10) &&
      this.x > racketTop.x && this.x < racketTop.x + racketTop.width) {
      this.checkCollisionWithRacket(racketTop);
      this.speedY = 10;
    }

    if ((this.y - racketBottom.y - racketBottom.height / 5 >= 0 && this.y - racketBottom.y - racketBottom.height / 5 <= 30) &&
      this.x > racketBottom.x && this.x < racketBottom.x + racketBottom.width) {
      this.checkCollisionWithRacket(racketBottom);
      this.speedY = -10;
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
    context.drawImage(racket, this.x, this.y, 100, 50);
  }

  drawScore() {
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    if (this.y < 400) {
      context.fillText(`:${this.score}`, 70, 50);
    } else {
      context.fillText(`:${this.score}`, 70, 770);
    }
    context.font = '30px sans-serif';
  }

  move(left, right, up, bottom) {
    if (left) {
      this.x -= 5;
    }

    if (right) {
      this.x += 5;
    }

    if (up) {
      this.y -= 5;
    }

    if (bottom) {
      this.y += 5;
    }

    if (this.x <= 0) {
      this.x = 0;
    }

    if (this.x + this.width >= fieldWidth) {
      this.x = fieldWidth - this.width;
    }
  }
}

function checkCollisionWithField(racketTop, racketBottom) {
  if (racketTop.y > fieldHeight / 2 - 50) {
    racketTop.y = fieldHeight / 2 - 50;
  } else if (racketTop.y < 5) {
    racketTop.y = 5;
  }

  if (racketBottom.y < fieldHeight / 2 + 10) {
    racketBottom.y = fieldHeight / 2 + 10;
  } else if (racketBottom.y + 30 > fieldHeight) {
    racketBottom.y = fieldHeight - 30;
  }
}

const racketTop = new Rackets(fieldWidth / 2 - 50, 85, 100, 15);
const racketBottom = new Rackets(fieldWidth / 2 - 50, 700, 100, 15);

let leftRacketBottom = false;
let rightRacketBottom = false;
let upRacketBottom = false;
let downRacketBottom = false;
let leftRacketTop = false;
let rightRacketTop = false;
let upRacketTop = false;
let downRacketTop = false;

document.addEventListener('keydown', evt => {
  if (evt.code === 'ArrowLeft') {
    leftRacketBottom = true;
  }

  if (evt.code === 'ArrowRight') {
    rightRacketBottom = true;
  }

  if (evt.code === 'ArrowUp') {
    upRacketBottom = true;
  }

  if (evt.code === 'ArrowDown') {
    downRacketBottom = true;
  }

  if (evt.code === 'KeyA') {
    leftRacketTop = true;
  }

  if (evt.code === 'KeyD') {
    rightRacketTop = true;
  }

  if (evt.code === 'KeyW') {
    upRacketTop = true;
  }

  if (evt.code === 'KeyS') {
    downRacketTop = true;
  }
});

document.addEventListener('keyup', evt => {
  if (evt.code === 'ArrowLeft') {
    leftRacketBottom = false;
  }

  if (evt.code === 'ArrowRight') {
    rightRacketBottom = false;
  }

  if (evt.code === 'ArrowUp') {
    upRacketBottom = false;
  }

  if (evt.code === 'ArrowDown') {
    downRacketBottom = false;
  }

  if (evt.code === 'KeyA') {
    leftRacketTop = false;
  }

  if (evt.code === 'KeyD') {
    rightRacketTop = false;
  }

  if (evt.code === 'KeyW') {
    upRacketTop = false;
  }

  if (evt.code === 'KeyS') {
    downRacketTop = false;
  }
});

function render() {
  context.clearRect(0, 0, fieldWidth, fieldHeight);
  ball.checkTimer();
  ball.checkCollision(racketTop, racketBottom);
  ball.setScore(racketTop, racketBottom);
  ball.draw();
  ball.move();
  checkCollisionWithField(racketTop, racketBottom);
  ball.drawTimer();
  racketTop.drawScore();
  racketTop.draw(racketImgTop);
  racketTop.move(leftRacketTop, rightRacketTop, upRacketTop, downRacketTop);
  racketBottom.drawScore();
  racketBottom.draw(racketImgBottom);
  racketBottom.move(leftRacketBottom, rightRacketBottom, upRacketBottom, downRacketBottom);
  requestAnimationFrame(render);
}

// ball.setSpeedY(5);
ball.setTimer();

render();
