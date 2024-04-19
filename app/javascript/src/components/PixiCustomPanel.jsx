import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiItemCustom } from './PixiItemCustom';
import { PixiSpaceCustom } from './PixiSpaceCustom';


const PixiCustomPanel = () => {


  const {
    customPanelPosition,
    setCustomPanelPosition,
    handlePixiPanelDragStop,
    pixiListTabMode,
    toggleCustomPanelClose
  } = usePixiGroup();

  const {

  } = usePixiComponentShare();

  const handleBackgroundTouch = (e) => {
    // フォーム要素以外がタッチされた場合、ドキュメント全体からフォーカスを外す
    if (!e.target.classList.contains('no-drag')) {
      document.activeElement.blur();
    }
  };




  return (
    <Rnd
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      bounds="parent"
      className="control-panel"
      position={{ x: customPanelPosition.x, y: customPanelPosition.y }}
      // onMouseDown={() => setP5DrawingEnabled(false)}
      onTouchStart={(e) => {
        // setP5DrawingEnabled(false);
        handleBackgroundTouch(e);
      }}
      onDragStop={(e, d) => handlePixiPanelDragStop(setCustomPanelPosition, e, d)}
      size={{ width: 250, height: 400 }}
      style={{ position: 'absolute', zIndex: 36 }}
      // disableDragging={!isDraggablePanel}
      cancel=".no-drag"
    >

<div className="panel-title">
  <span>カスタム</span>

        {/* 閉じる */}
        <div className="close-btn-position">
          
            <div
              className="close-btn tooltip-container"
              onClick={toggleCustomPanelClose}
              onTouchStart={toggleCustomPanelClose}
            >
              <i className="bi bi-x-lg"></i>
              <span className="tooltip-text">閉じる</span>
            </div>
          
        </div>


  </div>

<div className="select-detail-tool-group">
    {/* グループ分岐 */}
    {pixiListTabMode ? (
      //アイテム
      <PixiItemCustom />
    ) : (
      //スペース
      <PixiSpaceCustom />
    )}
  </div>

  </Rnd>
  );
};


export { PixiCustomPanel };