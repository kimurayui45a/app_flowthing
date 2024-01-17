import { fabric } from 'fabric';
import iro from "@jaames/iro";


document.addEventListener("turbo:load", function() {
  if (document.querySelector('.fabric')) {
    setupiconmakingCanvas('1');
    setupiconmakingCanvas('2');
    setupiconmakingCanvas('3');
    setupdragPalette('1');
    setupdragPalette('2');
    setupdragPalette('3');
  }
});

function setupiconmakingCanvas(uniqueId) {
  var container = document.getElementById(`canvas-making-${uniqueId}`);
  if (container) {
    //canvasの初期化
    var iconmakingCanvas = new fabric.Canvas(`iconmakingCanvas-${uniqueId}`);
    // 描画ツール
    var penToolButton = document.getElementById(`usePenTool-${uniqueId}`);
    var eraserToolButton = document.getElementById(`useEraserTool-${uniqueId}`);
    var rectangleToolButton = document.getElementById(`useRectangleTool-${uniqueId}`);
    // テキストツール
    var textToolButton = document.getElementById(`useTextTool-${uniqueId}`);
    var fontSizeSlider = document.getElementById(`fontSizeSlider-${uniqueId}`);
    var fontSizeValue = document.getElementById(`fontSizeValue-${uniqueId}`);
    // スポイト・色登録・色削除
    var selectColorModeButton = document.getElementById(`selectColorMode-${uniqueId}`);
    var dropperColorModeButton = document.getElementById(`dropperColorMode-${uniqueId}`);
    var deleteColorModeButton = document.getElementById(`deleteColorMode-${uniqueId}`);

    //初回のモード(ペン)の設定
    var currentMode = 'pen';
    var currentColor = 'white';
    let currentSelectedBox = null;
    //Undo/Redo時の描画イベントに反応させないためのフラグ
    let lockHistory = false;
    const undo_history = [];
    const redo_history = [];
    //初回のモード(スポイト)の設定
    let mode = 'selectcolor';

    // ブラシサイズプレビューの更新関数
    function updateSizePreview(size, previewId, sizeValueId) {
      var preview = document.getElementById(previewId + '-' + uniqueId);
      var newSize = size * 2;
      preview.style.width = newSize + 'px';
      preview.style.height = newSize + 'px';
      preview.style.marginLeft = (50 - newSize) / 2 + 'px';
      preview.style.marginTop = (50 - newSize) / 2 + 'px';
      document.getElementById(sizeValueId + '-' + uniqueId).textContent = size;
    }

    // ペンモード
    function initializeBrush() {
      iconmakingCanvas.freeDrawingBrush.color = currentColor;
      iconmakingCanvas.freeDrawingBrush.width = parseFloat(document.getElementById(`brushSizePicker-${uniqueId}`).value);
      updateSizePreview(iconmakingCanvas.freeDrawingBrush.width, 'brushSizePreview', 'brushSizeValue');
    }

    // 消しゴムモード
    function initializeEraser() {
      iconmakingCanvas.freeDrawingBrush.color = "white"; // キャンバスの背景色に合わせる
      iconmakingCanvas.freeDrawingBrush.width = parseFloat(document.getElementById(`eraserSizePicker-${uniqueId}`).value);
      updateSizePreview(iconmakingCanvas.freeDrawingBrush.width, 'eraserSizePreview', 'eraserSizeValue');
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
    const colorPicker = new iro.ColorPicker(`#picker-${uniqueId}`, {
      width: 140,
      color: "#fff"
    });

    // 白黒強制パレット
    document.getElementById(`whiteBox-${uniqueId}`).style.backgroundColor = 'rgb(255, 255, 255)';
    document.getElementById(`blackBox-${uniqueId}`).style.backgroundColor = 'rgb(0, 0, 0)';

    // 色登録モード
    document.getElementById(`selectColorMode-${uniqueId}`).addEventListener('click', function() {
      mode = 'selectcolor';
      updateStyles();
    });

     // スポイトモード
    document.getElementById(`dropperColorMode-${uniqueId}`).addEventListener('click', function() {
      mode = 'droppercolor';
      updateStyles();
    });

     // 色登録の削除モード
    deleteColorModeButton.addEventListener('click', function() {
      mode = 'deletecolor';
      updateStyles();
    });

     // フリーパレット、選択されたパレットの要素を取得
    const palletboxes = document.querySelectorAll('.palletBox');
    function isSpecialColorBox(box) {
      return box.classList.contains('specialColorBox');
    }

    // palletBoxのセットアップ
    setupPalletBoxes(uniqueId);
    // フリーパレットに関するモード(スポイト、色登録、色削除)
    function setupPalletBoxes(uniqueId) {
      const palletboxes = document.querySelectorAll(`#canvas-making-${uniqueId} .palletBox`);
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
    }

    // カラーパレットの処理
    colorPicker.on('color:change', function(color) {
      // カラーパレットから選択された色を現在の色として設定
      currentColor = color.hexString;
      updateColorPreview(color.hexString, uniqueId);
      // カラーパレットで選択された色を現在選択されているボックスに適用
      if (currentSelectedBox && mode === 'selectcolor') {
        currentSelectedBox.style.backgroundColor = currentColor;
      }
      // 描画モードが 'pen' の場合、キャンバスのブラシの色を更新
      if (currentMode === 'pen') {
        iconmakingCanvas.freeDrawingBrush.color = currentColor;
      }
    });

    // カラープレビューの更新関数
    function updateColorPreview(colorHex, uniqueId) {
      var preview = document.getElementById(`colorPreview-${uniqueId}`);
      if (preview) {
        preview.style.backgroundColor = colorHex;
      }
    }

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

    // カラーパレッっとの選択を制御するためのもの
    document.addEventListener('click', function(event) {
      // クリックされた要素がボックスでない場合、選択を解除
      if (!event.target.classList.contains('palletBox')) {
        currentSelectedBox = null;
      }
    }, true);

    // スポイト・色登録・色削除ボタンのスタイル更新関数
    function updateStyles() {
      selectColorModeButton.style.backgroundColor = mode === 'selectcolor' ? '#9199AE' : '';
      dropperColorModeButton.style.backgroundColor = mode === 'droppercolor' ? '#9199AE' : '';
      deleteColorModeButton.style.backgroundColor = mode === 'deletecolor' ? '#9199AE' : '';
    }

    // テキストツールボタンのイベントリスナー
    textToolButton.addEventListener('click', function() {
      currentMode = 'text';
      iconmakingCanvas.isDrawingMode = false;
      addText();
      updateButtonStyles();
    });

    // フォントサイズスライダーのイベントリスナー
    fontSizeSlider.addEventListener('input', updateFontSize);
    
    // フリーハンド描画モードの有効化
    iconmakingCanvas.isDrawingMode = true;
    initializeBrush();
    undo_history.push(JSON.stringify(iconmakingCanvas));

    // ブラシサイズのスライダー
    document.getElementById(`brushSizePicker-${uniqueId}`).addEventListener('input', function(event) {
      if (currentMode === 'pen') {
        var size = parseFloat(event.target.value);
        iconmakingCanvas.freeDrawingBrush.width = size;
        updateSizePreview(size, 'brushSizePreview', 'brushSizeValue');
      }
    });

    // 消しゴムサイズのスライダー
    document.getElementById(`eraserSizePicker-${uniqueId}`).addEventListener('input', function(event) {
      if (currentMode === 'eraser') {
        var size = parseFloat(event.target.value);
        iconmakingCanvas.freeDrawingBrush.width = size;
        updateSizePreview(size, 'eraserSizePreview', 'eraserSizeValue');
      }
    });

    // ペンと消しゴムの操作の制御(fabricオブジェクトにしない設定)
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
    
    // アンドゥ
    iconmakingCanvas.on("object:added", function () {
      if (lockHistory) return;
      console.log("object:added");
      undo_history.push(JSON.stringify(iconmakingCanvas));
      redo_history.length = 0;
      console.log(undo_history.length);
    });
    
    // リドゥ
    iconmakingCanvas.on("object:modified", function () {
      if (lockHistory) return;
      console.log("object:modified");
      undo_history.push(JSON.stringify(iconmakingCanvas));
      redo_history.length = 0;
      console.log(undo_history.length);
    });

    // アンドゥ
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

    // リドゥ
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

    // アンドゥとリドゥのイベントリスナー
    document.getElementById(`undo-${uniqueId}`).addEventListener("click", undo);
    document.getElementById(`redo-${uniqueId}`).addEventListener("click", redo);

    // ペン・消しゴム・図形・テキストツールのモード切り替え
    function updateButtonStyles() {
      penToolButton.style.backgroundColor = currentMode === 'pen' ? '#9199AE' : '';
      eraserToolButton.style.backgroundColor = currentMode === 'eraser' ? '#9199AE' : '';
      rectangleToolButton.style.backgroundColor = currentMode === 'rectangle' ? '#9199AE' : '';
      textToolButton.style.backgroundColor = currentMode === 'text' ? '#9199AE' : '';
    }

    // 選択ボタン
    document.getElementById(`editMode-${uniqueId}`).addEventListener("mouseup", function (e) {
      if (iconmakingCanvas.isDrawingMode) {
        iconmakingCanvas.isDrawingMode = false;
        // clearSelectedButton();
        this.classList.add("selected");
      } else {
        iconmakingCanvas.isDrawingMode = true;
        // clearSelectedButton();
        // lastSelectdColorBtn.classList.add("selected");
        this.classList.remove("selected");
        iconmakingCanvas.discardActiveObject();
        iconmakingCanvas.requestRenderAll();
      }
    });
    
    //deleteボタンの処理
    const deleteBtn = document.getElementById(`delete-${uniqueId}`);

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
      undo_history.push(JSON.stringify(iconmakingCanvas));
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

    // 初期状態のボタンスタイルを設定
    updateStyles();
  }
}


// カラーパレットのドラッグ機能
function setupdragPalette(uniqueId) {
  var container = document.getElementById(`canvas-making-${uniqueId}`);
  if (container) {
    const colorPalette = document.getElementById(`colorPalette-${uniqueId}`);
    const dropzone = document.getElementById(`dropzone-${uniqueId}`);
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
  }
};