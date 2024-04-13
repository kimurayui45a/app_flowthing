import React, { useEffect, useState } from 'react';
import { useP5ToolModeContext } from './P5ModeContext';
// import { useP5CanvasCoreShare } from './P5CanvasCoreShareContext';
import { useP5PanelGroupContext } from './P5PanelGroupContext';
import { Rnd } from 'react-rnd';
import { DetailPen } from './p5partscomponents/DetailPen';
import { DetailSelect } from './p5partscomponents/DetailSelect';

const P5DetailPanel = () => {

  const { 
    setP5DrawingEnabled,
    handlePanelDragStop,
    isDraggablePanel,
    detailPanelVisible,
    detailPanelPosition,
    setDetailPanelPosition,
    toggleDetailPanelClose
  } = useP5PanelGroupContext();

  const {
    detailGroup,
    setDetailGroup
  } = useP5ToolModeContext();

  const handleBackgroundTouch = (e) => {
    // フォーム要素以外がタッチされた場合、ドキュメント全体からフォーカスを外す
    if (!e.target.classList.contains('no-drag')) {
      document.activeElement.blur();
    }
  };

  //パネル内容の切り替え「ペンツール」と「選択ツール」と「その他」で切り替える
  const renderDetail = (group) => {
    switch (group) {
      case 'penToolGroup':
        return <DetailPen />;
      case 'selectToolGroup':
        return <DetailSelect />;
      default:
        return <span>設定はありません。</span>;
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
      position={{ x: detailPanelPosition.x, y: detailPanelPosition.y }}
      onMouseDown={() => setP5DrawingEnabled(false)}
      onTouchStart={(e) => {
        setP5DrawingEnabled(false);
        handleBackgroundTouch(e);
      }}
      onDragStop={(e, d) => handlePanelDragStop(setDetailPanelPosition, e, d)}
      size={{ width: 250, height: 400 }}
      style={{ position: 'absolute', zIndex: 36 }}
      disableDragging={!isDraggablePanel}
      cancel=".no-drag"
    >
      
    <div className="panel-title">
      <span>詳細設定</span>

      {/* 閉じる */}
      <div className="close-btn-position">
        {detailPanelVisible && (
          <div
            className="close-btn tooltip-container"
            onClick={toggleDetailPanelClose}
            onTouchStart={toggleDetailPanelClose}
          >
            <i className="bi bi-x-lg"></i>
            <span className="tooltip-text">閉じる</span>
          </div>
        )}
      </div>
    </div>

    {/* パネル内容の切り替え */}
    {renderDetail(detailGroup)}

    </Rnd>
  );
};


export { P5DetailPanel };