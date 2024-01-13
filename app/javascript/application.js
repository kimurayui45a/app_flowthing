// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"
import "./custom/header"
import { fabric } from 'fabric';
import iro from "@jaames/iro";



console.log('アプリケーションjs')

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.fabric')) {
  setupfabricCanvas6();
  }
});

function setupfabricCanvas6() {
  var fabricCanvas6 = new fabric.Canvas('fabricCanvas6');
  //モード切り替え用の変数(currentMode)
  var currentMode = 'pen';
  var currentColor = 'black';
  var penToolButton = document.getElementById('usePenTool');
  var eraserToolButton = document.getElementById('useEraserTool');
  var rectangleToolButton = document.getElementById('useRectangleTool');
  let currentSelectedBox = null;

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
    fabricCanvas6.freeDrawingBrush.color = currentColor;
    fabricCanvas6.freeDrawingBrush.width = parseFloat(document.getElementById('brushSizePicker').value);
    updateSizePreview(fabricCanvas6.freeDrawingBrush.width, 'brushSizePreview', 'brushSizeValue');
  }

  // 消しゴムモード
  function initializeEraser() {
    fabricCanvas6.freeDrawingBrush.color = "white"; // キャンバスの背景色に合わせる
    fabricCanvas6.freeDrawingBrush.width = parseFloat(document.getElementById('eraserSizePicker').value);
    updateSizePreview(fabricCanvas6.freeDrawingBrush.width, 'eraserSizePreview', 'eraserSizeValue');
  }

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
    fabricCanvas6.add(rect);
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
    fabricCanvas6.freeDrawingBrush.color = currentColor;
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

  // ボタンのスタイル更新関数
  function updateStyles() {
    selectColorModeButton.style.backgroundColor = mode === 'selectcolor' ? 'blue' : '';
    dropperColorModeButton.style.backgroundColor = mode === 'droppercolor' ? 'blue' : '';
    deleteColorModeButton.style.backgroundColor = mode === 'deletecolor' ? 'blue' : '';
  }

  // 初期状態のボタンスタイルを設定
  updateStyles();


  // フリーハンド描画モードの有効化
  fabricCanvas6.isDrawingMode = true;
  initializeBrush();

  // ブラシサイズのスライダー
  document.getElementById('brushSizePicker').addEventListener('input', function(event) {
    if (currentMode === 'pen') {
      var size = parseFloat(event.target.value);
      fabricCanvas6.freeDrawingBrush.width = size;
      updateSizePreview(size, 'brushSizePreview', 'brushSizeValue');
    }
  });

  // 消しゴムサイズのスライダー
  document.getElementById('eraserSizePicker').addEventListener('input', function(event) {
    if (currentMode === 'eraser') {
      var size = parseFloat(event.target.value);
      fabricCanvas6.freeDrawingBrush.width = size;
      updateSizePreview(size, 'eraserSizePreview', 'eraserSizeValue');
    }
  });

  // ボタンのスタイル更新関数
  function updateButtonStyles() {
    penToolButton.style.backgroundColor = currentMode === 'pen' ? 'blue' : '';
    eraserToolButton.style.backgroundColor = currentMode === 'eraser' ? 'blue' : '';
    rectangleToolButton.style.backgroundColor = currentMode === 'rectangle' ? 'blue' : '';
  }

  // ペンツールモードの切り替え
  penToolButton.addEventListener('click', function() {
    currentMode = 'pen';
    fabricCanvas6.isDrawingMode = true;
    initializeBrush();
    updateButtonStyles();
  });

  // 消しゴムモードの切り替え
  eraserToolButton.addEventListener('click', function() {
    currentMode = 'eraser';
    fabricCanvas6.isDrawingMode = true;
    initializeEraser();
    updateButtonStyles();
  });

  // 図形描画モードの切り替え
  rectangleToolButton.addEventListener('click', function() {
    currentMode = 'rectangle';
    fabricCanvas6.isDrawingMode = false;
    drawRectangle();
    updateButtonStyles();
  });

  // 初期状態のボタンスタイルを設定
  updateButtonStyles();
}



document.querySelectorAll('.usericonColor').forEach(function(element) {
    element.addEventListener('click', function(e) {
        var selectedColor = e.target.style.backgroundColor;
        document.getElementById('userselectColor').style.backgroundColor = selectedColor;
    });
});
document.getElementById('usercolorPalette').addEventListener('input', function(e) {
  var selectedColor = e.target.value;
  document.getElementById('userselectColor').style.backgroundColor = selectedColor;
});

