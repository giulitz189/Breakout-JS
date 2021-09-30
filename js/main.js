var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var stars = [];

function Star(x, y) {
  this.posX = x;
  this.posY = y;
  this.time = 0;
}

Star.prototype.draw = function () {
  var lenght, width = 0;
  if (this.time >= 0 && this.time < 100) {
    lenght = 6 * (this.time / 100);
    width = this.time / 100;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.posX, this.posY - lenght);
    ctx.lineTo(this.posX + width, this.posY - width);
    ctx.lineTo(this.posX + lenght, this.posY);
    ctx.lineTo(this.posX + width, this.posY + width);
    ctx.lineTo(this.posX, this.posY + lenght);
    ctx.lineTo(this.posX - width, this.posY + width);
    ctx.lineTo(this.posX - lenght, this.posY);
    ctx.lineTo(this.posX - width, this.posY - width);
    ctx.closePath();
    ctx.fill();
  } else if (this.time >= 100 && this.time < 200) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.posX, this.posY - 6);
    ctx.lineTo(this.posX + 1, this.posY - 1);
    ctx.lineTo(this.posX + 6, this.posY);
    ctx.lineTo(this.posX + 1, this.posY + 1);
    ctx.lineTo(this.posX, this.posY + 6);
    ctx.lineTo(this.posX - 1, this.posY + 1);
    ctx.lineTo(this.posX - 6, this.posY);
    ctx.lineTo(this.posX - 1, this.posY - 1);
    ctx.closePath();
    ctx.fill();
  } else if (this.time >= 200 && this.time < 300) {
    lenght = 6 * ((300 - this.time) / 100);
    width = (300 - this.time) / 100;

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.posX, this.posY - lenght);
    ctx.lineTo(this.posX + width, this.posY - width);
    ctx.lineTo(this.posX + lenght, this.posY);
    ctx.lineTo(this.posX + width, this.posY + width);
    ctx.lineTo(this.posX, this.posY + lenght);
    ctx.lineTo(this.posX - width, this.posY + width);
    ctx.lineTo(this.posX - lenght, this.posY);
    ctx.lineTo(this.posX - width, this.posY - width);
    ctx.closePath();
    ctx.fill();
  }
};

Star.prototype.update = function () {
  this.time++;
};

// Breakout title text
var titleElem;
function createTitleText() {
  titleElem = document.createElement("h1");
  var title = document.createTextNode("Breakout");
  titleElem.appendChild(title);

  // CSS Styling
  titleElem.style.position = "absolute";
  titleElem.style.left = "130px";
  titleElem.style.top = "20px";
  titleElem.style.color = "#b6bdaa";
  titleElem.style.fontFamily = "Consolas";
  titleElem.style.fontSize = "65px";
  titleElem.style.textShadow = "0 1px 0 #ccc, \
                                0 2px 0 #c9c9c9, \
                                0 3px 0 #bbb, \
                                0 4px 0 #b9b9b9, \
                                0 5px 0 #aaa, \
                                0 6px 1px rgba(0,0,0,.1), \
                                0 0 5px rgba(0,0,0,.1), \
                                0 1px 3px rgba(0,0,0,.3), \
                                0 3px 5px rgba(0,0,0,.2), \
                                0 5px 10px rgba(0,0,0,.25), \
                                0 10px 10px rgba(0,0,0,.2), \
                                0 20px 20px rgba(0,0,0,.15)";
  titleElem.style.transform = "perspective(100px) rotateX(20deg)";
  titleElem.style.animationName = "textBounceInDown";
  titleElem.style.animationDuration = "2s";

  var scrContent = document.getElementById("screenContent");
  scrContent.insertBefore(titleElem, canvas);
}

// Options buttons
function initButtonStyle(btn, no) {
  btn.style.position = "absolute";
  switch (no) {
    default: break;
    case 1:
      btn.style.left = "195px";
      btn.style.top = "245px";
      break;
    case 2:
      btn.style.left = "195px";
      btn.style.top = "351px";
      break;
    case 3:
      btn.style.left = "195px";
      btn.style.top = "192px";
      break;
    case 4:
      btn.style.left = "195px";
      btn.style.top = "298px";
      break;
    case 5:
      btn.style.left = "195px";
      btn.style.top = "404px";
      break;
  }
  btn.style.width = "130px";
  btn.style.height = "46px";

  btn.style.textAlign = "center";
  btn.style.fontSize = "20px";
  btn.style.borderRadius = "12px";
  btn.style.border = "2px solid yellow";

  btn.style.animationName = "buttonBounceIn";
  btn.style.animationDuration = "2s";
}

var btn_play, btn_edit;
var play_pressed = false;
var edit_pressed = false;
function createButtons() {
  btn_play = document.createElement("button");
  btn_play.setAttribute("class", "menu_button");
  var play_text = document.createTextNode("Play");
  btn_play.appendChild(play_text);
  initButtonStyle(btn_play, 1);
  btn_play.onclick = function () {
    fade_out_stars = true;
    play_pressed = true;
  };

  btn_edit = document.createElement("button");
  btn_edit.setAttribute("class", "menu_button");
  var edit_text = document.createTextNode("Edit");
  btn_edit.appendChild(edit_text);
  initButtonStyle(btn_edit, 2);
  btn_edit.onclick = function () {
    edit_pressed = true;
  };

  var scrContent = document.getElementById("screenContent");
  scrContent.insertBefore(btn_play, canvas);
  scrContent.insertBefore(btn_edit, canvas);
}

var btn_create, btn_playcustom, btn_back;
var create_pressed = false;
var playcustom_pressed = false;
var back_pressed = false;
function createEditMenuButtons() {
  btn_create = document.createElement("button");
  btn_create.setAttribute("class", "menu_button");
  var create_text = document.createTextNode("Create");
  btn_create.appendChild(create_text);
  initButtonStyle(btn_create, 3);
  btn_create.onclick = function () {
    fade_out_stars = true;
    create_pressed = true;
  };

  btn_playcustom = document.createElement("button");
  btn_playcustom.setAttribute("class", "menu_button");
  var playcustom_text = document.createTextNode("Play Custom");
  btn_playcustom.appendChild(playcustom_text);
  initButtonStyle(btn_playcustom, 4);
  btn_playcustom.onclick = function () {
    playcustom_pressed = true;
  };

  btn_back = document.createElement("button");
  btn_back.setAttribute("class", "menu_button");
  var back_text = document.createTextNode("Back");
  btn_back.appendChild(back_text);
  initButtonStyle(btn_back, 5);
  btn_back.onclick = function () {
    back_pressed = true;
  };

  var scrContent = document.getElementById("screenContent");
  scrContent.insertBefore(btn_create, canvas);
  scrContent.insertBefore(btn_playcustom, canvas);
  scrContent.insertBefore(btn_back, canvas);
}

var fade_out_stars = false;
function twinkling_stars() {
  // creating new stars
  if (!fade_out_stars) {
    var new_star_prob = Math.floor(Math.random() * 101);
    if (new_star_prob > 85) {
      var x = Math.floor(Math.random() * (canvas.width + 1));
      var y = Math.floor(Math.random() * (canvas.height + 1));
      var new_star = new Star(x, y);
      stars.unshift(new_star);
    }
  }

  // draw stars
  for (i = 0; i < stars.length; i++) {
    stars[i].draw();
    stars[i].update();
    if (stars[i].time >= 300) {
      stars.pop();
    }
  }
}

// UNDONE: add resizeable canvas
var title_loaded = false;
var buttons_loaded = false;
var fade_out_elems = 0;
var jsonTable;
var selectingFile = false;
function main_menu_loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background animation
  if (!(fade_out_stars && stars.length <= 0)) {
    twinkling_stars();
  }

  // foreground animation
  if (!title_loaded) {
    createTitleText();
    title_loaded = true;
  }
  if (!buttons_loaded) {
    createButtons();
    buttons_loaded = true;
  }

  if (!selectingFile && playcustom_pressed && !fade_out_stars) {
    selectingFile = true;

    var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
    openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.list;
    openPicker.fileTypeFilter.replaceAll([".btf"]);

    openPicker.pickSingleFileAsync().then(function (file) {
      if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          jsonTable = JSON.parse(reader.result);

          // typecheck on file content
          var typecheck_passed = true;
          if (Array.isArray(jsonTable) && jsonTable.length == 13) {
            var i = 0;
            while (i < 13 && typecheck_passed) {
              if (Array.isArray(jsonTable[i]) && jsonTable[i].length == 16) {
                var j = 0;
                while (j < 16 && typecheck_passed) {
                  if (jsonTable[i][j] < 0 || jsonTable[i][j] > 10) {
                    typecheck_passed = false;
                  } else j++;
                }
              } else typecheck_passed = false;
              i++;
            }
          } else typecheck_passed = false;

          if (typecheck_passed) fade_out_stars = true;
          else playcustom_pressed = false;

          selectingFile = false;
        }
        reader.readAsText(file);
      }
    });
  }

  // main menu closing
  if (fade_out_stars || edit_pressed || back_pressed) {
    if (fade_out_elems <= 100) {
      var ratio = 1 - (fade_out_elems / 100);

      if (fade_out_stars) {
        titleElem.style.opacity = ratio;
      }
      if (play_pressed || edit_pressed) {
        btn_play.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";
        btn_edit.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";
      } else if (create_pressed || playcustom_pressed || back_pressed) {
        btn_create.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";
        btn_playcustom.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";
        btn_back.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";
      }

      fade_out_elems += 5;
    }
  }

  if (edit_pressed) {
    btn_play.parentNode.removeChild(btn_play);
    btn_edit.parentNode.removeChild(btn_edit);
    fade_out_elems = 0;

    edit_pressed = false;
    createEditMenuButtons();
  }

  if (back_pressed) {
    btn_create.parentNode.removeChild(btn_create);
    btn_playcustom.parentNode.removeChild(btn_playcustom);
    btn_back.parentNode.removeChild(btn_back);
    fade_out_elems = 0;

    back_pressed = false;
    buttons_loaded = false;
  }

  if (fade_out_stars && stars.length <= 0) {
    titleElem.parentNode.removeChild(titleElem);
    title_loaded = false;
    fade_out_stars = false;

    if (play_pressed) {
      btn_play.parentNode.removeChild(btn_play);
      btn_edit.parentNode.removeChild(btn_edit);
      buttons_loaded = false;
      fade_out_elems = 0;

      play_pressed = false;
      newGame(0, null);
    }
    if (create_pressed || playcustom_pressed) {
      btn_create.parentNode.removeChild(btn_create);
      btn_playcustom.parentNode.removeChild(btn_playcustom);
      btn_back.parentNode.removeChild(btn_back);
      buttons_loaded = false;
      fade_out_elems = 0;

      if (create_pressed) {
        create_pressed = false;
        edit_screen_init();
      } else {
        playcustom_pressed = false;
        newGame(1, jsonTable);
      }
    }
  } else requestAnimationFrame(main_menu_loop);
}

main_menu_loop();