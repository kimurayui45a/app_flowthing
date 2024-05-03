import React, { useState } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';
import { PixiSample } from './components/PixiSample';

const DraggableArea = ({ canvasImgId, canvasData }) => {
  const [canvasSize, setCanvasSize] = useState({ width: 200, height: 200 });

    //canvasの外枠のサイズを決めるもの
    const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 700, height: 500 });

    //サンプル用
    const [canvasP5ToPixi, setCanvasP5ToPixi] = useState('sample');

    const [samplePanelPosition, setSamplePanelPosition] = useState({
      main_pane: { x: 350, y: 20 },
      layers_info_panel: { x: 100, y: 50 },
      color_palette_panel: { x: 100, y: 100 },
      scale_panel_position: { x: 200, y: 50 },
      detail_panel_position: { x: 400, y: 50 },
      size_panel_position: { x: 100, y: 100, width: 250, height: 170 }
    });

  return (
    <>
      <div>


          <div className="flex-start-start-flex-center">
            <div className="potta-one t-text" style={{ fontSize: "30px", marginTop: "20px" }}>イラストを描き</div>
            <P5CanvasSet
              // key={canvasImgId}
              // canvasImgId={canvasImgId}
              // canvasData={canvasData}
              canvasSize={canvasSize}
              canvasSpaceSize={canvasSpaceSize}
              setCanvasP5ToPixi={setCanvasP5ToPixi}
              canvasP5ToPixi={canvasP5ToPixi}
              samplePanelPosition={samplePanelPosition}
            />
          </div>
          <div className="flex-start-start-flex-center">
          
    <PixiSample canvasP5ToPixi={canvasP5ToPixi} />
    <div className="potta-one t-text" style={{ fontSize: "30px", marginTop: "20px" }}>イラストを配置・アニメーションを付与</div>
    </div>

      </div>
    </>
  );
};
export default DraggableArea;