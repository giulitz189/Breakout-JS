// Initialization
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const FIXED_SPEED = 3;

// Block colors definition
var no_color = { norm: "#000000", light: "#000000", dark: "#000000" };
var grey = { norm: "#9C9C9E", light: "#E8E8EA", dark: "#838384" };
var red = { norm: "#E51600", light: "#FF1900", dark: "#7F0C00" };
var yellow = { norm: "#E3D803", light: "#FDF003", dark: "#7D7701" };
var blue = { norm: "#0061E1", light: "#006CFB", dark: "#00357B" };
var purple = { norm: "#E522E4", light: "#FF26FD", dark: "#7F137E" };
var green = { norm: "#00BD04", light: "#00D705", dark: "#005702" };
var white = { norm: "#D7D7D7", light: "#F1F1F1", dark: "#717171" };
var orange = { norm: "#E58201", light: "#FF9001", dark: "#7F4800" };
var azure = { norm: "#00CFE5", light: "#00E6FF", dark: "#00737F" };
var brass = { norm: "#A69104", light: "#C0A705", dark: "#403082" };

var bcols = [no_color, grey, red, yellow, blue, purple, green, white, orange, azure, brass];

// Brick wall definition
var brickRowCount = 16;
var brickColumnCount = 13;
var brickWidth = 40;
var brickHeight = 20;
var brickOffsetH = 40;

// Brick definition
var level_phase;
var elemRatio = 10;
function drawBricks() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      if (brickwall.bricks[c][r].status == 1) {
        var brickX = c * brickWidth;
        var brickY = (r * brickHeight) + brickOffsetH;
        brickwall.bricks[c][r].x = brickX;
        brickwall.bricks[c][r].y = brickY;
        var b = brickwall.bricks[c][r];

        var palette = b.color;

        // Brick center part
        ctx.beginPath();
        ctx.fillStyle = bcols[palette].norm;
        switch (level_phase) {
          default: break;
          case 1, 2:
            var currX = b.x + elemRatio;
            var currY = b.y + elemRatio;
            var currWidth = brickWidth - (2 * elemRatio);
            var currHeight = brickHeight - (2 * elemRatio);
            var currPosOffset = 0.4 * (10 - elemRatio);
            var currSizeOffset = 0.8 * (10 - elemRatio);
            ctx.rect(currX + currPosOffset, currY + currPosOffset, currWidth - currSizeOffset, currHeight - currSizeOffset);
            break;
          case 0:
            ctx.rect(b.x + 4, b.y + 4, brickWidth - 8, brickHeight - 8);
        }
        ctx.fill();
        ctx.closePath();

        // Top edge
        ctx.beginPath();
        ctx.fillStyle = bcols[palette].light;
        switch (level_phase) {
          default: break;
          case 1, 2:
            var currX = b.x + elemRatio;
            var currY = b.y + elemRatio;
            var currWidth = brickWidth - (2 * elemRatio);
            var currPosOffset = 0.4 * (10 - elemRatio);
            ctx.moveTo(currX + currPosOffset, currY + currPosOffset);
            ctx.lineTo(currX, currY);
            ctx.lineTo(currX + currWidth, currY);
            ctx.lineTo(currX + currWidth - currPosOffset, currY + currPosOffset);
            break;
          case 0:
            ctx.moveTo(b.x + 4, b.y + 4);
            ctx.lineTo(b.x, b.y);
            ctx.lineTo(b.x + brickWidth, b.y);
            ctx.lineTo(b.x + brickWidth - 4, b.y + 4);
        }
        ctx.closePath();
        ctx.fill();

        // Right edge
        ctx.beginPath();
        ctx.fillStyle = bcols[palette].dark;
        switch (level_phase) {
          default: break;
          case 1, 2:
            var currX = b.x + elemRatio;
            var currY = b.y + elemRatio;
            var currWidth = brickWidth - (2 * elemRatio);
            var currHeight = brickHeight - (2 * elemRatio);
            var currPosOffset = 0.4 * (10 - elemRatio);
            ctx.moveTo(currX + currWidth - currPosOffset, currY + currPosOffset);
            ctx.lineTo(currX + currWidth, currY);
            ctx.lineTo(currX + currWidth, currY + currHeight);
            ctx.lineTo(currX + currWidth - currPosOffset, currY + currHeight - currPosOffset);
            break;
          case 0:
            ctx.moveTo(b.x + brickWidth - 4, b.y + 4);
            ctx.lineTo(b.x + brickWidth, b.y);
            ctx.lineTo(b.x + brickWidth, b.y + brickHeight);
            ctx.lineTo(b.x + brickWidth - 4, b.y + brickHeight - 4);
        }
        ctx.closePath();
        ctx.fill();

        // Bottom edge
        ctx.beginPath();
        ctx.fillStyle = bcols[palette].dark;
        switch (level_phase) {
          default: break;
          case 1, 2:
            var currX = b.x + elemRatio;
            var currY = b.y + elemRatio;
            var currWidth = brickWidth - (2 * elemRatio);
            var currHeight = brickHeight - (2 * elemRatio);
            var currPosOffset = 0.4 * (10 - elemRatio);
            ctx.moveTo(currX + currWidth - currPosOffset, currY + currHeight - currPosOffset);
            ctx.lineTo(currX + currWidth, currY + currHeight);
            ctx.lineTo(currX, currY + currHeight);
            ctx.lineTo(currX + currPosOffset, currY + currHeight - currPosOffset);
            break;
          case 0:
            ctx.moveTo(b.x + brickWidth - 4, b.y + brickHeight - 4);
            ctx.lineTo(b.x + brickWidth, b.y + brickHeight);
            ctx.lineTo(b.x, b.y + brickHeight);
            ctx.lineTo(b.x + 4, b.y + brickHeight - 4);
        }
        ctx.closePath();
        ctx.fill();

        // Left edge
        ctx.beginPath();
        ctx.fillStyle = bcols[palette].light;
        switch (level_phase) {
          default: break;
          case 1, 2:
            var currX = b.x + elemRatio;
            var currY = b.y + elemRatio;
            var currHeight = brickHeight - (2 * elemRatio);
            var currPosOffset = 0.4 * (10 - elemRatio);
            ctx.moveTo(currX + currPosOffset, currY + currPosOffset);
            ctx.lineTo(currX, currY);
            ctx.lineTo(currX, currY + currHeight);
            ctx.lineTo(currX + currPosOffset, currY + currHeight - currPosOffset);
            break;
          case 0:
            ctx.moveTo(b.x + 4, b.y + 4);
            ctx.lineTo(b.x, b.y);
            ctx.lineTo(b.x, b.y + brickHeight);
            ctx.lineTo(b.x + 4, b.y + brickHeight - 4);
        }
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

// Ball definition
var ballRadius = 9;
function drawBall(posX, posY) {
  ctx.beginPath();
  ctx.arc(posX, posY, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "rgba(128, 128, 128, " + (1 - (elemRatio / 10)) + ")";
  ctx.fill();
  ctx.closePath();
}

// Paddle definition
var paddleHeight = 20;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "rgba(0, 149, 221, " + (1 - (elemRatio / 10)) + ")";
  ctx.fill();
  ctx.closePath();
}

// Paddle interaction
var rightPressed = false;
var leftPressed = false;
function mouseClickHandler(e) {
  if (gameStarted == false) {
    gameStarted = true;
    dx = FIXED_SPEED;
    dy = -FIXED_SPEED;
  }
}

var dbOpened = false;
function mouseMoveHandler(e) {
  if (!dbOpened) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }
}

function keyDownHandler(e) {
  if (e.keyCode == 32 && gameStarted == false) {
    gameStarted = true;
    dx = FIXED_SPEED;
    dy = -FIXED_SPEED;
  } else if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 27) {
    dbOpened = true;
    createDialogBox(0);
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("click", mouseClickHandler, false);

// Score tracking
var score;
function drawScore() {
  ctx.font = "20px Consolas";
  ctx.fillStyle = "rgba(0, 149, 221, " + (1 - (elemRatio / 10)) + ")";
  ctx.fillText("Score: " + score, 8, 20);
}

// Lives counter
var lives;
function drawLives() {
  ctx.font = "20px Consolas";
  ctx.fillStyle = "rgba(0, 149, 221, " + (1 - (elemRatio / 10)) + ")";
  ctx.fillText("Lives: " + lives, canvas.width - 95, 20);
}

// Mode 0: classic levels
// Mode 1: custom level
var new_game_started = false;
var loading_bg = 0;
var gameStarted = false;
var currentLV = 1;
var gamemode = -1;
var brickwall;
var currTable;
function newGame(mode, jsonTable) {
  gamemode = mode;
  if (gamemode) currTable = jsonTable;
  brickwall = { remaining: 0, bricks: [] };
  if (!gamemode) generateLevel(currentLV - 1, brickwall, brickColumnCount, brickRowCount);
  else generateCustomLevel(jsonTable, brickwall, brickColumnCount, brickRowCount);
  
  new_game_started = true;
  gameStarted = false;
  level_phase = 1;

  score = 0;
  lives = 3;
  x = canvas.width / 2;
  y = (canvas.height - paddleHeight) - ballRadius;
  dx = 0;
  dy = 0;

  draw_play();
}

// Collision detection
function collisionDetection() {
  for (c = 0; c < brickColumnCount; c++) {
    for (r = 0; r < brickRowCount; r++) {
      var b = brickwall.bricks[c][r];
      if (b.status == 1) {
        var collided = false;

        // Top check
        if (x > b.x && x < b.x + brickWidth && y + ballRadius > b.y && y + ballRadius < b.y + brickHeight && dy > 0) {
          dy = -dy;
          collided = true;
        }

        // Bottom check
        if (x > b.x && x < b.x + brickWidth && y - ballRadius > b.y && y - ballRadius < b.y + brickHeight && dy < 0) {
          dy = -dy;
          collided = true;
        }

        // Left check
        if (y > b.y && y < b.y + brickHeight && x + ballRadius > b.x && x + ballRadius < b.x + brickWidth && dx > 0) {
          dx = -dx;
          collided = true;
        }
        // Right check
        if (y > b.y && y < b.y + brickHeight && x - ballRadius > b.x && x - ballRadius < b.x + brickWidth && dx < 0) {
          dx = -dx;
          collided = true;
        }

        // If collided then...
        if (collided) {
          b.status = 0;
          score += 10;
          brickwall.remaining--;
          if (brickwall.remaining == 0) {
            if (!gamemode && currentLV < 10) {
              currentLV++;
              brickwall = { remaining: 0, bricks: [] };
              generateLevel(currentLV - 1, brickwall, brickColumnCount, brickRowCount);
              level_phase = 1;
              elemRatio = 10;
              gameStarted = false;
              x = canvas.width / 2;
              y = (canvas.height - paddleHeight) - ballRadius;
              dx = 0;
              dy = 0;
              paddleX = (canvas.width - paddleWidth) / 2;
            } else {
              dbOpened = true;
              createDialogBox(1);
            }
          }
        }
      }
    }
  }
}

function initDialogButton(db_btn) {
  db_btn.style.display = "inline-block";
  db_btn.style.width = "80px";
  db_btn.style.height = "30px";
  
  db_btn.style.textAlign = "center";
  db_btn.style.fontSize = "18px";
  db_btn.style.borderRadius = "12px";
  db_btn.style.border = "2px solid red";
}

var dialogBox;
var resume_pressed = false;
var retry_pressed = false;
var exit_pressed = false;
function createDialogBox(game_state) {
  dialogBox = document.createElement("div");

  dialogBox.style.position = "absolute";
  dialogBox.style.background = "rgba(255, 255, 255, 0.4)";

  dialogBox.style.textAlign = "center";
  dialogBox.style.fontFamily = "Consolas";
  dialogBox.style.fontSize = "12px";
  dialogBox.style.borderRadius = "12px";
  dialogBox.style.border = "2px solid red";
    
  dialogBox.style.animationName = "buttonBounceIn";
  dialogBox.style.animationDuration = "1s";

  // Dialogbox skeleton
  var head = document.createElement("h1");
  if (game_state != 0) {
    var score_par = document.createElement("p");
    var score_text = document.createTextNode("Score: " + score);
    score_par.appendChild(score_text);

    var retry_btn = document.createElement("button");
    retry_btn.setAttribute("class", "db_button");
    retry_btn.appendChild(document.createTextNode("Retry"));
  }
  var exit_btn = document.createElement("button");
  exit_btn.setAttribute("class", "db_button");
  exit_btn.appendChild(document.createTextNode("Exit"));

  var scrContent = document.getElementById("screenContent");
  var alert_text;
  switch (game_state) {
    default: break;
    case 0:
      // pause case
      dialogBox.style.left = "170px";
      dialogBox.style.top = "210px";
      dialogBox.style.width = "180px";
      dialogBox.style.height = "120px";

      alert_text = document.createTextNode("Pause");
      head.appendChild(alert_text);
      dialogBox.appendChild(head);

      var resume_btn = document.createElement("button");
      resume_btn.setAttribute("class", "db_button");
      resume_btn.appendChild(document.createTextNode("Resume"));

      initDialogButton(resume_btn);
      resume_btn.onclick = function () {
        resume_pressed = true;
      }
      initDialogButton(exit_btn);
      exit_btn.onclick = function () {
        level_phase = 2;
        closing_curr_game = true;
        exit_pressed = true;
      }
      dialogBox.appendChild(resume_btn);
      dialogBox.appendChild(exit_btn);

      scrContent.insertBefore(dialogBox, canvas);
      break;
    case 1:
      // win case
      dialogBox.style.left = "170px";
      dialogBox.style.top = "195px";
      dialogBox.style.width = "180px";
      dialogBox.style.height = "150px";

      alert_text = document.createTextNode("You Win!");
      head.appendChild(alert_text);
      dialogBox.appendChild(head);
      dialogBox.appendChild(score_par);

      initDialogButton(retry_btn);
      retry_btn.onclick = function () {
        level_phase = 2;
        closing_curr_game = true;
        retry_pressed = true;
      }
      initDialogButton(exit_btn);
      exit_btn.onclick = function () {
        level_phase = 2;
        closing_curr_game = true;
        exit_pressed = true;
      }
      dialogBox.appendChild(retry_btn);
      dialogBox.appendChild(exit_btn);

      scrContent.insertBefore(dialogBox, canvas);
      break;
    case 2:
      // lose case
      dialogBox.style.left = "170px";
      dialogBox.style.top = "195px";
      dialogBox.style.width = "180px";
      dialogBox.style.height = "150px";

      alert_text = document.createTextNode("You Lose!");
      head.appendChild(alert_text);
      dialogBox.appendChild(head);
      dialogBox.appendChild(score_par);

      initDialogButton(retry_btn);
      retry_btn.onclick = function () {
        level_phase = 2;
        closing_curr_game = true;
        retry_pressed = true;
      }
      initDialogButton(exit_btn);
      exit_btn.onclick = function () {
        level_phase = 2;
        closing_curr_game = true;
        exit_pressed = true;
      }
      dialogBox.appendChild(retry_btn);
      dialogBox.appendChild(exit_btn);

      scrContent.insertBefore(dialogBox, canvas);
  }
}

var x = canvas.width / 2;
var y = (canvas.height - paddleHeight) - ballRadius;
var dx = 0;
var dy = 0;
var prevX = 0;
var speed_paddle = 0;
var closing_curr_game = false;
var fade_out_db = 0;
function draw_play() {
  // Drawing phase
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (new_game_started) {
    if (loading_bg <= 10) {
      var opacity = 1 - (loading_bg / 10);
      canvas.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, " + opacity + "), rgba(0, 0, 0, 1)), url('images/css-quilt.png') no-repeat";
      loading_bg++;
    } else if (loading_bg < 20) {
      var opacity = 1 - ((loading_bg - 10) / 10);
      canvas.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, 0), rgba(0, 0, 0, " + opacity + ")), url('images/css-quilt.png') no-repeat";
      loading_bg++;
    } else {
      canvas.style.background = "url('images/css-quilt.png') no-repeat";
      new_game_started = false;
    }
  }

  drawPaddle();
  if (!gameStarted) {
    x = paddleX + (paddleWidth / 2);
  } else {
    speed_paddle = ((paddleX + (paddleWidth / 2)) - prevX) / 40;
  }
  prevX = paddleX + (paddleWidth / 2);
  drawBall(x, y);
  collisionDetection();
  drawBricks();

  switch (level_phase) {
    default: break;
    case 1:
      elemRatio--;
      if (elemRatio == 0) level_phase = 0;
      break;
    case 2:
      if (elemRatio < 10) elemRatio++;
  }

  drawScore();
  drawLives();

  if (!dbOpened || closing_curr_game) {
    // Speed change (ball) and game over conditions
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + ballRadius + dy > canvas.height - paddleHeight) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        dx += speed_paddle;
      } else if (y > canvas.height - paddleHeight && y < canvas.height) {
        if (x + ballRadius > paddleX && x + ballRadius < paddleX + paddleWidth && dx > 0) {
          dx = (speed_paddle > 0) ? dx : -(dx + speed_paddle);
        } else if (x - ballRadius < paddleX + paddleWidth && x + ballRadius < paddleX && dx < 0) {
          dx = (speed_paddle < 0) ? dx : -(dx - speed_paddle);
        }
      }
      if (y + ballRadius + dy >= canvas.height) {
        lives--;
        if (!lives) {
          dbOpened = true;
          createDialogBox(2);
        } else {
          gameStarted = false;
          x = canvas.width / 2;
          y = (canvas.height - paddleHeight) - ballRadius;
          dx = 0;
          dy = 0;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }
    }

    // Speed change (paddle)
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += 9;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 9;
    }

    // Updating ball position
    x += dx;
    y += dy;
  }

  if ((resume_pressed || retry_pressed || exit_pressed) && fade_out_db <= 100) {
    var ratio = 1 - (fade_out_db / 100);

    dialogBox.style.opacity = ratio;
    dialogBox.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";

    fade_out_db += 5;
    if (fade_out_db == 100) {
      dialogBox.parentNode.removeChild(dialogBox);
      dbOpened = false;
      if (resume_pressed) resume_pressed = false;
        fade_out_db = 0;
      }
    }

  if (closing_curr_game) {
    if (loading_bg <= 20 && loading_bg > 10) {
      var opacity = 1 - ((loading_bg - 10) / 10);
      canvas.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, 0), rgba(0, 0, 0, " + opacity + ")), url('images/css-quilt.png') no-repeat";
      loading_bg--;
    } else if (loading_bg <= 10 && loading_bg > 0) {
      var opacity = 1 - (loading_bg / 10);
      canvas.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, " + opacity + "), rgba(0, 0, 0, 1)), url('images/css-quilt.png') no-repeat";
      loading_bg--;
    } else {
      canvas.style.background = "rgba(0, 0, 0, 1)";
    }
  }

  if (closing_curr_game && loading_bg == 0) {
    closing_curr_game = false;
    if (retry_pressed) {
      retry_pressed = false;
      if (!gamemode) newGame(0, null);
      else newGame(1, currTable);
    } else if (exit_pressed) {
      exit_pressed = false;
      main_menu_loop();
    }
  } else requestAnimationFrame(draw_play);
}