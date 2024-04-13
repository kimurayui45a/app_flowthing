import React, { useState } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';

const DraggableArea = ({ canvasImgId, canvasData }) => {
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });

    //canvasの外枠のサイズを決めるもの
    const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1200, height: 800 });

    //canvasのドラッグ範囲のサイズを決めるもの
    const [canvasDragSpaceSize, setCanvasDragSpaceSize] = useState({ width: 800, height: 600 });

  return (
    <div>
      <P5CanvasSet
        // key={canvasImgId}
        // canvasImgId={canvasImgId}
        // canvasData={canvasData}
        canvasSize={canvasSize}
        canvasSpaceSize={canvasSpaceSize}
        canvasDragSpaceSize={canvasDragSpaceSize}
      />
    </div>
  );
};
export default DraggableArea;