import React, { useState } from 'react';
import P5UserCanvas from './components/P5UserCanvas';

const LordItemSubUserShow = ({ canvasImgId, canvasData }) => {
  const [canvasSize, setCanvasSize] = useState({ width: 100, height: 100 });

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
export default LordItemSubUserShow;