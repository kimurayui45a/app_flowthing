import { fabric } from 'fabric';
import iro from "@jaames/iro";

var canvasInstances = {};

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.fabric')) {
    setupiconmakingCanvas('1');
    setupiconmakingCanvas('2');
    setupdragPalette('1');
    setupdragPalette('2');
    setupselectImage();
    setupselectItem('2');
    setupSubmitButtons();
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.itemformcr')) {
    setupiconmakingCanvas('21');
    setupdragPalette('21');
    setupselectItem('21');
    setupItemSubmitButtons();
  }
});



function submitItemForm() {
  if (canvasInstances && canvasInstances["21"] && document.getElementById('item_canvas-21')) {
    document.getElementById('item_canvas-21').value = JSON.stringify(canvasInstances["21"].toJSON());
  }
    var form = document.getElementById('item_create_form');
    if (form) {
        form.submit();
    }
}

// アイテムクリエートのフォームを送信するための関数
// function submitItemButton() {
//   // 'submit-button'のボタンを取得
//   var submitButton = document.getElementById('item-submit-button');
//   // 'save-draft-button'のボタンを取得
//   var saveDraftButton = document.getElementById('item-save-draft-button');

//   // 'submit-button'に対するイベントリスナーの設定
//   console.log('イベントリスナーを追加、アイテムフォーム')
//   if (submitButton) {
//       submitButton.addEventListener('click', function(event) {
//           submitForm();
//       });
//   }
//   // 'save-draft-button'に対するイベントリスナーの設定
//   if (saveDraftButton) {
//       saveDraftButton.addEventListener('click', function(event) {
//           submitForm();
//       });
//   }
  
//   function submitForm() {
//     if (canvasInstances && canvasInstances["21"] && document.getElementById('item_canvas-21')) {
//       document.getElementById('item_canvas-21').value = JSON.stringify(canvasInstances["21"].toJSON());
//     }
//       var form = document.getElementById('item_create_form');
//       if (form) {
//           form.submit();
//       }
//   }
// }


//目次
//フォームを送信するための関数
//描画ツール
// カラーパレットのドラッグ機能
//サブユーザーフォーム
//アイテムフォーム



function submitUserForm() {
  // ここでキャンバスデータを取得し、隠れたフィールドに設定
  if (canvasInstances && canvasInstances["1"] && document.getElementById('sub_canvas')) {
    document.getElementById('sub_canvas').value = JSON.stringify(canvasInstances["1"].toJSON());
  }
  if (canvasInstances && canvasInstances["2"] && document.getElementById('item_canvas-2')) {
    document.getElementById('item_canvas-2').value = JSON.stringify(canvasInstances["2"].toJSON());
  }
    var form = document.getElementById('user_create_form');
    if (form) {
        form.submit();
    }
}

// ユーザーフォームのサブミットボタンのイベントリスナーを設定
function setupSubmitButtons() {
  var submitButton = document.getElementById('submit-button');
  var saveDraftButton = document.getElementById('save-draft-button');

  if (submitButton) {
    submitButton.removeEventListener('click', submitUserForm);
    submitButton.addEventListener('click', submitUserForm);
  }

  if (saveDraftButton) {
    saveDraftButton.removeEventListener('click', submitUserForm);
    saveDraftButton.addEventListener('click', submitUserForm);
  }
}

// アイテムフォームのサブミットボタンのイベントリスナーを設定
function setupItemSubmitButtons() {
  var submitButton = document.getElementById('item-submit-button');
  var saveDraftButton = document.getElementById('item-save-draft-button');

  if (submitButton) {
    submitButton.removeEventListener('click', submitItemForm);
    submitButton.addEventListener('click', submitItemForm);
  }

  if (saveDraftButton) {
    saveDraftButton.removeEventListener('click', submitItemForm);
    saveDraftButton.addEventListener('click', submitItemForm);
  }
}






// // フォームを送信するための関数
// function submitButton() {
//   // 'submit-button'のボタンを取得
//   var submitButton = document.getElementById('submit-button');
//   // 'save-draft-button'のボタンを取得
//   var saveDraftButton = document.getElementById('save-draft-button');
//   // 'submit-button'に対するイベントリスナーの設定
//   if (submitButton) {
//       submitButton.addEventListener('click', function(event) {
//           submitForm();
//       });
//   }
//   console.log('イベントリスナーを追加,サブミット')
//   // 'save-draft-button'に対するイベントリスナーの設定
//   if (saveDraftButton) {
//       saveDraftButton.addEventListener('click', function(event) {
//           submitForm();
//       });
//   }
  
//   function submitForm() {
//     // ここでキャンバスデータを取得し、隠れたフィールドに設定
//     if (canvasInstances && canvasInstances["1"] && document.getElementById('sub_canvas')) {
//       document.getElementById('sub_canvas').value = JSON.stringify(canvasInstances["1"].toJSON());
//     }
//     if (canvasInstances && canvasInstances["2"] && document.getElementById('item_canvas-2')) {
//       document.getElementById('item_canvas-2').value = JSON.stringify(canvasInstances["2"].toJSON());
//     }
//       var form = document.getElementById('user_create_form');
//       if (form) {
//           form.submit();
//       }
//   }
// }




//描画ツール
function setupiconmakingCanvas(uniqueId) {
  var container = document.getElementById(`canvas-making-${uniqueId}`);
  if (container) {
    //canvasの初期化
    var iconmakingCanvas = new fabric.Canvas(`iconmakingCanvas-${uniqueId}`, {
      backgroundColor: 'transparent' // 背景色を透明に設定
    });

    // 描画ツールのモード
    var penToolButton = document.getElementById(`usePenTool-${uniqueId}`);
    var eraserToolButton = document.getElementById(`useEraserTool-${uniqueId}`);
    var rectangleToolButton = document.getElementById(`useRectangleTool-${uniqueId}`);
    // テキストツール
    var textToolButton = document.getElementById(`useTextTool-${uniqueId}`);
    // スポイト・色登録・色削除
    var selectColorModeButton = document.getElementById(`selectColorMode-${uniqueId}`);
    var dropperColorModeButton = document.getElementById(`dropperColorMode-${uniqueId}`);
    var deleteColorModeButton = document.getElementById(`deleteColorMode-${uniqueId}`);
    canvasInstances[uniqueId] = iconmakingCanvas;

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
    
    // ペンモードの初期化
    function initializeBrush() {
      iconmakingCanvas.freeDrawingBrush.color = currentColor;
      var brushSize = parseFloat(document.getElementById(`brushSizeForm-${uniqueId}`).value) || 1;
      iconmakingCanvas.freeDrawingBrush.width = brushSize;
    }

    // 消しゴムモードの初期化
    function initializeEraser() {
      iconmakingCanvas.freeDrawingBrush.color = "white";
      var eraserSize = parseFloat(document.getElementById(`brushSizeForm-${uniqueId}`).value) || 1;
      iconmakingCanvas.freeDrawingBrush.width = eraserSize;
    }

    //ブラシサイズとペンの紐付け
    function updateBrushSize(size) {
      if (iconmakingCanvas && iconmakingCanvas.freeDrawingBrush) {
        iconmakingCanvas.freeDrawingBrush.width = size;
      }
    }

    console.log('イベントリスナーを追加、fonnto')
    // フォントサイズフォームの取得とイベントリスナーの設定
    var fontSizeForm = document.getElementById(`fontSizeForm-${uniqueId}`);
    fontSizeForm.addEventListener('input', updateFontSize);

    // フォントサイズの更新関数
    function updateFontSize() {
      var size = parseFloat(fontSizeForm.value);
      var activeObject = iconmakingCanvas.getActiveObject();
      if (activeObject && activeObject.type === 'i-text') {
        activeObject.set({ fontSize: size });
        iconmakingCanvas.requestRenderAll();
      }
    }

    // サブミットとフォームによるリロード事故を阻止する
    var brushSizeForm = document.getElementById(`brushSizeForm-${uniqueId}`);
    // if (fontSizeForm && fontSizeForm.form) {
    //   fontSizeForm.form.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //   });
    // }
    // if (brushSizeForm && brushSizeForm.form) {
    //   brushSizeForm.form.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //   });
    // }

    
    console.log('イベントリスナーを追加')
    // フォーム入力が更新されるたびにブラシサイズを更新 ここか
    brushSizeForm.addEventListener('input', function() {
      const newSize = parseFloat(brushSizeForm.value);
      if (!isNaN(newSize)) {
        updateBrushSize(newSize);
      }
    });

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

    // フリーハンド描画モードの有効化
    iconmakingCanvas.isDrawingMode = true;
    initializeBrush();
    undo_history.push(JSON.stringify(iconmakingCanvas));

    iconmakingCanvas.preserveObjectStacking = true;


    // サイズボタンのイベントリスナーを設定
    document.querySelectorAll(`#sizeControl-${uniqueId} .sizeBtn`).forEach(div => {
      div.addEventListener('click', function() {
        const size = this.getAttribute('data-size');
        updateBrushSize(parseFloat(size), uniqueId);
      });
    });

    // サイズボタンのイベントリスナーを設定
  document.querySelectorAll(`#sizeControl-${uniqueId} .sizeBtn`).forEach(div => {
    div.addEventListener('click', function() {
      const size = this.getAttribute('data-size');
      document.querySelectorAll(`#sizeControl-${uniqueId} .sizeBtn`).forEach(div => {
        div.classList.remove('selected-size-btn');
      });
      this.classList.add('selected-size-btn');
      updateBrushSize(parseFloat(size), uniqueId);
      document.getElementById(`brushSizeForm-${uniqueId}`).value = size;
    });
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
      deleteBtn.classList.remove("disabled-input");
    });

    // 選択が解除されたときにボタンを無効化
    iconmakingCanvas.on("selection:cleared", function () {
      deleteBtn.classList.add("disabled-input");
    });

    // deleteボタンのクリックイベント
    deleteBtn.addEventListener("click", function () {
      if (!deleteBtn.classList.contains("disabled-input")) {
        deleteSelectedObjects();
      }
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

    // ペンツールボタンのイベントリスナー
    penToolButton.addEventListener('click', function() {
      currentMode = 'pen';
      iconmakingCanvas.isDrawingMode = true;
      initializeBrush(); // ペンツールを初期化
      updateButtonStyles();
    });

    // 消しゴムボタンのイベントリスナー
    eraserToolButton.addEventListener('click', function() {
      currentMode = 'eraser';
      iconmakingCanvas.isDrawingMode = true;
      initializeEraser(); // 消しゴムツールを初期化
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
    const toolCustom = document.getElementById(`tool-custom-${uniqueId}`);
    const dropzone = document.getElementById(`dropzone-${uniqueId}`);
    // colorPalette要素が存在する場合にのみ設定を行う
    if (colorPalette) {
      colorPalette.setAttribute('draggable', 'true');
      colorPalette.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', colorPalette.id);
      });
    }

    // 共通のドラッグ開始イベントハンドラ
    function onDragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.id);
    }

    // ドラッグ対象の設定
    [colorPalette, toolCustom].forEach(element => {
      if (element) {
        element.setAttribute('draggable', 'true');
        element.addEventListener('dragstart', onDragStart);
      }
    });

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

//サブユーザーフォーム
function setupselectImage() {
  //ラジオボタンの選択(id)
  const selectImage = document.getElementById('subuserImage');
  const selectColorCode = document.getElementById('subuserColorCode');
  const selectCanvas = document.getElementById('subuserCanvas');
  const iconChoiceDropdown = document.getElementById('iconChoice');
  var selectedOptionField = document.getElementById('icon_choice');
  //toggleButton-${uniqueId}の代わりにラジオのidsubuserCanvas
  
  //選択項目の外枠のdiv要素(id)
  const imageInputDiv = document.getElementById('subImageInput');
  const colorInputDiv = document.getElementById('subColorInput');
  const canvasInputDiv = document.getElementById('subCanvasInput');

  var imageInputField = document.getElementById('sub_image');

  // ドロップダウンの変更を監視するイベントリスナーを設定
  iconChoiceDropdown.addEventListener('change', function() {
    const selectedValue = this.value;
    console.log('Dropdown changed:', this.value); 

    // 選択された値に応じて対応するラジオボタンを選択
    if (selectedValue === 'sub_color') {
      selectColorCode.checked = true;
      selectedOptionField.value = 'sub_color';
    } else if (selectedValue === 'sub_image') {
      selectImage.checked = true;
      selectedOptionField.value = 'sub_image';
    } else if (selectedValue === 'sub_canvas') {
      selectCanvas.checked = true;
      selectedOptionField.value = 'sub_canvas';
    }
    // UIを更新
    updateInputVisibility();
  });

  //各ラジオボタンがクリックされた時の挙動
  function updateInputVisibility() {
    var imagePreview = document.getElementById('subimagePreview');
    var colorPreview = document.getElementById('subcolorPreview');
    var canvasPreview = document.getElementById('fabricSwitchSub');
    
    if (selectImage.checked) {
      // Imageが選択されたときの処理
      //半透明にするか？
      imageInputDiv.classList.remove('subuser-disabled');
      colorInputDiv.classList.add('subuser-disabled');
      canvasInputDiv.classList.add('subuser-disabled');
      //フォームの機能の制御
      imageInputDiv.querySelector('input[type=file]').disabled = false;
      colorInputDiv.querySelector('input[type=color]').disabled = true;
      //選択されている方に「subactive-style」スタイルを付与
      imageInputDiv.classList.add('subactive-style');
      colorInputDiv.classList.remove('subactive-style');
      canvasInputDiv.classList.remove('subactive-style');
      //選択されている方のプレビューを表示/他は非表示
      imagePreview.style.display = 'block';
      colorPreview.style.display = 'none';
      canvasPreview.classList.add('hidden-canvas');
    } else if (selectColorCode.checked)  {
      // Colorが選択されたときの処理
      colorInputDiv.classList.remove('subuser-disabled');
      imageInputDiv.classList.add('subuser-disabled');
      canvasInputDiv.classList.add('subuser-disabled');

      colorInputDiv.querySelector('input[type=color]').disabled = false;
      imageInputDiv.querySelector('input[type=file]').disabled = true;
      colorInputDiv.classList.add('subactive-style');
      imageInputDiv.classList.remove('subactive-style');
      canvasInputDiv.classList.remove('subactive-style');

      imagePreview.style.display = 'none';
      colorPreview.style.display = 'block';
      canvasPreview.classList.add('hidden-canvas');
    } else if (selectCanvas.checked) {
      // Canvasが選択されたときの処理
      colorInputDiv.classList.add('subuser-disabled');
      imageInputDiv.classList.add('subuser-disabled');
      canvasInputDiv.classList.remove('subuser-disabled');

      colorInputDiv.querySelector('input[type=color]').disabled = true;
      imageInputDiv.querySelector('input[type=file]').disabled = true;
      imageInputDiv.classList.remove('subactive-style');
      colorInputDiv.classList.remove('subactive-style');
      canvasInputDiv.classList.add('subactive-style');

      imagePreview.style.display = 'none';
      colorPreview.style.display = 'none';
      canvasPreview.classList.remove('hidden-canvas');
    }
  }

  //ピックアップカラー
  document.querySelectorAll('.subuser-iconColor').forEach(function(colorElement) {
    colorElement.addEventListener('click', function() {
      var sub_color = this.getAttribute('data-color');
      document.getElementById('sub_color').value = sub_color;
      document.getElementById('subuserColorCode').checked = true; // ラジオボタンを選択状態にする
      updateInputVisibility(); // 必要に応じて入力フィールドの表示を更新
      var colorPreview = document.getElementById('subcolorPreview');
      colorPreview.style.backgroundColor = sub_color;
    });
  });

  //カラーピッカー
  var colorPicker = document.getElementById('sub_color');
  colorPicker.addEventListener('change', function() {
    var sub_color = this.value;
    var colorPreview = document.getElementById('subcolorPreview');
    colorPreview.style.backgroundColor = sub_color;
  });

  //画像のプレビュー処理
  var imageInput = document.getElementById('sub_image');
  imageInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var imagePreview = document.getElementById('subimagePreview');
        imagePreview.style.backgroundImage = 'url(' + e.target.result + ')';
        imagePreview.style.backgroundSize = 'cover';
      };
      reader.readAsDataURL(this.files[0]);
    }
  });

  //画像の選択可能範囲を広げる
  imageInputDiv.addEventListener('click', function(event) {
    // クリックされた要素がファイル入力フィールドでない場合にのみラジオボタンを選択
    if (event.target.id !== 'sub_image') {
      selectImage.checked = true;
      iconChoiceDropdown.value = 'sub_image';
      selectedOptionField.value = 'sub_image';
      updateInputVisibility(); // 入力の可視性を更新
    }
  });


  //カラーの選択可能範囲を広げる
  colorInputDiv.addEventListener('click', function() {
    selectColorCode.checked = true;
    iconChoiceDropdown.value = 'sub_color';
      selectedOptionField.value = 'sub_color';
    updateInputVisibility(); // 入力の可視性を更新
  });

  canvasInputDiv.addEventListener('click', function() {
    selectCanvas.checked = true;
    iconChoiceDropdown.value = 'sub_canvas';
    selectedOptionField.value = 'sub_canvas';
    updateInputVisibility(); // 入力の可視性を更新
  });
  
  // ラジオボタンの変更を監視するイベントリスナーを設定
  selectColorCode.addEventListener('change', function() {
    if (this.checked) {
      iconChoiceDropdown.value = 'sub_color';
      selectedOptionField.value = 'sub_color';
      updateInputVisibility();
    }
  });

  selectImage.addEventListener('change', function() {
    if (this.checked) {
      iconChoiceDropdown.value = 'sub_image';
      selectedOptionField.value = 'sub_image';
      updateInputVisibility();
    }
  });

  selectCanvas.addEventListener('change', function() {
    if (this.checked) {
      iconChoiceDropdown.value = 'sub_canvas';
      selectedOptionField.value = 'sub_canvas';
      updateInputVisibility();
    }
  });

  // ラジオボタンの変更を監視
  selectImage.addEventListener('change', updateInputVisibility);
  selectColorCode.addEventListener('change', updateInputVisibility);
  selectCanvas.addEventListener('change', updateInputVisibility);

  // 初期状態を設定
  updateInputVisibility();
};



//アイテムフォーム
function setupselectItem(uniqueId) {
  //ラジオボタンの選択(id)
  const selectImage = document.getElementById(`itemImage-${uniqueId}`);
  const selectCanvas = document.getElementById(`itemCanvas-${uniqueId}`);
  const iconChoiceDropdown = document.getElementById(`iconItemChoice-${uniqueId}`);
  var selectedOptionField = document.getElementById(`image_choice-${uniqueId}`);
  //toggleButton-${uniqueId}の代わりにラジオのid
  
  //選択項目の外枠のdiv要素(id)
  const imageInputDiv = document.getElementById(`itemImageInput-${uniqueId}`);
  const canvasInputDiv = document.getElementById(`itemCanvasInput-${uniqueId}`);

  var imageInputField = document.getElementById(`item_image-${uniqueId}`);

  // ドロップダウンの変更を監視するイベントリスナーを設定
  iconChoiceDropdown.addEventListener('change', function() {
    const selectedValue = this.value;
    console.log('Dropdown changed:', this.value);
    
    // 選択された値に応じて対応するラジオボタンを選択
  if (selectedValue === 'no_image') {
    // 「選択しない」が選ばれたときの処理
    selectImage.checked = false;
    selectCanvas.checked = false;
    selectedOptionField.value = 'no_image';
    imageInputDiv.classList.add('subuser-disabled');
    canvasInputDiv.classList.add('subuser-disabled');
  } else if (selectedValue === 'item_image') {
    selectImage.checked = true;
    selectCanvas.checked = false;
    selectedOptionField.value = 'item_image';
  } else if (selectedValue === 'item_canvas') {
    selectImage.checked = false;
    selectCanvas.checked = true;
    selectedOptionField.value = 'item_canvas';
  }
    // UIを更新
    updateInputVisibility();
  });

  //各ラジオボタンがクリックされた時の挙動
  function updateInputVisibility() {
    var imagePreview = document.getElementById(`itemimagePreview-${uniqueId}`);
    var canvasPreview = document.getElementById(`fabricSwitchItem-${uniqueId}`);
    
    if (selectImage.checked) {
      // Imageが選択されたときの処理
      //半透明にするか？
      imageInputDiv.classList.remove('subuser-disabled');
      canvasInputDiv.classList.add('subuser-disabled');
      //フォームの機能の制御
      imageInputDiv.querySelector('input[type=file]').disabled = false;
      //選択されている方に「subactive-style」スタイルを付与
      imageInputDiv.classList.add('subactive-style');
      canvasInputDiv.classList.remove('subactive-style');
      //選択されている方のプレビューを表示/他は非表示
      imagePreview.style.display = 'block';
      canvasPreview.classList.add('hidden-canvas');
    } else if (selectCanvas.checked) {
      // Canvasが選択されたときの処理
      imageInputDiv.classList.add('subuser-disabled');
      canvasInputDiv.classList.remove('subuser-disabled');
      imageInputDiv.querySelector('input[type=file]').disabled = true;
      imageInputDiv.classList.remove('subactive-style');
      canvasInputDiv.classList.add('subactive-style');
      imagePreview.style.display = 'none';
      canvasPreview.classList.remove('hidden-canvas');
    } else {
      // 「選択しない」が選ばれたときの処理
      imageInputDiv.classList.add('subuser-disabled');
      canvasInputDiv.classList.add('subuser-disabled');
      imageInputDiv.querySelector('input[type=file]').disabled = true;
      imageInputDiv.classList.remove('subactive-style');
      canvasInputDiv.classList.remove('subactive-style');
      imagePreview.style.display = 'none';
      canvasPreview.classList.add('hidden-canvas');
    }
  }

  //画像のプレビュー処理
  var imageInput = document.getElementById(`item_image-${uniqueId}`);
  imageInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var imagePreview = document.getElementById(`itemimagePreview-${uniqueId}`);
        imagePreview.style.backgroundImage = 'url(' + e.target.result + ')';
        imagePreview.style.backgroundSize = 'cover';
      };
      reader.readAsDataURL(this.files[0]);
    }
  });

  //画像の選択可能範囲を広げる
  imageInputDiv.addEventListener('click', function(event) {
    // クリックされた要素がファイル入力フィールドでない場合にのみラジオボタンを選択
    if (event.target.id !== 'item_image') {
      selectImage.checked = true;
      iconChoiceDropdown.value = 'item_image';
      selectedOptionField.value = 'item_image';
      updateInputVisibility(); // 入力の可視性を更新
    }
  });

  canvasInputDiv.addEventListener('click', function() {
    selectCanvas.checked = true;
    iconChoiceDropdown.value = 'item_canvas';
    selectedOptionField.value = 'item_canvas';
    updateInputVisibility(); // 入力の可視性を更新
  });
  
  // ラジオボタンの変更を監視するイベントリスナーを設定
  selectImage.addEventListener('change', function() {
    if (this.checked) {
      iconChoiceDropdown.value = 'item_image';
      selectedOptionField.value = 'item_image';
      updateInputVisibility();
    }
  });

  selectCanvas.addEventListener('change', function() {
    if (this.checked) {
      iconChoiceDropdown.value = 'item_canvas';
      selectedOptionField.value = 'item_canvas';
      updateInputVisibility();
    }
  });

  // ラジオボタンの変更を監視
  selectImage.addEventListener('change', updateInputVisibility);
  selectCanvas.addEventListener('change', updateInputVisibility);

  // 初期状態を設定
  updateInputVisibility();
};



//エピソード画像のプレビュー処理
// function setupEpisodeImage() {
//   var imageInput = document.getElementById('episode_image');
//   imageInput.addEventListener('change', function() {
//     if (this.files && this.files[0]) {
//       var reader = new FileReader();
//       reader.onload = function(e) {
//         var imagePreview = document.getElementById('episodeimagePreview');
//         imagePreview.style.backgroundImage = 'url(' + e.target.result + ')';
//         imagePreview.style.backgroundSize = 'cover';
//       };
//       reader.readAsDataURL(this.files[0]);
//     }
//   });
// };


// //fabricデータ送信
// function handleSubmitButton() {
//   // 各キャンバスデータを取得し、対応する隠れたフィールドに設定
//   document.getElementById('sub_canvas').value = JSON.stringify(canvasInstances["1"].toJSON());
//   document.getElementById('item_canvas').value = JSON.stringify(canvasInstances["2"].toJSON());
//   document.getElementById('user_create_form').submit();
// }

