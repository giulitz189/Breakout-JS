var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

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

var gridInitialized = false;
var gridContent = [];
function GridBlock(x, y) {
  this.x = x;
  this.y = y;
  this.isEmpty = true;
  this.blockNo = -1;
}

function drawTestGrid() {
  ctx.strokeStyle = "yellow";
  ctx.rect(30, 30, 300, 480);
  ctx.stroke();

  var s = ctx.save();
  ctx.beginPath();
  ctx.translate(0.5, 0.5);
  ctx.setLineDash([1, 2]);
  for (i = 0; i < 13; i++) {
    for (j = 0; j < 16; j++) {
      var x = (i * editorBrickWidth) + 30;
      var y = (j * editorBrickHeight) + 30 + brickHOffset;
      ctx.rect(x, y, editorBrickWidth, editorBrickHeight);

      if (!gridInitialized) {
        var gb = new GridBlock(x, y);
        gridContent.push(gb);
      }
    }
  }
  ctx.stroke();
  ctx.restore(s);

  if (!gridInitialized) gridInitialized = true;
}

var testBlocks = [];
var editorBrickWidth = 23;
var editorBrickHeight = 17;
function SampleBlock(x, y, col) {
  this.X = x;
  this.Y = y;
  this.col = col;
}

var mouseCapture = {};
function initHandlers() {
  mouseCapture = { isCaptured: false, posX: 0, posY: 0, offX: 0, offY: 0, blockNo: -1 };
  canvas.addEventListener("mousedown", function (e) {
    // sample blocks hit test
    var iter = 0;
    while (!mouseCapture.isCaptured && iter < 10) {
      if (e.clientX >= testBlocks[iter].X && e.clientX < testBlocks[iter].X + editorBrickWidth) {
        if (e.clientY >= testBlocks[iter].Y && e.clientY < testBlocks[iter].Y + editorBrickHeight) {
          mouseCapture.isCaptured = true;
          mouseCapture.posX = e.clientX;
          mouseCapture.posY = e.clientY;
          mouseCapture.offX = e.clientX - testBlocks[iter].X;
          mouseCapture.offY = e.clientY - testBlocks[iter].Y;
          mouseCapture.blockNo = testBlocks[iter].col;
        }
      }
      iter++;
    }
    // grid hit test
    iter = 0;
    while (!mouseCapture.isCaptured && iter < gridContent.length) {
      if (!gridContent[iter].isEmpty) {
        if (e.clientX >= gridContent[iter].x && e.clientX < gridContent[iter].x + editorBrickWidth) {
          if (e.clientY >= gridContent[iter].y && e.clientY < gridContent[iter].y + editorBrickHeight) {
            mouseCapture.isCaptured = true;
            mouseCapture.posX = e.clientX;
            mouseCapture.posY = e.clientY;
            mouseCapture.offX = e.clientX - gridContent[iter].x;
            mouseCapture.offY = e.clientY - gridContent[iter].y;
            mouseCapture.blockNo = gridContent[iter].blockNo;
            gridContent[iter].isEmpty = true;
          }
        }
      }
      iter++;
    }
  });
  canvas.addEventListener("mousemove", function (e) {
    if (mouseCapture.isCaptured) {
      mouseCapture.posX = e.clientX;
      mouseCapture.posY = e.clientY;
    }
  });
  canvas.addEventListener("mouseup", function (e) {
    if (mouseCapture.isCaptured) {
      var idx = 0;
      var found = false;
      while (!found && idx < gridContent.length) {
        if (e.clientX >= gridContent[idx].x && e.clientX < gridContent[idx].x + editorBrickWidth &&
            e.clientY >= gridContent[idx].y && e.clientY < gridContent[idx].y + editorBrickHeight) {
          gridContent[idx].blockNo = mouseCapture.blockNo;
          found = true;
          gridContent[idx].isEmpty = false;
        }
        idx++;
      }
      mouseCapture.isCaptured = false;
    }
  });
}

var blocksLoaded = false;
var brickWOffset = 54;
var brickHOffset = 35;
function drawBlock(numpos, mode) {
  var x, y, color_idx;
  /**
   * drawBlock modes
   * 0: sample blocks (drawn on the right)
   * 1: captured block (drag & drop)
   * 2: grid block (blocks already setted on test grid)
   */
  switch (mode) {
    default: break;
    case 0:
      x = 320 + brickWOffset + ((numpos % 2) * (editorBrickWidth + brickWOffset));
      y = 15 + brickHOffset + (Math.floor(numpos / 2) * (editorBrickHeight + brickHOffset));
      color_idx = numpos + 1;
      break;
    case 1:
      x = mouseCapture.posX - mouseCapture.offX;
      y = mouseCapture.posY - mouseCapture.offY;
      color_idx = numpos;
      break;
    case 2:
      x = gridContent[numpos].x;
      y = gridContent[numpos].y;
      color_idx = gridContent[numpos].blockNo;
  }

  // Brick center part
  ctx.beginPath();
  ctx.fillStyle = bcols[color_idx].norm
  ctx.rect(x + 2, y + 2, editorBrickWidth - 4, editorBrickHeight - 4);
  ctx.fill();
  ctx.closePath();

  // Top edge
  ctx.beginPath();
  ctx.fillStyle = bcols[color_idx].light;
  ctx.moveTo(x + 2, y + 2);
  ctx.lineTo(x, y);
  ctx.lineTo(x + editorBrickWidth, y);
  ctx.lineTo(x + editorBrickWidth - 2, y + 2);
  ctx.closePath();
  ctx.fill();

  // Right edge
  ctx.beginPath();
  ctx.fillStyle = bcols[color_idx].dark;
  ctx.moveTo(x + editorBrickWidth - 2, y + 2);
  ctx.lineTo(x + editorBrickWidth, y);
  ctx.lineTo(x + editorBrickWidth, y + editorBrickHeight);
  ctx.lineTo(x + editorBrickWidth - 2, y + editorBrickHeight - 2);
  ctx.closePath();
  ctx.fill();

  // Bottom edge
  ctx.beginPath();
  ctx.fillStyle = bcols[color_idx].dark;
  ctx.moveTo(x + editorBrickWidth - 2, y + editorBrickHeight - 2);
  ctx.lineTo(x + editorBrickWidth, y + editorBrickHeight);
  ctx.lineTo(x, y + editorBrickHeight);
  ctx.lineTo(x + 2, y + editorBrickHeight - 2);
  ctx.closePath();
  ctx.fill();

  // Left edge
  ctx.beginPath();
  ctx.fillStyle = bcols[color_idx].light;
  ctx.moveTo(x + 2, y + 2);
  ctx.lineTo(x, y);
  ctx.lineTo(x, y + editorBrickHeight);
  ctx.lineTo(x + 2, y + editorBrickHeight - 2);
  ctx.closePath();
  ctx.fill();

  if (!blocksLoaded) {
    var sb = new SampleBlock(x, y, color_idx);
    testBlocks.push(sb);
  }
}

function initButtonStyle(btn) {
  btn.style.position = "absolute";

  btn.style.textAlign = "center";
  btn.style.fontSize = "24px";
  btn.style.borderRadius = "12px";
  btn.style.border = "2px solid yellow";
}

var btn_load;
var btn_save;
var btn_reset;
var btn_exit;
var load_pressed = false;
var save_pressed = false;
var reset_pressed = false;
var exit_editor_pressed = false;
function createEditorButtons() {
  // Load button
  btn_load = document.createElement("button");
  btn_load.setAttribute("class", "edit_button");
  var load_text = document.createTextNode("Load");
  btn_load.appendChild(load_text);

  initButtonStyle(btn_load);
  btn_load.style.left = "370px";
  btn_load.style.top = "308px";
  btn_load.style.width = "130px";
  btn_load.style.height = "40px";
  btn_load.onclick = function () {
      load_pressed = true;
  }

  // Save button
  btn_save = document.createElement("button");
  btn_save.setAttribute("class", "edit_button");
  var save_text = document.createTextNode("Save");
  btn_save.appendChild(save_text);

  initButtonStyle(btn_save);
  btn_save.style.left = "370px";
  btn_save.style.top = "366px";
  btn_save.style.width = "130px";
  btn_save.style.height = "40px";
  btn_save.onclick = function () {
      save_pressed = true;
  }

  // Reset Grid button
  btn_reset = document.createElement("button");
  btn_reset.setAttribute("class", "edit_button");
  var reset_text = document.createTextNode("Reset");
  btn_reset.appendChild(reset_text);

  initButtonStyle(btn_reset);
  btn_reset.style.left = "370px";
  btn_reset.style.top = "424px";
  btn_reset.style.width = "130px";
  btn_reset.style.height = "40px";
  btn_reset.onclick = function () {
    reset_pressed = true;
  }

  // Exit button
  btn_exit = document.createElement("button");
  btn_exit.setAttribute("class", "edit_button");
  var exit_text = document.createTextNode("Exit");
  btn_exit.appendChild(exit_text);

  initButtonStyle(btn_exit);
  btn_exit.style.left = "370px";
  btn_exit.style.top = "482px";
  btn_exit.style.width = "130px";
  btn_exit.style.height = "40px";
  btn_exit.onclick = function () {
    closing_editor = true;
    exit_editor_pressed = true;
  }

  // Button insertion in document
  var scrContent = document.getElementById("screenContent");
  scrContent.insertBefore(btn_load, canvas);
  scrContent.insertBefore(btn_save, canvas);
  scrContent.insertBefore(btn_reset, canvas);
  scrContent.insertBefore(btn_exit, canvas);
}

function resetGrid() {
  for (i = 0; i < gridContent.length; i++)
    gridContent[i].isEmpty = true;
}

function readTable(file) {
  // read selected file
  var reader = new FileReader();
  reader.onload = function () {
    var jsonTable = JSON.parse(reader.result);

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

    // replace grid content with file content
    if (typecheck_passed) {
      resetGrid();
      for (col = 0; col < 13; col++) {
        for (row = 0; row < 16; row++) {
          if (jsonTable[col][row] > 0) {
            var idx = (col * 16) + row;
            gridContent[idx].isEmpty = false;
            gridContent[idx].blockNo = jsonTable[col][row];
          }
        }
      }
    }
  }
  reader.readAsText(file);
}

function writeTable() {
  // Convert grid content in JSONArray, then stringify it
  var gridArray = [];
  for (col = 0; col < 13; col++) {
    var colArray = [];
    for (row = 0; row < 16; row++) {
      var idx = (col * 16) + row;
      if (!gridContent[idx].isEmpty)
        colArray.push(gridContent[idx].blockNo);
      else colArray.push(0);
    }
    gridArray.push(colArray);
  }
  var jsonString = JSON.stringify(gridArray);

  // Save data into a new .btf extension file
  var savePicker = new Windows.Storage.Pickers.FileSavePicker();
  savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
  savePicker.fileTypeChoices.insert("Breakout Table File", [".btf"]);
  savePicker.suggestedFileName = "New Breakout Level";

  savePicker.pickSaveFileAsync().then(function (file) {
    if (file) {
      Windows.Storage.CachedFileManager.deferUpdates(file);
      Windows.Storage.FileIO.writeTextAsync(file, jsonString).done(function () {
        Windows.Storage.CachedFileManager.completeUpdatesAsync(file);
      });
    }
  });
}

var background_loaded = false;
var edit_buttons_loaded = false;
var loading_bg;
var closing_editor = false;
function edit_screen_init() {
  gridInitialized = false;
  gridContent = [];
  blocksLoaded = false;
  testBlocks = [];

  edit_buttons_loaded = false;
  background_loaded = false;
  loading_bg = 0;

  load_pressed = false;
  save_pressed = false;
  reset_pressed = false;
  exit_editor_pressed = false;

  closing_editor = false;

  draw_create();
}

var fade_out_editor_elems = 0;
function draw_create() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!background_loaded) {
    if (loading_bg <= 10) {
      var opacity = 1 - (loading_bg / 10);
      canvas.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, " + opacity + "), rgba(0, 0, 0, 1)), url('images/blue-grid-wallpaper-1.jpg') no-repeat";
      loading_bg++;
    } else if (loading_bg < 20) {
      var opacity = 1 - ((loading_bg - 10) / 10);
      canvas.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, 0), rgba(0, 0, 0, " + opacity + ")), url('images/blue-grid-wallpaper-1.jpg') no-repeat";
      loading_bg++;
    } else {
      canvas.style.background = "url('images/blue-grid-wallpaper-1.jpg') no-repeat";
      background_loaded = true;
    }
  }

  // draw static elements (grid & block samples)
  if (!exit_editor_pressed) {
    drawTestGrid();
    for (i = 0; i < 10; i++) drawBlock(i, 0);
  }

  if (!blocksLoaded) {
    initHandlers();
    blocksLoaded = true;
  }

  // draw dynamic elements (already positioned blocks & captured blocks)
  for (i = 0; i < gridContent.length; i++)
    if (!gridContent[i].isEmpty) drawBlock(i, 2);

  if (mouseCapture.isCaptured)
    drawBlock(mouseCapture.blockNo, 1);

  // draw buttons
  if (!edit_buttons_loaded) {
    createEditorButtons();
    edit_buttons_loaded = true;
  }

  // button actions
  if (load_pressed) {
    var openPicker = new Windows.Storage.Pickers.FileOpenPicker();
    openPicker.viewMode = Windows.Storage.Pickers.PickerViewMode.list;
    openPicker.fileTypeFilter.replaceAll([".btf"]);

    openPicker.pickSingleFileAsync().then(function (file) {
      if (file) readTable(file);
    });
    load_pressed = false;
  }

  if (save_pressed) {
    writeTable();
    save_pressed = false;
  }

  if (reset_pressed) {
    resetGrid();
    reset_pressed = false;
  }

  if (exit_editor_pressed) {
    // delete editor buttons
    if (fade_out_editor_elems <= 100) {
      var ratio = 1 - (fade_out_editor_elems / 100);

      btn_load.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";
      btn_save.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";
      btn_reset.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";
      btn_exit.style.transform = "scale3d(" + ratio + ", " + ratio + ", " + ratio + ")";

      fade_out_editor_elems += 5;
      requestAnimationFrame(draw_create);
    } else {
      // fading out background
      if (closing_editor) {
        if (loading_bg <= 20 && loading_bg > 10) {
          var opacity = 1 - ((loading_bg - 10) / 10);
          canvas.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, 0), rgba(0, 0, 0, " + opacity + ")), url('images/blue-grid-wallpaper-1.jpg') no-repeat";
          loading_bg--;
        } else if (loading_bg <= 10 && loading_bg > 0) {
          var opacity = 1 - (loading_bg / 10);
          canvas.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, " + opacity + "), rgba(0, 0, 0, 1)), url('images/blue-grid-wallpaper-1.jpg') no-repeat";
          loading_bg--;
        } else {
          canvas.style.background = "rgba(0, 0, 0, 1)";
          closing_editor = false;
        }
        requestAnimationFrame(draw_create);
      } else {
        fade_out_editor_elems = 0;
        exit_editor_pressed = false;
        main_menu_loop();
      }
    }
  } else requestAnimationFrame(draw_create);
}