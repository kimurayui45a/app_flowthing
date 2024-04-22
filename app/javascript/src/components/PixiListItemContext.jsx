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
      {/* カスタムパネルを開くボタン */}
      <div
        className="panel-tool-button tooltip-container"
        onClick={toggleCustomPanelVisible}
        onTouchStart={toggleCustomPanelVisible}
        style={{ position: 'absolute', top: '12px', left: '8px' }}
      >
        <i className="bi bi-collection-play"></i>
        <span className="tooltip-text">Flow Thingの調整・アニメーション</span>
      </div>

      <div
        className="panel-tool-button tooltip-container"
        onClick={handleRemoveSprite}
        onTouchStart={handleRemoveSprite}
        style={{ position: 'absolute', top: '12px', left: '45px' }}
      >
        <i className="bi bi-trash3-fill"></i>
        <span className="tooltip-text">選択中のFlow Thingを削除</span>
      </div>

      <div className="bi-arrow-position"><i className="bi bi-arrow-down-up"></i></div>


          <div style={{ overflowY: 'auto', height: '285px', display: 'flex', flexDirection: 'column', width:'232px', marginTop: '38px' }}>
            <div className="pixi-space-list-block">
              {itemAllId.map((item, index) => (
              <div key={index} className="flex pixi-space-list-background" style={{ width: '70px', height: '70px', border: '1px solid #ccc', margin: '3px', borderRadius: '3px' }}>
                <div
                  onClick={() => handleAddSprite(item.id, item.image_choice, item.sub_user_id)}
                  onTouchStart={() => handleAddSprite(item.id, item.image_choice, item.sub_user_id)}
                  style={{ border: '1px solid #ccc', width: '60px' }}
                >
                  <div>
                  {item.image_choice === 'item_canvas' && item.item_canvas ? (
                    <img src={item.item_canvas} alt="Canvas Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : item.image_choice === 'item_image' && item.item_image ? (
                    <img src={item.item_image.url} alt="Uploaded Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <div className="flex angleDegrees_value" style={{ justifyContent: 'flex-start' }}><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{item.item_name}</span></div>
                  )}
                  </div>
                      

                  {/* <div>
                    <div style={{ width: '60px', height: '10px', marginTop: '-10px' }}>
                      <div className="angleDegrees_value">
                        <span className="text-Rounded" style={{ fontSize: '8px', color: '#ececec' }}>
                          {space.space_name}
                        </span>
                      </div>
                    </div>
                  </div> */}

                </div>
            </div>
          ))}
        </div>
      </div>
</>
  );
};


export { PixiListItemContext };