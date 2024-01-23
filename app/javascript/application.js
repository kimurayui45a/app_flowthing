// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"
import "./custom/header"
import "./custom/profile"
import "./custom/palletmodule"
import "./custom/item"


console.log('アプリケーションjs')


document.addEventListener("turbo:load", function() {
  if (document.querySelector('.fabicon')) {
    restoreSubCanvas();
  }
});





function restoreSubCanvas() {
  var canvasElement = document.getElementById('restoredSubCanvas');
  var subCanvasData = JSON.parse(canvasElement.dataset.canvasJson);

  if (canvasElement && subCanvasData) {
    var restoredCanvas = new fabric.Canvas('restoredSubCanvas', {
      width: 600, // キャンバスの幅
      height: 400 // キャンバスの高さ
    });
    restoredCanvas.preserveObjectStacking = true;
    var radius = 175;

    restoredCanvas.loadFromJSON(subCanvasData, function() {
      // オブジェクトが変形できないように設定
      restoredCanvas.forEachObject(function(object) {
        object.set({
          hasControls: false,
          hasBorders: false,
          selectable: true,
          lockMovementX: false,
          lockMovementY: false,
          lockRotation: true,
          lockScalingX: true,
          lockScalingY: true,
          lockUniScaling: true
        });
      });

      // // オブジェクトをグループ化し、縮小
      var group = new fabric.Group(restoredCanvas.getObjects(), {
        // scaleX: 100 / 350, // 元のサイズから縮小
        // scaleY: 100 / 350,
        // left: restoredCanvas.width / 2, // キャンバスの中央に配置
        // top: restoredCanvas.height / 2,
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        selectable: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        clipPath: new fabric.Circle({
          radius: radius,
          originX: 'center',
          originY: 'center',
          // absolutePositioned: true
        })
      });

      // キャンバスにグループを追加
      restoredCanvas.clear().add(group);
      // グループを縮小
      group.scaleToWidth(150);
      group.scaleToHeight(150);
      restoredCanvas.renderAll();
    });
  }
}

