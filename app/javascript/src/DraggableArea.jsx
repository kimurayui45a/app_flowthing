import React, { useState } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';
import { PixiSample } from './components/PixiSample';

const DraggableArea = ({ canvasImgId, canvasData }) => {
  const [canvasSize, setCanvasSize] = useState({ width: 200, height: 200 });

    //canvasの外枠のサイズを決めるもの
    const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1000, height: 562 });

    //サンプル用
    const [canvasP5ToPixi, setCanvasP5ToPixi] = useState('sample');


  return (
    <div>
      <P5CanvasSet
        // key={canvasImgId}
        // canvasImgId={canvasImgId}
        // canvasData={canvasData}
        canvasSize={canvasSize}
        canvasSpaceSize={canvasSpaceSize}
        setCanvasP5ToPixi={setCanvasP5ToPixi}
        canvasP5ToPixi={canvasP5ToPixi}
      />

<PixiSample canvasP5ToPixi={canvasP5ToPixi} />
    </div>
  );
};
export default DraggableArea;