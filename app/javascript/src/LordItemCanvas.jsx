import React, { useState } from 'react';
import P5UserCanvas from './components/P5UserCanvas';

const LordItemCanvas = ({ canvasImgId, canvasData }) => {
  const [canvasSize, setCanvasSize] = useState({ width: 150, height: 150 });

  return (
    <div>
      <P5UserCanvas
        key={canvasImgId}
        canvasImgId={canvasImgId}
        canvasData={canvasData}
        canvasSize={canvasSize}
      />
    </div>
  );
};
export default LordItemCanvas;