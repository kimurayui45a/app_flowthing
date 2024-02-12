import React from 'react';
import Draggable from 'react-draggable';

function DraggableTest() {
  return (
    <div style={{ width: '400px', height: '300px', position: 'relative', border: '1px solid black' }}>
      <Draggable
        bounds="parent" // ドラッグ可能エリアを親要素に制限
      >
        <div style={{ width: '100px', height: '100px', backgroundColor: 'orange', cursor: 'grab' }}>
          
        </div>
      </Draggable>
    </div>
  );
}

export default DraggableTest;
