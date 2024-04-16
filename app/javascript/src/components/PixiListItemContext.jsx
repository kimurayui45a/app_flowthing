import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';



const PixiListItemContext = ({ itemAllId }) => {


  const {
    listPanelPosition,
    setListPanelPosition,
    handlePixiPanelDragStop
  } = usePixiGroup();


  const {
    handleAddSprite
  } = usePixiComponentShare();



  return (

<>

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
            onClick={() => handleAddSprite(item.id, item.image_choice)}
            onTouchStart={() => handleAddSprite(item.id, item.image_choice)}
            style={{ width: '20px', height: '20px', margin: '10px' }}
          >
            ボタン
          </div>
        </div>
      ))}
</>
  );
};


export { PixiListItemContext };