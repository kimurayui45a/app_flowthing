import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiPanelParts } from './PixiPanelParts';



const PixiListItemContext = ({ itemAllId }) => {


  const {
    listPanelPosition,
    setListPanelPosition,
    handlePixiPanelDragStop,
    toggleCustomPanelVisible
  } = usePixiGroup();


  const {
    handleAddSprite,
    handleRemoveSprite
  } = usePixiComponentShare();



  return (

<>

<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleRemoveSprite} formTitle="削除" />


          {/* カスタムパネルを開くボタン */}
          <div
            className="panel-tool-button tooltip-container"
            onClick={toggleCustomPanelVisible}
            onTouchStart={toggleCustomPanelVisible}
          >
            <i className="bi bi-collection-play"></i>
            <span className="tooltip-text">アイテムの調整・アニメーション</span>
          </div>

          <div style={{ overflowY: 'auto', height: '222px', display: 'flex', flexDirection: 'column' }}>
        {/* <div ref={containerRef}></div>; */}
        {itemAllId.map((item, index) => (
        <div key={index} className="flex">
          <div style={{ margin: '10px', border: '1px solid #ccc', padding: '2px', maxWidth: '50px', maxHeight: '50px' }}>
          {item.image_choice === 'item_canvas' && item.item_canvas ? (
            <img src={item.item_canvas} alt="Canvas Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : item.image_choice === 'item_image' && item.item_image ? (
            <img src={item.item_image.url} alt="Uploaded Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <p>No Image</p>
          )}
          </div>


          <div>
            <span>{item.id}</span>
          </div>

          <div
            onClick={() => handleAddSprite(item.id, item.image_choice, item.sub_user_id)}
            onTouchStart={() => handleAddSprite(item.id, item.image_choice, item.sub_user_id)}
            style={{ width: '20px', height: '20px', margin: '10px' }}
          >
            ボタン
          </div>
        </div>
      ))}
      </div>
</>
  );
};


export { PixiListItemContext };