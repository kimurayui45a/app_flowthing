import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';


const PixiDetailPanel = ({ itemAllId }) => {

  const [selectedItem, setSelectedItem] = useState(null);

  const {
    pixiDetailPanelPosition,
    setPixiDetailPanelPosition,
    handlePixiPanelDragStop,
    togglePixiDetailPanelClose
  } = usePixiGroup();


  const {
    activeSprite,
    spriteInfo
  } = usePixiComponentShare();

  const handleBackgroundTouch = (e) => {
    // フォーム要素以外がタッチされた場合、ドキュメント全体からフォーカスを外す
    if (!e.target.classList.contains('no-drag')) {
      document.activeElement.blur();
    }
  };

  useEffect(() => {
    const sprite = spriteInfo.find(s => s.sprite_id === activeSprite);
    if (sprite) {
      const item = itemAllId.find(item => item.id === sprite.item_id);
      setSelectedItem(item);
    } else {
      setSelectedItem(null);
    }
  }, [activeSprite]);


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
      position={{ x: pixiDetailPanelPosition.x, y: pixiDetailPanelPosition.y }}
      // onMouseDown={() => setP5DrawingEnabled(false)}
      onTouchStart={(e) => {
        // setP5DrawingEnabled(false);
        handleBackgroundTouch(e);
      }}
      onDragStop={(e, d) => handlePixiPanelDragStop(setPixiDetailPanelPosition, e, d)}
      size={{ width: 250, height: 400 }}
      style={{ position: 'absolute', zIndex: 36 }}
      // disableDragging={!isDraggablePanel}
      cancel=".no-drag"
    >
      <div className="panel-title">
        <span>アイテム詳細</span>


        {/* 閉じる */}
        <div className="close-btn-position">
  
            <div
              className="close-btn tooltip-container"
              onClick={togglePixiDetailPanelClose}
              onTouchStart={togglePixiDetailPanelClose}
            >
              <i className="bi bi-x-lg"></i>
              <span className="tooltip-text">閉じる</span>
            </div>
        
        </div>
      </div>
      <div key={selectedItem?.id}>
      {selectedItem ? (
        <div className="item-info">
          
          <a href={`/items/${selectedItem.id}`}>View Details for Item ID: {selectedItem.id}</a>
          <span>名前: {selectedItem.item_name}</span>
        </div>
      ) : (
        <span>アイテム情報がありません</span>
      )}
    </div>

  </Rnd>
  );
};


export { PixiDetailPanel };