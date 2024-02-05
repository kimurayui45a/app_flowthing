//app/javascript/src/DraggableArea.jsx
import React from 'react';
import { DraggableSquare } from './components/DraggableSquare';// パスは適宜調整してください

function DraggableArea() {
  return (
    <div style={{ width: '800px', height: '600px', position: 'relative', border: '1px solid #000' }}>
      <DraggableSquare color="red" initialX={100} initialY={100} />
      <DraggableSquare color="blue" initialX={200} initialY={200} />
    </div>
  );
}

export default DraggableArea;
