const boby = document.querySelector('body');
const btnEnd = document.querySelector('.popup-btn.end');
const btnStart = document.querySelector('.popup-btn.start');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'); // определяем контекста рендеринга canvas
let box = 32; // размер одной клетки поля;
let scope = 0; // общий счет
let dir; // направление
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

const backgroundImg = new Image();
backgroundImg.src = '../img/game.png';

const foodImg = new Image();
foodImg.src = '../img/apple.svg';

document.addEventListener('keydown', directionSnake);

function directionSnake(e) {
  const keyCode = e.keyCode;
  // Напраавление змейки
  if (keyCode === 37 && dir !== 'right') {
    dir = 'left';
  } else if (keyCode === 38 && dir !== 'down') {
    dir = 'up';
  } else if (keyCode === 39 && dir !== 'left') {
    dir = 'right';
  } else if (keyCode === 40 && dir !== 'up') {
    dir = 'down';
  }
}

function killSelf(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x === arr[i].x && head.y === arr[i].y) {
      clearInterval(game);
      boby.classList.add('end');
    }
  }
}

function drawGame() {
  ctx.drawImage(backgroundImg, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'green' : 'orange';
    ctx.fillRect(snake[i].x, snake[i].y, box, box); // Создание квадрата (тело змейки)
  }

  ctx.fillStyle = '#fff';
  ctx.font = '35px Arial';
  ctx.fillText(scope, box * 2.3, box * 1.55);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Змейка съела яблочко
  if (snakeX === food.x && snakeY === food.y) {
    scope++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17) {
    clearInterval(game);
    boby.classList.add('end');
  }

  if (dir === 'left') snakeX -= box;
  if (dir === 'right') snakeX += box;
  if (dir === 'up') snakeY -= box;
  if (dir === 'down') snakeY += box;

  let headSnake = {
    x: snakeX,
    y: snakeY
  };

  killSelf(headSnake, snake);

  snake.unshift(headSnake);
}

let game = setInterval(drawGame, 100);

// Кнопка сброса
btnEnd.addEventListener('click', () => {
  boby.classList.remove('end');
  location.reload();
});
