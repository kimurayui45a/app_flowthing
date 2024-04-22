import React, { useState } from 'react';
import P5UserCanvas from './components/P5UserCanvas';

const LordSpaceCanvas = ({ canvasImgId, canvasData }) => {
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 225 });

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
export default LordSpaceCanvas;