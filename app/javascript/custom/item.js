document.addEventListener("turbo:load", function() {
  if (document.querySelector('.itemfabric')) {
    subCanvasCard(true, 40, 40, 30, 30, 175);
    itemCanvasCard(true, 120, 120, 120, 120, 200);
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.item-show-fabric')) {
    itemCanvasCard(true, 200, 200, 200, 200, 200);
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.board-item-fabric')) {
    itemRectCard(false, 350, 350, 200);
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.subfabric')) {
    subCanvasCard(true, 120, 120, 105, 105, 175);
    itemCanvasCard(true, 40, 40, 30, 30, 200);
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.searchfabric')) {
    subCanvasCard(false, 40, 40, 30, 30, 175);
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.sub-show-fabric')) {
    subCanvasCard(false, 250, 250, 200, 200, 175);
    itemRectCard(true, 100, 100, 200);
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.item-show-icon')) {
    subfitCard(true, 40, 40, 175);
    itemRectCard(false, 230, 230, 200);
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.episode-usericon')) {
    subCanvasCard(true, 55, 55, 45, 45, 175);
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.board-item-index')) {
    itemRectCard(true, 120, 120, 200);
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.board-item-showfabric')) {
    itemRectCard(false, 200, 200, 200);
  }
});


// 関数名(カーソルの種類, キャンバスの幅, キャンバスの高さ, スケールの幅, スケールの高さ, 背景の円形オブジェクトの半径)

// ユーザー
function subCanvasCard(usePointerCursor, canvasWidth, canvasHeight, scaleWidth, scaleHeight, radius) {
  // 'subCanvas_' で始まるIDを持つすべてのキャンバス要素を取得
  var canvasElements = document.querySelectorAll('canvas[id^="subCanvas_"]');

  canvasElements.forEach(function(canvasElement) {
    var subCanvasData = JSON.parse(canvasElement.dataset.canvasJson);

    if (canvasElement && subCanvasData) {
      var restoredCanvas = new fabric.Canvas(canvasElement.id, {
        width: canvasWidth, // キャンバスの幅
        height: canvasHeight, // キャンバスの高さ
        selection: false
      });
      restoredCanvas.preserveObjectStacking = true;

    //   // 白い背景の円形オブジェクトを作成
    //   var backgroundCircle = new fabric.Circle({
    //     radius: radius, // 半径
    //     fill: 'transparent', // 背景色
    //     stroke: 'black', // 枠線の色
    //     strokeWidth: 1, // 枠線の幅
    //     left: restoredCanvas.width / 2, // X位置
    //     top: restoredCanvas.height / 2, // Y位置
    //     originX: 'center', // 原点のX位置
    //     originY: 'center' // 原点のY位置
    //   });

    // // 背景円をキャンバスに追加
    // restoredCanvas.add(backgroundCircle);

      restoredCanvas.loadFromJSON(subCanvasData, function() {
        // 以前のコードと同様の処理をここに記述
        restoredCanvas.backgroundColor = 'transparent';
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
            hoverCursor: usePointerCursor ? 'pointer' : 'default'
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
          hoverCursor: usePointerCursor ? 'pointer' : 'default',
          clipPath: new fabric.Circle({
            radius: radius,
            originX: 'center',
            originY: 'center',
          })
        });

        // グループをキャンバスの中央に配置
        group.set({
          left: restoredCanvas.width / 2,
          top: restoredCanvas.height / 2
        });

        
        restoredCanvas.clear().add(group);
        group.scaleToWidth(scaleWidth);
        group.scaleToHeight(scaleHeight);
        restoredCanvas.renderAll();
      });
    }
  });
}


// アイテム
function itemCanvasCard(usePointerCursor, canvasWidth, canvasHeight, scaleWidth, scaleHeight, radius) {
  // 'subCanvas_' で始まるIDを持つすべてのキャンバス要素を取得
  var canvasElements = document.querySelectorAll('canvas[id^="itemCanvas_"]');

  canvasElements.forEach(function(canvasElement) {
    var subCanvasData = JSON.parse(canvasElement.dataset.canvasJson);

    if (canvasElement && subCanvasData) {
      var restoredCanvas = new fabric.Canvas(canvasElement.id, {
        width: canvasWidth, // キャンバスの幅
        height: canvasHeight, // キャンバスの高さ
        selection: false
      });
      restoredCanvas.preserveObjectStacking = true;

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
            hoverCursor: usePointerCursor ? 'pointer' : 'default'
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
          hoverCursor: usePointerCursor ? 'pointer' : 'default',
          clipPath: new fabric.Circle({
            radius: radius,
            originX: 'center',
            originY: 'center',
          })
        });

        // グループをキャンバスの中央に配置
        group.set({
          left: restoredCanvas.width / 2,
          top: restoredCanvas.height / 2
        });

        restoredCanvas.clear().add(group);
        group.scaleToWidth(scaleWidth);
        group.scaleToHeight(scaleHeight);
        restoredCanvas.renderAll();
      });
    }
  });
}




// アイテム(四角出力)
function itemRectCard(usePointerCursor, canvasWidth, canvasHeight, radius) {
  // 'subCanvas_' で始まるIDを持つすべてのキャンバス要素を取得
  var canvasElements = document.querySelectorAll('canvas[id^="itemCanvas_"]');

  canvasElements.forEach(function(canvasElement) {
    var subCanvasData = JSON.parse(canvasElement.dataset.canvasJson);

    if (canvasElement && subCanvasData) {
      var restoredCanvas = new fabric.Canvas(canvasElement.id, {
        width: canvasWidth, // キャンバスの幅
        height: canvasHeight, // キャンバスの高さ
        selection: false
      });
      restoredCanvas.preserveObjectStacking = true;

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
            hoverCursor: usePointerCursor ? 'pointer' : 'default'
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
          hoverCursor: usePointerCursor ? 'pointer' : 'default',
          clipPath: new fabric.Rect({
            originX: 'center',
            originY: 'center',
            width: 2 * radius,  // 円の半径を使って四角形の幅と高さを設定
            height: 2 * radius
          })
        });

        // グループをキャンバスの中央に配置
        group.set({
          left: restoredCanvas.width / 2,
          top: restoredCanvas.height / 2
        });

        var scaleX = canvasWidth / group.getScaledWidth();
        var scaleY = canvasHeight / group.getScaledHeight();
        var scaleToFit = Math.min(scaleX, scaleY);
        group.scale(scaleToFit).setCoords();
        restoredCanvas.renderAll();
      });
    }
  });
}


// ユーザー(フィット)
function subfitCard(usePointerCursor, canvasWidth, canvasHeight, radius) {
  // 'subCanvas_' で始まるIDを持つすべてのキャンバス要素を取得
  var canvasElements = document.querySelectorAll('canvas[id^="subCanvas_"]');

  canvasElements.forEach(function(canvasElement) {
    var subCanvasData = JSON.parse(canvasElement.dataset.canvasJson);

    if (canvasElement && subCanvasData) {
      var restoredCanvas = new fabric.Canvas(canvasElement.id, {
        width: canvasWidth, // キャンバスの幅
        height: canvasHeight, // キャンバスの高さ
        selection: false
      });
      restoredCanvas.preserveObjectStacking = true;

      restoredCanvas.loadFromJSON(subCanvasData, function() {
        // 以前のコードと同様の処理をここに記述
        restoredCanvas.backgroundColor = 'transparent';
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
            hoverCursor: usePointerCursor ? 'pointer' : 'default'
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
          hoverCursor: usePointerCursor ? 'pointer' : 'default',
          clipPath: new fabric.Circle({
            radius: radius,
            originX: 'center',
            originY: 'center',
          })
        });

        // グループをキャンバスの中央に配置
        group.set({
          left: restoredCanvas.width / 2,
          top: restoredCanvas.height / 2
        });

        restoredCanvas.clear().add(group);

        // グループをCanvasにフィットさせる
        var scaleX = canvasWidth / group.getScaledWidth();
        var scaleY = canvasHeight / group.getScaledHeight();
        var scaleToFit = Math.min(scaleX, scaleY);
        group.scale(scaleToFit).setCoords();
        restoredCanvas.renderAll();
      });
    }
  });
}
