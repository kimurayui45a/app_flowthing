import { fabric } from 'fabric';
import iro from "@jaames/iro";


document.addEventListener("turbo:load", function() {
  if (document.querySelector('.fabric')) {
    setupiconmakingCanvas();
    setupdragPalette();
  }
});

function setupiconmakingCanvas() {
  var iconmakingCanvas = new fabric.Canvas('iconmakingCanvas');
  //モード切り替え用の変数(currentMode)
  var currentMode = 'pen';
  var currentColor = 'black';
  var penToolButton = document.getElementById('usePenTool');
  var eraserToolButton = document.getElementById('useEraserTool');
  var rectangleToolButton = document.getElementById('useRectangleTool');
  let currentSelectedBox = null;
  let lockHistory = false; //Undo/Redo時の描画イベントに反応させないためのフラグ
  const undo_history = [];
  const redo_history = [];
  var textToolButton = document.getElementById('useTextTool');
  // フォントサイズスライダーと値表示用の要素を取得
var fontSizeSlider = document.getElementById('fontSizeSlider');
var fontSizeValue = document.getElementById('fontSizeValue');

  // ブラシサイズプレビューの更新関数
  function updateSizePreview(size, previewId, sizeValueId) {
    var preview = document.getElementById(previewId);
    var newSize = size * 2;
    preview.style.width = newSize + 'px';
    preview.style.height = newSize + 'px';
    preview.style.marginLeft = (50 - newSize) / 2 + 'px';
    preview.style.marginTop = (50 - newSize) / 2 + 'px';
    document.getElementById(sizeValueId).textContent = size;
  }

  // フリーハンド描画のブラシ設定
  function initializeBrush() {
    iconmakingCanvas.freeDrawingBrush.color = currentColor;
    iconmakingCanvas.freeDrawingBrush.width = parseFloat(document.getElementById('brushSizePicker').value);
    updateSizePreview(iconmakingCanvas.freeDrawingBrush.width, 'brushSizePreview', 'brushSizeValue');
  }

  // フォントサイズの更新関数
  function updateFontSize() {
    var size = parseFloat(fontSizeSlider.value);
    fontSizeValue.textContent = size;
  
    var activeObject = iconmakingCanvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      // 'set' メソッドを使用してフォントサイズを設定
      activeObject.set({ fontSize: size });
      iconmakingCanvas.requestRenderAll();
    }
  }

  // 消しゴムモード
  function initializeEraser() {
    iconmakingCanvas.freeDrawingBrush.color = "white"; // キャンバスの背景色に合わせる
    iconmakingCanvas.freeDrawingBrush.width = parseFloat(document.getElementById('eraserSizePicker').value);
    updateSizePreview(iconmakingCanvas.freeDrawingBrush.width, 'eraserSizePreview', 'eraserSizeValue');
  }

  // 図形モード
  function drawRectangle() {
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'transparent', // 内部を透明に設定
      stroke: currentColor, // 枠線の色
      strokeWidth: 2, // 枠線の太さ
      width: 60,
      height: 70,
      angle: 0,
      transparentCorners: false
    });
    iconmakingCanvas.add(rect);
  }

  // テキストモード
  function addText() {
    var text = new fabric.IText('テキストを入力', {
      left: 100,
      top: 100,
      fontFamily: 'Arial',
      fill: currentColor,
      fontSize: 20
    });
    iconmakingCanvas.add(text);
  }

  // iro.js カラーピッカーの初期化
  const colorPicker = new iro.ColorPicker("#picker", {
    width: 150,
    color: "#fff"
  });

  let mode = 'selectcolor';
  var selectColorModeButton = document.getElementById('selectColorMode');
  var dropperColorModeButton = document.getElementById('dropperColorMode');
  var deleteColorModeButton = document.getElementById('deleteColorMode');
  document.getElementById('whiteBox').style.backgroundColor = 'rgb(255, 255, 255)';
  document.getElementById('blackBox').style.backgroundColor = 'rgb(0, 0, 0)';

  document.getElementById('selectColorMode').addEventListener('click', function() {
    mode = 'selectcolor';
    updateStyles();
  });

  document.getElementById('dropperColorMode').addEventListener('click', function() {
    mode = 'droppercolor';
    updateStyles();
  });

  deleteColorModeButton.addEventListener('click', function() {
    mode = 'deletecolor';
    updateStyles();
  });

  const palletboxes = document.querySelectorAll('.palletBox');
  function isSpecialColorBox(box) {
    return box.classList.contains('specialColorBox');
  }

  palletboxes.forEach(palletbox => {
    palletbox.addEventListener('click', function() {
      if (mode === 'droppercolor') {
        // スポイトモード
        // 空のboxの場合、処理を行わない
        if (!palletbox.style.backgroundColor) {
          console.log('空のboxがクリックされました。');
          return;
        }
        currentSelectedBox = palletbox;
        // 有効な色の場合のみ、HEX形式に変換してカラーピッカーに設定
        colorPicker.color.hexString = rgbToHex(palletbox.style.backgroundColor);
      } else if (!isSpecialColorBox(palletbox)) {
        if (mode === 'deletecolor') {
          // 色削除モード
          palletbox.style.backgroundColor = '';
        } else if (mode === 'selectcolor') {
          // 色登録モード
          palletbox.style.backgroundColor = colorPicker.color.hexString;
        }
      }
    });
  });


  colorPicker.on('color:change', function(color) {
    // カラーパレットから選択された色を現在の色として設定
    currentColor = color.hexString;

    // カラーパレットで選択された色を現在選択されているボックスに適用
    if (currentSelectedBox && mode === 'selectcolor') {
      currentSelectedBox.style.backgroundColor = currentColor;
    }

    // 描画モードが 'pen' の場合、キャンバスのブラシの色を更新
    if (currentMode === 'pen') {
      iconmakingCanvas.freeDrawingBrush.color = currentColor;
    }
  });


  // RGB色をHEX形式に変換する関数
  function rgbToHex(rgbColor) {
    if (!rgbColor) {
      console.error('無効な入力: rgbColor が null または undefined です。');
      return null; // または適切なデフォルト値を返す
    }

    var rgb = rgbColor.match(/\d+/g);
    if (!rgb || rgb.length !== 3) {
      console.error('無効な入力: rgbColor 形式が不正です。', rgbColor);
      return null; // または適切なデフォルト値を返す
    }

    function hex(x) {
      var hexDigits = "0123456789abcdef";
      return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }

    return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
  }

  document.addEventListener('click', function(event) {
    // クリックされた要素がボックスでない場合、選択を解除
    if (!event.target.classList.contains('palletBox')) {
      currentSelectedBox = null;
    }
  }, true);

  // テキストツールボタンのイベントリスナー
  textToolButton.addEventListener('click', function() {
    currentMode = 'text';
    iconmakingCanvas.isDrawingMode = false;
    addText();
    updateButtonStyles();
  });

  // フォントサイズスライダーのイベントリスナー
  fontSizeSlider.addEventListener('input', updateFontSize);

  // ボタンのスタイル更新関数
  function updateStyles() {
    selectColorModeButton.style.backgroundColor = mode === 'selectcolor' ? 'blue' : '';
    dropperColorModeButton.style.backgroundColor = mode === 'droppercolor' ? 'blue' : '';
    deleteColorModeButton.style.backgroundColor = mode === 'deletecolor' ? 'blue' : '';
  }

  // 初期状態のボタンスタイルを設定
  updateStyles();


  // フリーハンド描画モードの有効化
  iconmakingCanvas.isDrawingMode = true;
  initializeBrush();
  undo_history.push(JSON.stringify(iconmakingCanvas));

  // ブラシサイズのスライダー
  document.getElementById('brushSizePicker').addEventListener('input', function(event) {
    if (currentMode === 'pen') {
      var size = parseFloat(event.target.value);
      iconmakingCanvas.freeDrawingBrush.width = size;
      updateSizePreview(size, 'brushSizePreview', 'brushSizeValue');
    }
  });

  // 消しゴムサイズのスライダー
  document.getElementById('eraserSizePicker').addEventListener('input', function(event) {
    if (currentMode === 'eraser') {
      var size = parseFloat(event.target.value);
      iconmakingCanvas.freeDrawingBrush.width = size;
      updateSizePreview(size, 'eraserSizePreview', 'eraserSizeValue');
    }
  });

  // ペンと消しゴムの操作の制御
  iconmakingCanvas.on('object:added', function(event) {
    var object = event.target;
    if (object.type === 'path') {
      // パスオブジェクトの場合、変形を無効化
      object.set({
        hasControls: false, // コントロールを非表示
        lockMovementX: true, // X軸移動のロック
        lockMovementY: true, // Y軸移動のロック
        lockRotation: true, // 回転のロック
        lockScalingX: true, // X軸スケーリングのロック
        lockScalingY: true, // Y軸スケーリングのロック
        lockUniScaling: true // 均一スケーリングのロック
      });
    }
  });
  
  // アンドゥとリドゥ
  iconmakingCanvas.on("object:added", function () {
    if (lockHistory) return;
    console.log("object:added");
    undo_history.push(JSON.stringify(iconmakingCanvas));
    redo_history.length = 0;
    console.log(undo_history.length);
  });
  
  iconmakingCanvas.on("object:modified", function () {
    if (lockHistory) return;
    console.log("object:modified");
    undo_history.push(JSON.stringify(iconmakingCanvas));
    redo_history.length = 0;
    console.log(undo_history.length);
  });
  
  function undo() {
    if (undo_history.length > 0) {
      lockHistory = true;
      if (undo_history.length > 1) redo_history.push(undo_history.pop()); //最初の白紙はredoに入れない
      const content = undo_history[undo_history.length - 1];
      iconmakingCanvas.loadFromJSON(content, function () {
        iconmakingCanvas.renderAll();
        lockHistory = false;
      });
    }
  }
  
  function redo() {
    if (redo_history.length > 0) {
      lockHistory = true;
      const content = redo_history.pop();
      undo_history.push(content);
      iconmakingCanvas.loadFromJSON(content, function () {
        iconmakingCanvas.renderAll();
        lockHistory = false;
      });
    }
  }

  // ボタンのスタイル更新関数
  function updateButtonStyles() {
    penToolButton.style.backgroundColor = currentMode === 'pen' ? 'blue' : '';
    eraserToolButton.style.backgroundColor = currentMode === 'eraser' ? 'blue' : '';
    rectangleToolButton.style.backgroundColor = currentMode === 'rectangle' ? 'blue' : '';
    textToolButton.style.backgroundColor = currentMode === 'text' ? 'blue' : '';
  }

  document.getElementById("undo").addEventListener("click", undo);
  document.getElementById("redo").addEventListener("click", redo);

  // 戻ると進むボタン
  document.getElementById("editMode").addEventListener("mouseup", function (e) {
    if (iconmakingCanvas.isDrawingMode) {
      iconmakingCanvas.isDrawingMode = false;
      // clearSelectedButton();
      this.classList.add("selected"); //選択されたボタンはボーダーを太くする
    } else {
      iconmakingCanvas.isDrawingMode = true;
      // clearSelectedButton();
      // lastSelectdColorBtn.classList.add("selected");
      this.classList.remove("selected"); //選択されたボタンはボーダーを太くする
      iconmakingCanvas.discardActiveObject();
      iconmakingCanvas.requestRenderAll();
    }
  });
  
  //deleteボタンの処理
  const deleteBtn = document.getElementById("delete");

  iconmakingCanvas.on("selection:created", function () {
    deleteBtn.removeAttribute("disabled");
  });

  iconmakingCanvas.on("selection:cleared", function () {
    deleteBtn.setAttribute("disabled", true);
  });

  deleteBtn.addEventListener("click", function () {
    deleteSelectedObjects();
  });

  function deleteSelectedObjects() {
    lockHistory = true;
    iconmakingCanvas.getActiveObjects().forEach((element) => {
      iconmakingCanvas.remove(element);
    });
    iconmakingCanvas.discardActiveObject();
    iconmakingCanvas.requestRenderAll();
    undo_history.push(JSON.stringify(iconmakingCanvas)); //UNDO処理
    lockHistory = false;
  }

  //Deteleキーの処理
  document.addEventListener("keyup", function (e) {
    console.log(e.key);
    if ((e.key == 8) | (e.key == 46)) {
      deleteSelectedObjects();
    }
  });

  // ペンツールモードの切り替え
  penToolButton.addEventListener('click', function() {
    currentMode = 'pen';
    iconmakingCanvas.isDrawingMode = true;
    initializeBrush();
    updateButtonStyles();
  });

  // 消しゴムモードの切り替え
  eraserToolButton.addEventListener('click', function() {
    currentMode = 'eraser';
    iconmakingCanvas.isDrawingMode = true;
    initializeEraser();
    updateButtonStyles();
  });

  // 図形描画モードの切り替え
  rectangleToolButton.addEventListener('click', function() {
    currentMode = 'rectangle';
    iconmakingCanvas.isDrawingMode = false;
    drawRectangle();
    updateButtonStyles();
  });

  // 初期状態のボタンスタイルを設定
  updateButtonStyles();
}


// カラーパレットのドラッグ機能
function setupdragPalette() {
  const colorPalette = document.getElementById('colorPalette');
  const dropzone = document.querySelector('.dropzone');

  // colorPalette要素が存在する場合にのみ設定を行う
  if (colorPalette) {
    colorPalette.setAttribute('draggable', 'true');
    colorPalette.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', colorPalette.id);
    });
  }

  // ドロップゾーンの設定は変更なし
  if (dropzone) {
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData('text');
      const draggableElement = document.getElementById(id);
    if (!draggableElement) {
      console.error('ドラッグされた要素が見つかりません。');
      return;
    }
      // ドロップゾーンとカラーパレットのサイズを取得
      const dropzoneRect = dropzone.getBoundingClientRect();
      const paletteRect = draggableElement.getBoundingClientRect();

      // マウスの位置からドロップゾーンの位置を差し引いて、要素の新しい位置を計算
      let newLeft = e.clientX - dropzoneRect.left;
      let newTop = e.clientY - dropzoneRect.top;

      // 移動範囲をドロップゾーン内に制限
      newLeft = Math.min(newLeft, dropzoneRect.width - paletteRect.width);
      newTop = Math.min(newTop, dropzoneRect.height - paletteRect.height);
      newLeft = Math.max(0, newLeft);
      newTop = Math.max(0, newTop);

      // 要素の位置を更新する
      draggableElement.style.left = `${newLeft}px`;
      draggableElement.style.top = `${newTop}px`;
    });
  }
};