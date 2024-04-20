import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiListSpaceContext } from './PixiListSpaceContext';
import { PixiListItemContext } from './PixiListItemContext';


const PixiListPanel = ({ itemAllId, spaceAllId }) => {


  // useEffect(() => {
  //   console.log('アイテム', itemAllId);

  //   itemAllId.forEach(item => {
  //     console.log(`Name: ${item.item_name}`);
  //   });

  // }, []);

  const {
    listPanelPosition,
    setListPanelPosition,
    handlePixiPanelDragStop,
    pixiListTabMode,
    setPixiListTabMode,
    toggleCustomPanelVisible
  } = usePixiGroup();


  const {
    handleAddSprite
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
      position={{ x: listPanelPosition.x, y: listPanelPosition.y }}
      // onMouseDown={() => setP5DrawingEnabled(false)}
      onTouchStart={(e) => {
        // setP5DrawingEnabled(false);
        handleBackgroundTouch(e);
      }}
      onDragStop={(e, d) => handlePixiPanelDragStop(setListPanelPosition, e, d)}
      size={{ width: 250, height: 400 }}
      style={{ position: 'absolute', zIndex: 36 }}
      // disableDragging={!isDraggablePanel}
      cancel=".no-drag"
    >

<div className="panel-title">
  <span>リスト</span>
  </div>


  <div className="select-detail-tool-container">
  <div className="flex">
    <div
      className="select-tool-tabbtn tooltip-container"
      onClick={() => setPixiListTabMode(true)}
      onTouchStart={() => setPixiListTabMode(true)}
      style={{
        backgroundColor: pixiListTabMode ? '#777777' : '#616161',
        borderBottom: pixiListTabMode ? 'none' : '1px solid #4A4A4A',
        color: pixiListTabMode ? '#ececec' : '#343434'
      }}
    >
      <span>アイテム</span>
      <span className="tooltip-text">アイテムリストタブ</span>
    </div>

    <div
      className="shapes-tool-tabbtn tooltip-container"
      onClick={() => setPixiListTabMode(false)}
      onTouchStart={() => setPixiListTabMode(false)}
      style={{
        backgroundColor: !pixiListTabMode ? '#777777' : '#616161',
        borderBottom: !pixiListTabMode ? 'none' : '1px solid #4A4A4A',
        color: !pixiListTabMode ? '#ececec' : '#343434'
      }}
    >
      <span>スペース</span>
      <span className="tooltip-text">スペースリストタブ</span>
    </div>
  </div>


  <div className="select-detail-tool-group">


    {/* グループ分岐 */}
    {pixiListTabMode ? (
      //アイテム
      <PixiListItemContext itemAllId={itemAllId} />
    ) : (
      //スペース
      <PixiListSpaceContext spaceAllId={spaceAllId} />
    )}
  </div>

</div>


  </Rnd>
  );
};


export { PixiListPanel };