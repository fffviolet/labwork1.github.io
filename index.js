const BALLS_COUNT = 25;
const BALL_SIZE_MIN = 10;
const BALL_SIZE_MAX = 20;
const BALL_SPEED_MAX = 7;

class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
}

class Ball extends Shape {
  constructor(x, y, velX, velY, color, size, exists) {
    super(x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size && balls[j].exists) {
          balls[j].color = this.color = randomColor();
        }
      }
    }
  }
}

class EvilCircle1 extends Shape {
    constructor(x, y, exists) {
      super(x, y, exists);

      this.velX = BALL_SPEED_MAX;
      this.velY = BALL_SPEED_MAX;
      this.color = "white";
      this.size = 10;
      this.setControls();
    }

    draw() {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
    }

    checkBounds() {
      if (this.x + this.size >= width) {
        this.x -= this.size;
      }

      if (this.x - this.size <= 0) {
        this.x += this.size;
      }

      if (this.y + this.size >= height) {
        this.y -= this.size;
      }

      if (this.y - this.size <= 0) {
        this.y += this.size;
      }
    }

    setControls() {
      window.onkeydown = (e) => {
        switch (e.key) {
          case "a":
          case "A":
          case "ArrowLeft":
            this.x -= this.velX;
            break;
          case "d":
          case "D":
          case "ArrowRight":
            this.x += this.velX;
            break;
          case "w":
          case "W":
          case "ArrowUp":
            this.y -= this.velY;
            break;
          case "s":
          case "S":
          case "ArrowDown":
            this.y += this.velY;
            break;
        }
      };
    }

    collisionDetect() {
      for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
          const dx = this.x - balls[j].x;
          const dy = this.y - balls[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.size + balls[j].size) {
            balls[j].exists = false;
            count--;
            para.textContent = "还剩 " + count + " 个球";
          }
        }
      }
    }
  }

  class EvilCircle2 extends Shape {
    constructor(x, y, exists) {
      super(x, y, exists);

      this.velX = BALL_SPEED_MAX;
      this.velY = BALL_SPEED_MAX;
      this.color = "white";
      this.size = 10;
      this.setControls();
    }

    draw() {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.stroke();
    }

    checkBounds() {
      if (this.x + this.size >= width) {
        this.x -= this.size;
      }

      if (this.x - this.size <= 0) {
        this.x += this.size;
      }

      if (this.y + this.size >= height) {
        this.y -= this.size;
      }

      if (this.y - this.size <= 0) {
        this.y += this.size;
      }
    }

    setControls() {
        window.onmousemove = (e) => {
            // 根据鼠标位置调整 x 和 y
            this.x = e.clientX;
            this.y = e.clientY;
        };
    }

    collisionDetect() {
      for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
          const dx = this.x - balls[j].x;
          const dy = this.y - balls[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.size + balls[j].size) {
            balls[j].exists = false;
            count--;
            para.textContent = "还剩 " + count + " 个球";
          }
        }
      }
    }
  }

const para = document.querySelector("p");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gao= document.getElementById("gameover");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const balls = [];
let count = 0;

const evilBall1 = new EvilCircle1(
  random(0, width),
  random(0, height),
  true,
);

const evilBall2 = new EvilCircle2(
    random(0, width),
    random(0, height),
    true,
  );

loop();

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  while (balls.length < BALLS_COUNT) {
    const size = random(BALL_SIZE_MIN, BALL_SIZE_MAX);
    const ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
      random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
      randomColor(),
      size,
      true,
    );
    balls.push(ball);
    count++;
    para.textContent = "还剩 " + count + " 个球";
  }

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  evilBall1.draw();
  evilBall1.checkBounds();
  evilBall1.collisionDetect();

  evilBall2.draw();
  evilBall2.checkBounds();
  evilBall2.collisionDetect();

  if (count == 0) {
    gao.textContent = "恭喜你，全部消灭了！";
  }

  requestAnimationFrame(loop);
}