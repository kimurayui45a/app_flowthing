import { fabric } from 'fabric';
import iro from "@jaames/iro";

var canvasInstances = {};


//目次
//フォームを送信するための関数
//描画ツール
// カラーパレットのドラッグ機能
//サブユーザーフォーム
//アイテムフォーム


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


document.addEventListener("turbo:load", function() {
  if (document.querySelector('.edititemform')) {
    setupiconmakingCanvas('21');
    setupdragPalette('21');
    setupselectItem('21');
    setupItemSubmitButtons();
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.edituserform')) {
    setupiconmakingCanvas('1');
    setupdragPalette('1');
    setupUserSubmitButtons();
    setupselectImage();
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

function submitSubUserForm() {
  if (canvasInstances && canvasInstances["1"] && document.getElementById('sub_canvas')) {
    document.getElementById('sub_canvas').value = JSON.stringify(canvasInstances["1"].toJSON());
  }
    var form = document.getElementById('subuser_create_form');
    if (form) {
        form.submit();
    }
}



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

// 一括フォームのサブミットボタンのイベントリスナーを設定
function setupSubmitButtons() {
  var submitButton = document.getElementById('submit-button');
  // var saveDraftButton = document.getElementById('save-draft-button');

  if (submitButton) {
    submitButton.removeEventListener('click', submitUserForm);
    submitButton.addEventListener('click', submitUserForm);
  }

  // if (saveDraftButton) {
  //   saveDraftButton.removeEventListener('click', submitUserForm);
  //   saveDraftButton.addEventListener('click', submitUserForm);
  // }
}

// アイテムフォームのサブミットボタンのイベントリスナーを設定
function setupItemSubmitButtons() {
  var submitButton = document.getElementById('item-submit-button');
  // var saveDraftButton = document.getElementById('item-save-draft-button');

  if (submitButton) {
    submitButton.removeEventListener('click', submitItemForm);
    submitButton.addEventListener('click', submitItemForm);
  }

  // if (saveDraftButton) {
  //   saveDraftButton.removeEventListener('click', submitItemForm);
  //   saveDraftButton.addEventListener('click', submitItemForm);
  // }
}

// サブユーザーフォームのサブミットボタンのイベントリスナーを設定
function setupUserSubmitButtons() {
  var submitButton = document.getElementById('subuser-submit-button');
  // var saveDraftButton = document.getElementById('item-save-draft-button');

  if (submitButton) {
    submitButton.removeEventListener('click', submitSubUserForm);
    submitButton.addEventListener('click', submitSubUserForm);
  }

  // if (saveDraftButton) {
  //   saveDraftButton.removeEventListener('click', submitItemForm);
  //   saveDraftButton.addEventListener('click', submitItemForm);
  // }
}


//edit用
function loadCanvasDataForEdit(uniqueId, callback) {
  // 編集フォーム用のキャンバスデータ復元ロジック
  var canvasElement = document.getElementById(`iconmakingCanvas-${uniqueId}`);

    // canvasElement とそのデータ属性が存在するか確認
  if (canvasElement && canvasElement.dataset.canvasJson) {
    var subCanvasData = JSON.parse(canvasElement.dataset.canvasJson);

    var restoredCanvas = new fabric.Canvas(canvasElement, {
      preserveObjectStacking: true
      // その他のオプション
    });

      restoredCanvas.loadFromJSON(subCanvasData, function() {
        // 以前のコードと同様の処理をここに記述
        restoredCanvas.forEachObject(function(object) {
          object.set({
            hasControls: false,
            hasBorders: false,
            selectable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockRotation: true,
            lockScalingX: true,
            lockScalingY: true,
            lockUniScaling: true,
            hoverCursor: 'default'
          });
        });  

        var group = new fabric.Group(restoredCanvas.getObjects(), {
          originX: 'center',
          originY: 'center',
          hasControls: false,
          hasBorders: false,
          selectable: false,
          lockRotation: true,
          lockScalingX: true,
          lockScalingY: true,
          lockUniScaling: true,
          hoverCursor: 'default'
        });

        // グループをキャンバスの中央に配置
        group.set({
          left: restoredCanvas.width / 2,
          top: restoredCanvas.height / 2
        });

        restoredCanvas.clear().add(group);
        restoredCanvas.renderAll();
        if (callback) {
          callback(restoredCanvas);
        }
      });
    }
  };





//描画ツール
function setupiconmakingCanvas(uniqueId) {
  var container = document.getElementById(`canvas-making-${uniqueId}`);
  var canvasElement = document.getElementById(`iconmakingCanvas-${uniqueId}`); 
  var iconmakingCanvas;
  if (container) {
    // 編集モードのIDをチェック
    var editModeId = document.getElementById('editModeId');
    if (editModeId) {
      // 編集モードの場合、キャンバスデータをロード
      loadCanvasDataForEdit(uniqueId, function(restoredCanvas) {
        // ロード後の追加設定があればここに記述
        iconmakingCanvas = restoredCanvas;
      });
    } else {
      // 新規作成モードの場合、キャンバスを初期化
      if (canvasElement && !canvasElement.fabric) {
        iconmakingCanvas = new fabric.Canvas(canvasElement, {
          backgroundColor: 'transparent'
          // その他のオプション
        });
        canvasElement.fabric = iconmakingCanvas;
      }
    }

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
    var circleButton = document.getElementById(`drawCircleTool-${uniqueId}`);
    var triangleToolButton = document.getElementById(`drawTriangleTool-${uniqueId}`);
    var lineToolButton = document.getElementById(`drawLineTool-${uniqueId}`);
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
    // let mode = 'selectcolor';
    
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

    
    console.log('イベントリスナーを追加')
    // フォーム入力が更新されるたびにブラシサイズを更新 ここか
    brushSizeForm.addEventListener('input', function() {
      const newSize = parseFloat(brushSizeForm.value);
      if (!isNaN(newSize)) {
        updateBrushSize(newSize);
      }
    });

// 四角形を描画する関数
function drawRectangle(uniqueId) {
  var cornerRadius = parseInt(document.getElementById(`cornerRadiusInput-${uniqueId}`).value, 10);
  var fillCheckbox = document.getElementById(`fillCheckbox-${uniqueId}`);
  var strokecustom = parseInt(document.getElementById(`strokeCustomInput-${uniqueId}`).value, 10);

  var rect = new fabric.Rect({
    left: 100,
    top: 100,
    rx: cornerRadius,
    ry: cornerRadius,
    fill: fillCheckbox.checked ? currentColor : 'transparent',
    stroke: currentColor,
    strokeWidth: strokecustom,
    width: 60,
    height: 70,
    angle: 0,
    transparentCorners: false
  });
  iconmakingCanvas.add(rect);
}

// 円を描画する関数
function drawCircle(uniqueId) {
  var fillCheckbox = document.getElementById(`fillCheckbox-${uniqueId}`);
  var strokecustom = parseInt(document.getElementById(`strokeCustomInput-${uniqueId}`).value, 10);

  var circle = new fabric.Circle({
    left: 100,
    top: 100,
    fill: fillCheckbox.checked ? currentColor : 'transparent',
    stroke: currentColor,
    strokeWidth: strokecustom,
    radius: 30
  });
  iconmakingCanvas.add(circle);
}

// 三角形を描画する関数
function drawTriangle(uniqueId) {
  var fillCheckbox = document.getElementById(`fillCheckbox-${uniqueId}`);
  var strokecustom = parseInt(document.getElementById(`strokeCustomInput-${uniqueId}`).value, 10);

  var triangle = new fabric.Triangle({
    left: 100,
    top: 100,
    fill: fillCheckbox.checked ? currentColor : 'transparent',
    stroke: currentColor,
    strokeWidth: strokecustom,
    width: 60,
    height: 70
  });
  iconmakingCanvas.add(triangle);
}

// 線を描画する関数
function drawLine(uniqueId) {
  var strokecustom = parseInt(document.getElementById(`strokeCustomInput-${uniqueId}`).value, 10);
  var line = new fabric.Line([50, 100, 200, 100], {
    stroke: currentColor,
    strokeWidth: strokecustom
  });
  iconmakingCanvas.add(line);
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
      currentMode = 'selectcolor';
      updateButtonStyles();
    });

     // スポイトモード
    document.getElementById(`dropperColorMode-${uniqueId}`).addEventListener('click', function() {
      currentMode = 'droppercolor';
      iconmakingCanvas.isDrawingMode = false;
      updateButtonStyles();
    });

     // 色登録の削除モード
    deleteColorModeButton.addEventListener('click', function() {
      currentMode = 'deletecolor';
      updateButtonStyles();
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
          if (currentMode === 'droppercolor') {
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
            if (currentMode === 'deletecolor') {
              // 色削除モード
              palletbox.style.backgroundColor = '';
            } else if (currentMode === 'selectcolor') {
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
      if (currentSelectedBox && currentMode === 'selectcolor') {
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

    // カラーパレットの選択を制御するためのもの
    document.addEventListener('click', function(event) {
      // クリックされた要素がボックスでない場合、選択を解除
      if (!event.target.classList.contains('palletBox')) {
        currentSelectedBox = null;
      }
    }, true);

    // スポイト・色登録・色削除ボタンのモード切り替え
    // function updateStyles() {
    //   selectColorModeButton.style.backgroundColor = mode === 'selectcolor' ? '#9199AE' : '';
    //   dropperColorModeButton.style.backgroundColor = mode === 'droppercolor' ? '#9199AE' : '';
    //   deleteColorModeButton.style.backgroundColor = mode === 'deletecolor' ? '#9199AE' : '';
    // }

    // ペン・消しゴム・図形・テキストツールのモード切り替え
    function updateButtonStyles() {
      penToolButton.style.backgroundColor = currentMode === 'pen' ? '#9199AE' : '';
      eraserToolButton.style.backgroundColor = currentMode === 'eraser' ? '#9199AE' : '';
      rectangleToolButton.style.backgroundColor = currentMode === 'rectangle' ? '#9199AE' : '';
      textToolButton.style.backgroundColor = currentMode === 'text' ? '#9199AE' : '';
      selectColorModeButton.style.backgroundColor = currentMode === 'selectcolor' ? '#9199AE' : '';
      dropperColorModeButton.style.backgroundColor = currentMode === 'droppercolor' ? '#9199AE' : '';
      deleteColorModeButton.style.backgroundColor = currentMode === 'deletecolor' ? '#9199AE' : '';
      circleButton.style.backgroundColor = currentMode === 'circle' ? '#9199AE' : '';
      triangleToolButton.style.backgroundColor = currentMode === 'triangle' ? '#9199AE' : '';
      lineToolButton.style.backgroundColor = currentMode === 'line' ? '#9199AE' : '';
    }

    function isValidHexColor(hexColor) {
      return /^#[0-9A-Fa-f]{6}$/.test(hexColor);
    }

    
    // スポイトモードボタンのイベントリスナー
    dropperColorModeButton.addEventListener('click', function() {
      currentMode = 'droppercolor';
      updateButtonStyles();

      // キャンバス上のオブジェクトに対するクリックイベントを設定
      iconmakingCanvas.on('mouse:down', function(options) {
        if (currentMode === 'droppercolor' && options.target) {
          var clickedObject = options.target;
          // オブジェクトの塗りつぶし色または枠線色を取得
          var objectColor = clickedObject.fill || clickedObject.stroke;
          
          if (objectColor && isValidHexColor(objectColor)) {
            currentColor = objectColor;
            // カラーピッカーとカラープレビューを更新
            colorPicker.color.hexString = currentColor;
            updateColorPreview(currentColor, uniqueId);
          } else {
            // 無効なカラーコードの場合、色取得処理をスキップ
            console.log("無効なカラーコード: " + objectColor);
          }
        }
      });
    });
    
    // テキストツールボタンのイベントリスナー
    textToolButton.addEventListener('click', function() {
      currentMode = 'text';
      // iconmakingCanvas.isDrawingMode = false;
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


    // 透明ツール
    document.getElementById(`opacitySlider-${uniqueId}`).addEventListener('input', function(e) {
      var opacity = parseFloat(e.target.value) / 100;
      var activeObject = iconmakingCanvas.getActiveObject();
    
      if (activeObject && activeObject.type !== 'eraser') { // 消しゴム以外のオブジェクト
        activeObject.set('opacity', opacity);
        iconmakingCanvas.renderAll();
      }
    });    

    // 画像挿入ツール
    // document.getElementById(`imageInputFabric-${uniqueId}`).addEventListener('change', function(e) {
    //   if (e.target.files && e.target.files[0]) {
    //     var reader = new FileReader();
    
    //     reader.onload = function(event) {
    //       var imageUrl = event.target.result; // DataURLを取得
    
    //       fabric.Image.fromURL(imageUrl, function(img) {
    //         // 画像オブジェクトのオプションを設定（必要に応じて）
    //         img.set({
    //           left: 100,
    //           top: 100,
    //           angle: 0,
    //           transparentCorners: false
    //         });
    
    //         // 画像をキャンバスに追加
    //         iconmakingCanvas.add(img);
    //       });
    //     };
    
    //     reader.readAsDataURL(e.target.files[0]); // ファイルをDataURLとして読み込む
    //   }
    // });
    
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

    // 円形描画モードの切り替え
    circleButton.addEventListener('click', function() {
      currentMode = 'circle';
      // iconmakingCanvas.isDrawingMode = false;
      drawCircle(uniqueId);
      updateButtonStyles();
    });


    // 図形描画モードの切り替え
    rectangleToolButton.addEventListener('click', function() {
      currentMode = 'rectangle';
      // iconmakingCanvas.isDrawingMode = false;
      drawRectangle(uniqueId);
      updateButtonStyles();
    });


    // 三角形ツールボタンのイベントリスナー
    triangleToolButton.addEventListener('click', function() {
      currentMode = 'triangle';
      drawTriangle(uniqueId);
      updateButtonStyles();
    });

    // 線ツールボタンのイベントリスナー
    lineToolButton.addEventListener('click', function() {
      currentMode = 'line';
      drawLine(uniqueId);
      updateButtonStyles();
    });

    // 初期状態のボタンスタイルを設定
    updateButtonStyles();

    // 初期状態のボタンスタイルを設定
    // updateStyles();
  }
}


// カラーパレットのドラッグ機能
function setupdragPalette(uniqueId) {
  var container = document.getElementById(`canvas-making-${uniqueId}`);
  if (container) {
    const colorPalette = document.getElementById(`colorPalette-${uniqueId}`);
    const toolCustom = document.getElementById(`tool-custom-${uniqueId}`);
    const shapesTool = document.getElementById(`shapes-tool-${uniqueId}`);
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
    [colorPalette, toolCustom, shapesTool].forEach(element => {
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
