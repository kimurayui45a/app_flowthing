// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"
import "./custom/header"
import { fabric } from 'fabric';

console.log('アプリケーションjs')

document.querySelectorAll('.colorOption').forEach(function(element) {
  element.addEventListener('click', function(e) {
      var selectedColor = e.target.style.backgroundColor;
      document.getElementById('selectedColor').style.backgroundColor = selectedColor;
  });
});


// カラーピッカーの要素を取得し、色が選択された際のイベントを追加
document.getElementById('customColorPicker').addEventListener('input', function(e) {
  var selectedColor = e.target.value;
  document.getElementById('selectedColor2').style.backgroundColor = selectedColor;
});


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
      fill: currentColor,
      width: 60,
      height: 70,
      angle: 0,
      transparentCorners: false
    });
    fabricCanvas6.add(rect);
  }

  // カラーピッカーのイベントリスナーを設定
  document.getElementById('brushColorPicker').addEventListener('change', function(event) {
    currentColor = event.target.value;
    if (currentMode === 'pen') {
      fabricCanvas6.freeDrawingBrush.color = currentColor;
    }
  });

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
