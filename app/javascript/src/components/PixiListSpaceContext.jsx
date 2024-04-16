import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';



const PixiListSpaceContext = ({ spaceAllId }) => {


  const {
    listPanelPosition,
    setListPanelPosition,
    handlePixiPanelDragStop
  } = usePixiGroup();


  const {
    handleAddSpace
  } = usePixiComponentShare();



  return (

<>

        
        {spaceAllId.map((space, index) => (
        <div key={index} className="flex">
          <div style={{ margin: '10px', border: '1px solid #ccc', padding: '2px', maxWidth: '50px', maxHeight: '50px' }}>
          <img src={space.space_canvas} alt="Canvas Image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>


          <div>
            <span>{space.id}</span>
          </div>

          <div
            onClick={() => handleAddSpace(space.id)}
            onTouchStart={() => handleAddSpace(space.id)}
            style={{ width: '20px', height: '20px', margin: '10px' }}
          >
            ボタン
          </div>
        </div>
      ))}
</>
  );
};


export { PixiListSpaceContext };