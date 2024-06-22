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
import DraggableArea from './src/DraggableArea';
import PixiTest from './src/PixiTest';
import NewItemCreate from './src/NewItemCreate';
// import LordItemCanvas from './src/LordItemCanvas';
// import LordItemSubUserShow from './src/LordItemSubUserShow';
import EditItemCanvas from './src/EditItemCanvas';
import NewSpaceCreate from './src/NewSpaceCreate';
// import LordSpaceCanvas from './src/LordSpaceCanvas';
import EditSpaceCanvas from './src/EditSpaceCanvas';
import NewCompositeCreate from './src/NewCompositeCreate';
import { LoadComposite } from './src/LoadComposite';
import EditComposite from './src/EditComposite';
import AllComposite from './src/AllComposite';
import EditSubUserCanvas from './src/EditSubUserCanvas';
import PeintSubUserCanvas from './src/PeintSubUserCanvas';
import SampleRoom from './src/SampleRoom';
import NewSubUserCreate from './src/NewSubUserCreate';
import NewProfileCanvas from './src/NewProfileCanvas';
import EditProfileCanvas from './src/EditProfileCanvas';

// document.addEventListener("turbo:load", function() {
//   if (document.querySelector('.fabicon')) {
//     restoreSubCanvas();
//   }
// });

document.addEventListener("turbo:load", function() {
  if (document.querySelector('.motto-miru')) {
    mottomiru();
  }
});


// function restoreSubCanvas() {
//   var canvasElement = document.getElementById('restoredSubCanvas');
//   var subCanvasData = JSON.parse(canvasElement.dataset.canvasJson);

//   if (canvasElement && subCanvasData) {
//     var restoredCanvas = new fabric.Canvas('restoredSubCanvas', {
//       width: 600, // キャンバスの幅
//       height: 400 // キャンバスの高さ
//     });
//     restoredCanvas.preserveObjectStacking = true;
//     var radius = 175;

//     restoredCanvas.loadFromJSON(subCanvasData, function() {
//       // オブジェクトが変形できないように設定
//       restoredCanvas.forEachObject(function(object) {
//         object.set({
//           hasControls: false,
//           hasBorders: false,
//           selectable: true,
//           lockMovementX: false,
//           lockMovementY: false,
//           lockRotation: true,
//           lockScalingX: true,
//           lockScalingY: true,
//           lockUniScaling: true
//         });
//       });

//       // // オブジェクトをグループ化し、縮小
//       var group = new fabric.Group(restoredCanvas.getObjects(), {
//         // scaleX: 100 / 350, // 元のサイズから縮小
//         // scaleY: 100 / 350,
//         // left: restoredCanvas.width / 2, // キャンバスの中央に配置
//         // top: restoredCanvas.height / 2,
//         originX: 'center',
//         originY: 'center',
//         hasControls: false,
//         hasBorders: false,
//         selectable: true,
//         lockRotation: true,
//         lockScalingX: true,
//         lockScalingY: true,
//         lockUniScaling: true,
//         clipPath: new fabric.Circle({
//           radius: radius,
//           originX: 'center',
//           originY: 'center',
//           // absolutePositioned: true
//         })
//       });

//       // キャンバスにグループを追加
//       restoredCanvas.clear().add(group);
//       // グループを縮小
//       group.scaleToWidth(150);
//       group.scaleToHeight(150);
//       restoredCanvas.renderAll();
//     });
//   }
// }


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



document.addEventListener("turbo:load", function() {
  var toggles = document.querySelectorAll('.accordion-toggle-sidebar');
  toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
              panel.style.display = "none";
          } else {
              panel.style.display = "block";
          }
      });
  });
});




//react
let dragRoot,
    pixiTestRoot,
    newItemCreateRoot,
    // lordItemCanvasRoot,
    // lordItemSubUserShowRoot,
    editItemCanvasRoot,
    newSpaceCreateRoot,
    // lordSpaceCanvasRoot,
    editSpaceCanvasRoot,
    newCompositeCreateRoot,
    loadCompositeRoot,
    editCompositeRoot,
    allCompositeRoot,
    editSubUserCanvasRoot,
    peintSubUserCanvasRoot,
    sampleRoomRoot,
    newNewSubUserCreateRoot,
    newProfileCanvasRoot,
    editProfileCanvasRoot;


document.addEventListener('turbo:load', () => {

  // DraggableArea コンポーネントのマウント
  const dragContainer = document.getElementById('react-drag');
  if (dragContainer) {
    dragRoot = createRoot(dragContainer); // dragRootを更新
    dragRoot.render(<DraggableArea />);
  }


  // PixiTest コンポーネントのマウント
  const pixiTestContainer = document.getElementById('reactPixiTest');
  if (pixiTestContainer) {
    pixiTestRoot = createRoot(pixiTestContainer);
    pixiTestRoot.render(<PixiTest />);
  }

  //「NewItemCreate」のマウント
  // const newItemCreateContainer = document.getElementById('reactNewItemCreate');
  // if (newItemCreateContainer) {
  //   const subUserId = newItemCreateContainer.getAttribute('data-user-id');
  //   if (subUserId) {
  //     try {
  //       newItemCreateRoot = createRoot(newItemCreateContainer);
  //       newItemCreateRoot.render(<NewItemCreate subUserId={subUserId} />);
  //     } catch (error) {
  //       console.error('React コンポーネントのマウントに失敗しました:', error);
  //       // ここでエラー処理を行う、ユーザーに通知するなど
  //     }
  //   } else {
  //     console.error('subUserId の取得に失敗しました。属性が正しく設定されていません。');
  //     // 適切なフォールバック処理を実施
  //   }
  // } else {
  //   console.error('NewItemCreateContainerが見つかりません。');
  //   // コンポーネントが存在しない場合の処理を行う
  // }

  //「NewItemCreate」のマウント
  const newItemCreateContainer = document.getElementById('reactNewItemCreate');
  if (newItemCreateContainer) {
    const subUserId = newItemCreateContainer.getAttribute('data-user-id');
    const spaceSize = Number(newItemCreateContainer.getAttribute('data-space-size'));
    const toolDateParameters = newItemCreateContainer.getAttribute('data-tool-parameters');
    const profileId = newItemCreateContainer.getAttribute('data-profile-id');
    newItemCreateRoot = createRoot(newItemCreateContainer);
    newItemCreateRoot.render(<NewItemCreate subUserId={subUserId} spaceSize={spaceSize} toolDateParameters={toolDateParameters} profileId={profileId} />);
  }


  // //「LordItemCanvas」のマウント
  // const lordItemCanvasContainer = document.getElementById('reactLordItemCanvas');
  // if (lordItemCanvasContainer) {
  //   const canvasImgId = lordItemCanvasContainer.getAttribute('data-item-id');
  //   const canvasData = lordItemCanvasContainer.getAttribute('data-canvas-data');
  //   lordItemCanvasRoot = createRoot(lordItemCanvasContainer);
  //   lordItemCanvasRoot.render(<LordItemCanvas canvasImgId={canvasImgId} canvasData={canvasData} />);
  // }


  // //「LordItemSubUserShow」のマウント
  // const lordItemSubUserShowContainers = document.querySelectorAll('[id^="reactLordItemSubUserShow_"]');

  // lordItemSubUserShowContainers.forEach(container => {
  //   const canvasImgId = container.getAttribute('data-item-id');
  //   const canvasData = container.getAttribute('data-canvas-data');
  //   const lordItemSubUserShowRoot = createRoot(container);
  //   lordItemSubUserShowRoot.render(<LordItemSubUserShow canvasImgId={canvasImgId} canvasData={canvasData} />);
  // });


  //「EditItemCanvas」のマウント
  const editItemCanvasContainer = document.getElementById('reactEditItemCanvas');
  if (editItemCanvasContainer) {
    const subUserId = editItemCanvasContainer.getAttribute('data-user-id');
    const canvasImgId = editItemCanvasContainer.getAttribute('data-item-id');

    const canvasData = editItemCanvasContainer.getAttribute('data-canvas-data');
    const canvasSaveData = editItemCanvasContainer.getAttribute('data-canvas-save-data');
    const canvasSizeData = editItemCanvasContainer.getAttribute('data-canvas-size-data');

    const canvasItemName = editItemCanvasContainer.getAttribute('data-item-name');
    const canvasItemText = editItemCanvasContainer.getAttribute('data-item-text');

    const canvasItemChoice = editItemCanvasContainer.getAttribute('data-item-choice');
    const canvasItemEpisode = editItemCanvasContainer.getAttribute('data-item-episode');
    const canvasItemPlace = editItemCanvasContainer.getAttribute('data-item-place');
    const spaceSize = Number(editItemCanvasContainer.getAttribute('data-space-size'));
    const toolDateParameters = editItemCanvasContainer.getAttribute('data-tool-parameters');
    const profileId = editItemCanvasContainer.getAttribute('data-profile-id');

    editItemCanvasRoot = createRoot(editItemCanvasContainer);
    editItemCanvasRoot.render(<EditItemCanvas canvasImgId={canvasImgId} canvasData={canvasData} subUserId={subUserId} canvasSaveData={canvasSaveData} canvasItemName={canvasItemName} canvasItemText={canvasItemText} canvasItemChoice={canvasItemChoice} canvasItemEpisode={canvasItemEpisode} canvasItemPlace={canvasItemPlace} canvasSizeData={canvasSizeData} spaceSize={spaceSize} toolDateParameters={toolDateParameters} profileId={profileId} />);
  }


  //「NewSpaceCreate」のマウント
  const newSpaceCreateContainer = document.getElementById('reactNewSpaceCreate');
  if (newSpaceCreateContainer) {
    const profileId = newSpaceCreateContainer.getAttribute('data-profile-id');
    const spaceSize = Number(newSpaceCreateContainer.getAttribute('data-space-size'));
    const toolDateParameters = newSpaceCreateContainer.getAttribute('data-tool-parameters');
    newSpaceCreateRoot = createRoot(newSpaceCreateContainer);
    newSpaceCreateRoot.render(<NewSpaceCreate profileId={profileId} spaceSize={spaceSize} toolDateParameters={toolDateParameters} />);
  }


  // //「LordSpaceCanvas」のマウント
  // const lordSpaceCanvasContainer = document.getElementById('reactLordSpaceCanvas');
  // if (lordSpaceCanvasContainer) {
  //   const canvasImgId = lordSpaceCanvasContainer.getAttribute('data-space-id');
  //   const canvasData = lordSpaceCanvasContainer.getAttribute('data-canvas-data');
  //   lordSpaceCanvasRoot = createRoot(lordSpaceCanvasContainer);
  //   lordSpaceCanvasRoot.render(<LordSpaceCanvas canvasImgId={canvasImgId} canvasData={canvasData} />);
  // }

  //「EditSpaceCanvas」のマウント
  const editSpaceCanvasContainer = document.getElementById('reactEditSpaceCanvas');
  if (editSpaceCanvasContainer) {
    const profileId = editSpaceCanvasContainer.getAttribute('data-profile-id');
    const canvasImgId = editSpaceCanvasContainer.getAttribute('data-space-id');

    const canvasData = editSpaceCanvasContainer.getAttribute('data-canvas-data');
    const canvasSaveData = editSpaceCanvasContainer.getAttribute('data-canvas-save-data');

    const canvasSpaceName = editSpaceCanvasContainer.getAttribute('data-space-name');
    const canvasSpaceText = editSpaceCanvasContainer.getAttribute('data-space-text');
    const spaceSize = Number(editSpaceCanvasContainer.getAttribute('data-space-size'));
    const toolDateParameters = editSpaceCanvasContainer.getAttribute('data-tool-parameters');

    editSpaceCanvasRoot = createRoot(editSpaceCanvasContainer);
    editSpaceCanvasRoot.render(<EditSpaceCanvas profileId={profileId} canvasImgId={canvasImgId} canvasData={canvasData} canvasSaveData={canvasSaveData}  canvasSpaceName={canvasSpaceName} canvasSpaceText={canvasSpaceText} spaceSize={spaceSize} toolDateParameters={toolDateParameters} />);
  }

  //「NewCompositeCreate」のマウント
  const newCompositeCreateContainer = document.getElementById('reactNewCompositeCreate');
  if (newCompositeCreateContainer) {
    const profileId = newCompositeCreateContainer.getAttribute('data-profile-id');
    const itemAllId = JSON.parse(newCompositeCreateContainer.getAttribute('data-item-id-all'));
    const spaceAllId = JSON.parse(newCompositeCreateContainer.getAttribute('data-space-id-all'));
    const subUserAllId = JSON.parse(newCompositeCreateContainer.getAttribute('data-sub-user-id-all'));
    const spaceSize = Number(newCompositeCreateContainer.getAttribute('data-space-size'));
    newCompositeCreateRoot = createRoot(newCompositeCreateContainer);
    newCompositeCreateRoot.render(<NewCompositeCreate profileId={profileId} itemAllId={itemAllId} spaceAllId={spaceAllId} subUserAllId={subUserAllId} spaceSize={spaceSize} />);
  }


  //「LoadComposite」のマウント
  const loadCompositeContainer = document.getElementById('reactLoadComposite');
  if (loadCompositeContainer) {
    const itemAllId = JSON.parse(loadCompositeContainer.getAttribute('data-item-id-all'));
    const spaceAllId = JSON.parse(loadCompositeContainer.getAttribute('data-space-id-all'));
    const subUserAllId = JSON.parse(loadCompositeContainer.getAttribute('data-sub-user-id-all'));
    const compositeId = loadCompositeContainer.getAttribute('data-composite-id');
    const spaceObject = loadCompositeContainer.getAttribute('data-space-data');
    const itemObject = loadCompositeContainer.getAttribute('data-item-data');
    loadCompositeRoot = createRoot(loadCompositeContainer);
    loadCompositeRoot.render(<LoadComposite compositeId={compositeId} itemAllId={itemAllId} spaceAllId={spaceAllId} subUserAllId={subUserAllId} spaceObject={spaceObject} itemObject={itemObject} />);
  }


  //「EditComposite」のマウント
  const editCompositeContainer = document.getElementById('reactEditComposite');
  if (editCompositeContainer) {
    const profileId = editCompositeContainer.getAttribute('data-profile-id');
    const compositeId = editCompositeContainer.getAttribute('data-composite-id');

    const itemAllId = JSON.parse(editCompositeContainer.getAttribute('data-item-id-all'));
    const spaceAllId = JSON.parse(editCompositeContainer.getAttribute('data-space-id-all'));
    const subUserAllId = JSON.parse(editCompositeContainer.getAttribute('data-sub-user-id-all'));
    
    const spaceObject = editCompositeContainer.getAttribute('data-space-data');
    const itemObject = editCompositeContainer.getAttribute('data-item-data');

    const compositeNameLode = editCompositeContainer.getAttribute('data-composite-name');
    const compositeTextLode = editCompositeContainer.getAttribute('data-composite-text');
    const compositeImage = editCompositeContainer.getAttribute('data-composite-image');
    const compositeSpaceId = editCompositeContainer.getAttribute('data-composite-space-id');
    const spaceSize = Number(editCompositeContainer.getAttribute('data-space-size'));
    editCompositeRoot = createRoot(editCompositeContainer);
    editCompositeRoot.render(<EditComposite profileId={profileId} compositeId={compositeId} itemAllId={itemAllId} spaceAllId={spaceAllId} subUserAllId={subUserAllId} spaceObject={spaceObject} itemObject={itemObject} compositeNameLode={compositeNameLode} compositeTextLode={compositeTextLode} compositeImage={compositeImage} compositeSpaceId={compositeSpaceId} spaceSize={spaceSize} />);
  }


  //「AllComposite」のマウント
  const allCompositeContainer = document.getElementById('reactAllComposite');
  if (allCompositeContainer) {
    const allComposite = JSON.parse(allCompositeContainer.getAttribute('data-composite-id-all'));
    const itemAllId = JSON.parse(allCompositeContainer.getAttribute('data-item-id-all'));
    const spaceAllId = JSON.parse(allCompositeContainer.getAttribute('data-space-id-all'));
    const subUserAllId = JSON.parse(allCompositeContainer.getAttribute('data-sub-user-id-all'));
    const profileId = JSON.parse(allCompositeContainer.getAttribute('data-profile-id'));
    allCompositeRoot = createRoot(allCompositeContainer);
    allCompositeRoot.render(<AllComposite allComposite={allComposite} itemAllId={itemAllId} spaceAllId={spaceAllId} subUserAllId={subUserAllId} profileId={profileId} />);
  }



  //「EditSubUserCanvas」のマウント
  const editSubUserCanvasContainer = document.getElementById('reactEditSubUserCanvas');
  if (editSubUserCanvasContainer) {
    const canvasImgId = editSubUserCanvasContainer.getAttribute('data-user-id');
    const profileId = editSubUserCanvasContainer.getAttribute('data-profile-id');
    const canvasSubUserName = editSubUserCanvasContainer.getAttribute('data-sub-user-name');
    const canvasSubUserText = editSubUserCanvasContainer.getAttribute('data-sub-user-text');
    const spaceSize = Number(editSubUserCanvasContainer.getAttribute('data-space-size'));
    const toolDateParameters = editSubUserCanvasContainer.getAttribute('data-tool-parameters');
    editSubUserCanvasRoot = createRoot(editSubUserCanvasContainer);
    editSubUserCanvasRoot.render(<EditSubUserCanvas profileId={profileId} canvasImgId={canvasImgId} canvasSubUserName={canvasSubUserName} canvasSubUserText={canvasSubUserText} spaceSize={spaceSize} toolDateParameters={toolDateParameters} />);
  }


  //「PeintSubUserCanvas」のマウント
  const peintSubUserCanvasContainer = document.getElementById('reactPeintSubUserCanvas');
  if (peintSubUserCanvasContainer) {
    const canvasImgId = peintSubUserCanvasContainer.getAttribute('data-user-id');
    const profileId = peintSubUserCanvasContainer.getAttribute('data-profile-id');
    const canvasSubUserName = peintSubUserCanvasContainer.getAttribute('data-sub-user-name');
    const canvasSubUserText = peintSubUserCanvasContainer.getAttribute('data-sub-user-text');
    const canvasData = peintSubUserCanvasContainer.getAttribute('data-sub-user-canvas');
    const spaceSize = Number(peintSubUserCanvasContainer.getAttribute('data-space-size'));
    const toolDateParameters = peintSubUserCanvasContainer.getAttribute('data-tool-parameters');
    peintSubUserCanvasRoot = createRoot(peintSubUserCanvasContainer);
    peintSubUserCanvasRoot.render(<PeintSubUserCanvas profileId={profileId} canvasImgId={canvasImgId} canvasSubUserName={canvasSubUserName} canvasSubUserText={canvasSubUserText} canvasData={canvasData} spaceSize={spaceSize} toolDateParameters={toolDateParameters} />);
  }


  // 「SampleRoom」のマウント
  const sampleRoomContainer = document.getElementById('react-sample-room');
  if (sampleRoomContainer) {
    sampleRoomRoot = createRoot(sampleRoomContainer);
    sampleRoomRoot.render(<SampleRoom />);
  }

  //「NewSubUserCreate」のマウント
  const newNewSubUserCreate = document.getElementById('reactNewSubUserCreate');
  if (newNewSubUserCreate) {
    const profileId = newNewSubUserCreate.getAttribute('data-profile-id');
    const spaceSize = Number(newNewSubUserCreate.getAttribute('data-space-size'));
    const toolDateParameters = newNewSubUserCreate.getAttribute('data-tool-parameters');
    newNewSubUserCreateRoot = createRoot(newNewSubUserCreate);
    newNewSubUserCreateRoot.render(<NewSubUserCreate profileId={profileId} spaceSize={spaceSize} toolDateParameters={toolDateParameters} />);
  }


  //「NewProfileCanvas」のマウント
  const newProfileCanvasContainer = document.getElementById('reactProfileCanvas');
  if (newProfileCanvasContainer) {
    const profileId = newProfileCanvasContainer.getAttribute('data-profile-id');
    const spaceSize = Number(newProfileCanvasContainer.getAttribute('data-space-size'));
    const toolDateParameters = newProfileCanvasContainer.getAttribute('data-tool-parameters');
    newProfileCanvasRoot = createRoot(newProfileCanvasContainer);
    newProfileCanvasRoot.render(<NewProfileCanvas spaceSize={spaceSize} profileId={profileId} toolDateParameters={toolDateParameters} />);
  }


  //「EditProfileCanvas」のマウント
  const editProfileCanvasContainer = document.getElementById('reactEditProfileCanvas');
  if (editProfileCanvasContainer) {
    const canvasData = editProfileCanvasContainer.getAttribute('data-profile-canvas');
    const spaceSize = Number(editProfileCanvasContainer.getAttribute('data-space-size'));
    const profileId = editProfileCanvasContainer.getAttribute('data-profile-id');
    const toolDateParameters = editProfileCanvasContainer.getAttribute('data-tool-parameters');
    editProfileCanvasRoot = createRoot(editProfileCanvasContainer);
    editProfileCanvasRoot.render(<EditProfileCanvas spaceSize={spaceSize} profileId={profileId} canvasData={canvasData} toolDateParameters={toolDateParameters} />);
  }

});

document.addEventListener('turbo:before-cache', () => {


  // DraggableArea コンポーネントのアンマウント
  if (dragRoot) {
    dragRoot.unmount();
    dragRoot = null; // dragRootをクリア
  }

  //PixiTestのアンマウント
  if (pixiTestRoot) {
    pixiTestRoot.unmount();
    pixiTestRoot = null;
  }

  //「NewItemCreate」のアンマウント
  // if (newItemCreateRoot) {
  //   try {
  //     newItemCreateRoot.unmount();
  //     newItemCreateRoot = null;
  //   } catch (error) {
  //     console.error('React コンポーネントのアンマウントに失敗しました:', error);
  //     // アンマウント失敗時のエラー処理
  //   }
  // }
  if (newItemCreateRoot) {
    newItemCreateRoot.unmount();
    newItemCreateRoot = null;
  }


  // //「LordItemCanvas」のアンマウント
  // if (lordItemCanvasRoot) {
  //   lordItemCanvasRoot.unmount();
  //   lordItemCanvasRoot = null;
  // }

  // //「LordItemSubUserShow」のアンマウント
  // if (lordItemSubUserShowRoot) {
  //   lordItemSubUserShowRoot.unmount();
  //   lordItemSubUserShowRoot = null;
  // }

  //「EditItemCanvas」のアンマウント
  if (editItemCanvasRoot) {
    editItemCanvasRoot.unmount();
    editItemCanvasRoot = null;
  }

  //「NewSpaceCreate」のアンマウント
  if (newSpaceCreateRoot) {
    newSpaceCreateRoot.unmount();
    newSpaceCreateRoot = null;
  }
  
  // //「NewSpaceCreate」のアンマウント
  // if (lordSpaceCanvasRoot) {
  //   lordSpaceCanvasRoot.unmount();
  //   lordSpaceCanvasRoot = null;
  // }

  //「EditSpaceCanvas」のアンマウント
  if (editSpaceCanvasRoot) {
    editSpaceCanvasRoot.unmount();
    editSpaceCanvasRoot = null;
  }

  //「NewCompositeCreate」のアンマウント
  if (newCompositeCreateRoot) {
    newCompositeCreateRoot.unmount();
    newCompositeCreateRoot = null;
  }

  //「LoadComposite」のアンマウント
  if (loadCompositeRoot) {
    loadCompositeRoot.unmount();
    loadCompositeRoot = null;
  }


  //「EditComposite」のアンマウント
  if (editCompositeRoot) {
    editCompositeRoot.unmount();
    editCompositeRoot = null;
  }


  //「AllComposite」のアンマウント
  if (allCompositeRoot) {
    allCompositeRoot.unmount();
    allCompositeRoot = null;
  }

  //「EditSubUserCanvas」のアンマウント
  if (editSubUserCanvasRoot) {
    editSubUserCanvasRoot.unmount();
    editSubUserCanvasRoot = null;
  }


  //「PeintSubUserCanvas」のアンマウント
  if (peintSubUserCanvasRoot) {
    peintSubUserCanvasRoot.unmount();
    peintSubUserCanvasRoot = null;
  }


  // 「SampleRoom」のアンマウント
  if (sampleRoomRoot) {
    sampleRoomRoot.unmount();
    sampleRoomRoot = null;
  }

  //「NewSubUserCreate」のアンマウント
  if (newNewSubUserCreateRoot) {
    newNewSubUserCreateRoot.unmount();
    newNewSubUserCreateRoot = null;
  }


  //「NewProfileCanvas」のアンマウント
  if (newProfileCanvasRoot) {
    newProfileCanvasRoot.unmount();
    newProfileCanvasRoot = null;
  }


  //「EditProfileCanvas」のアンマウント
  if (editProfileCanvasRoot) {
    editProfileCanvasRoot.unmount();
    editProfileCanvasRoot = null;
  }

});
