import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';



const PixiListSpaceContext = ({ spaceAllId }) => {


  const {
    listPanelPosition,
    setListPanelPosition,
    handlePixiPanelDragStop,
    toggleCustomPanelVisible
  } = usePixiGroup();


  const {
    handleAddSpace,
    spaceAnimMode,
    handleSpaceAnimAdd,
    spaceInfo
  } = usePixiComponentShare();

  const space = spaceInfo && spaceInfo.space_id 
    ? spaceAllId.find(s => s.id === spaceInfo.space_id) 
    : null;

  // 見つかったspaceのspace_canvasを使用して画像を表示
  const imageUrl = space ? space.space_canvas : null;

  const imageName = space ? space.space_name : '選択なし';

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
        <span className="tooltip-text">Screenのアニメーション</span>
      </div>

      <div style={{ position: 'relative', marginBottom: '8px' }} className="flex-column">
        <div className="pixi-space-preview-container">
          <div className="pixi-space-preview-background flex">
            {imageUrl ? 
              <img src={imageUrl} alt={imageName} />
              : null
            }
          </div>
        </div>
        <div style={{ marginTop: '-5px' }}><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>現在のメインScreen</span></div>
        <div className="pixi-list-select-name">
          <div className="angleDegrees_value"><span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>{imageName}</span></div>
          <i className="bi bi-arrow-down-up"></i>
        </div>
      </div>

      {/* スペースリスト */}
      <div style={{ overflowY: 'auto', height: '200px', display: 'flex', flexDirection: 'column', width:'232px' }}>
        <div className="pixi-space-list-block">
        {spaceAllId.map((space, index) => (
          <div key={index} className="flex-column-start pixi-space-list-background" style={{ width: '70px', height: '60px', border: '1px solid #ccc', margin: '3px', borderRadius: '3px' }}>
            {!spaceAnimMode ? (
              <>
                <div
                  onClick={() => handleAddSpace(space.id)}
                  onTouchStart={() => handleAddSpace(space.id)}
                  style={{ border: '1px solid #ccc', width: '60px', marginTop: '2px' }}
                  >
                    <div>
                  <img src={space.space_canvas} alt="Canvas Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                <div>
                  
                  <div style={{ width: '60px', height: '10px', marginTop: '-10px' }}>
                    <div className="angleDegrees_value">
                      <span className="text-Rounded" style={{ fontSize: '8px', color: '#ececec' }}>
                        {space.space_name}
                      </span>
                    </div>
                  </div>
                </div>
                </div>
                </>
            ) : (
              <>
              <div
                onClick={() => handleSpaceAnimAdd(space.id, space.space_name)}
                onTouchStart={() => handleSpaceAnimAdd(space.id, space.space_name)}
                style={{ border: '1px solid #ccc', width: '60px', marginTop: '2px' }}
                >
                  <div>
                <img src={space.space_canvas} alt="Canvas Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                  
                <div style={{ width: '60px', height: '10px', marginTop: '-10px' }}>
                  <div className="angleDegrees_value">
                    <span className="text-Rounded" style={{ fontSize: '8px', color: '#ececec' }}>
                      {space.space_name}
                    </span>
                  </div>
                </div>
                </div>
              </>
            )}
          </div>   
        ))}
        </div>
      </div>
    </>
  );
};


export { PixiListSpaceContext };