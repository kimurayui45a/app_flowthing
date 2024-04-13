// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import * as bootstrap from "bootstrap"
import "./custom/header"
import "./custom/profile"
import "./custom/palletmodule"
import "./custom/item"
import "./custom/test"

//react
import React from 'react';
import { createRoot } from 'react-dom/client';
// import DraggableTest from './src/devicetest/DraggableTest';
// import DraggableRndTest from './src/devicetest/DraggableRndTest';
// import P5PenTest from './src/devicetest/P5PenTest';
//import P5PenDeviceTest from './src/devicetest/P5PenDeviceTest';
import DraggableArea from './src/DraggableArea';



console.log('アプリケーションjs')

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.fabicon')) {
    restoreSubCanvas();
  }
});

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.motto-miru')) {
    mottomiru();
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


function mottomiru() {
  const toggleButtons = document.querySelectorAll('.toggle-view');

  toggleButtons.forEach(function(toggleButton) {
    const parentElement = toggleButton.closest('.motto-miru');
    const defaultView = parentElement.querySelector('.default-view');
    const hiddenView = parentElement.querySelector('.hidden-view');

    if (defaultView && hiddenView) {
      toggleButton.addEventListener('click', function() {
        if (defaultView.style.display !== 'none') {
          defaultView.style.display = 'none';
          hiddenView.style.display = 'block';
          toggleButton.textContent = '閉じる';
        } else {
          defaultView.style.display = 'block';
          hiddenView.style.display = 'none';
          toggleButton.textContent = 'もっと見る';
        }
      });
    }
  });
}



//react
let dragRoot;


document.addEventListener('turbo:load', () => {
  // P5PenDeviceTest コンポーネントのマウント
  // const p5PenDeviceTestContainer = document.getElementById('reactP5PenDeviceTest');
  // if (p5PenDeviceTestContainer) {
  //   p5PenDeviceTestRoot = createRoot(p5PenDeviceTestContainer);
  //   p5PenDeviceTestRoot.render(<P5PenDeviceTest />);
  // }

  // DraggableArea コンポーネントのマウント
  const dragContainer = document.getElementById('react-drag');
  if (dragContainer) {
    dragRoot = createRoot(dragContainer); // dragRootを更新
    dragRoot.render(<DraggableArea />);
  }

});

document.addEventListener('turbo:before-cache', () => {
  // P5PenDeviceTest コンポーネントのアンマウント
  // if (p5PenDeviceTestRoot) {
  //   p5PenDeviceTestRoot.unmount();
  //   p5PenDeviceTestRoot = null;
  // }


  // DraggableArea コンポーネントのアンマウント
  if (dragRoot) {
    dragRoot.unmount();
    dragRoot = null; // dragRootをクリア
  }
});
