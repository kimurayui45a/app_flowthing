import React, { useState } from 'react';
import { P5CanvasSet } from './components/P5CanvasSet';
import { PixiSample } from './components/PixiSample';
import { PixiGroupSampleProvider } from './PixiGroupSampleContext';


const DraggableArea = () => {
  const [canvasSize, setCanvasSize] = useState({ width: 200, height: 200 });

  const [canvasSizeChange, setCanvasSizeChange] = useState(1000);

  const [updateTrigger, setUpdateTrigger] = useState(0);

    //canvasの外枠のサイズを決めるもの
    const [canvasSpaceSize, setCanvasSpaceSize] = useState({ width: 1000, height: 600 });

    //サンプル用
    const [canvasP5ToPixi, setCanvasP5ToPixi] = useState('sample');

    const [samplePanelPosition, setSamplePanelPosition] = useState({
      main_pane: { x: 600, y: 20 },
      layers_info_panel: { x: 100, y: 50 },
      color_palette_panel: { x: 100, y: 100 },
      scale_panel_position: { x: 200, y: 50 },
      detail_panel_position: { x: 400, y: 50 },
      size_panel_position: { x: 100, y: 100, width: 250, height: 170 }
    });


    const handleCanvasSizeChangeButton = (size) => {
      if (canvasSizeChange !== size) {
        setCanvasSizeChange(size)
        setCanvasSpaceSize({ width: size, height: 600 });
        setCanvasP5ToPixi('sample')
    
        // 共通のパネル設定
        const basePanelPositions = {
          layers_info_panel: { x: 100, y: 50 },
          color_palette_panel: { x: 100, y: 100 },
          scale_panel_position: { x: 200, y: 50 },
          detail_panel_position: { x: 400, y: 50 },
          size_panel_position: { x: 100, y: 100, width: 250, height: 170 }
        };
    
        // main_pane の位置はサイズに応じて変更
        const mainPanePosition = size === 700 ? { x: 350, y: 20 } : { x: 600, y: 20 };
    
        // 新しいパネル位置を設定
        setSamplePanelPosition({
          ...basePanelPositions,
          main_pane: mainPanePosition
        });
      }
    };
    
      // const handleSample = () => {
      //   setUpdateTrigger(prev => prev + 1);
      // };


  return (
    <>
      <div className="flex-column">

      <div className="potta-one t-text" style={{ fontSize: "30px", marginTop: "20px" }}>イラストを描き</div>
      <div className="flex">
        <div
          className="select-confirm-btn"
          onClick={() => handleCanvasSizeChangeButton(1000)}
          onTouchStart={() => handleCanvasSizeChangeButton(1000)}
          style={{ width: 'auto', height: 'auto', padding: '2px 12px', marginTop: '5px' }}
        >
          1000
        </div>
        <div
          className="select-confirm-btn"
          onClick={() => handleCanvasSizeChangeButton(700)}
          onTouchStart={() => handleCanvasSizeChangeButton(700)}
          style={{ width: 'auto', height: 'auto', padding: '2px 12px', marginTop: '5px' }}
        >
          700
        </div>
      </div>


          <div>
            
            <P5CanvasSet
              key={canvasSizeChange}
              // canvasImgId={canvasImgId}
              // canvasData={canvasData}
              canvasSize={canvasSize}
              canvasSpaceSize={canvasSpaceSize}
              setCanvasP5ToPixi={setCanvasP5ToPixi}
              canvasP5ToPixi={canvasP5ToPixi}
              updateTrigger={updateTrigger}
              setUpdateTrigger={setUpdateTrigger}
              samplePanelPosition={samplePanelPosition}
            />
          </div>




          <div>

          <PixiGroupSampleProvider>
  <PixiSample canvasP5ToPixi={canvasP5ToPixi} updateTrigger={updateTrigger} />
  <div className="potta-one t-text" style={{ fontSize: "30px", marginTop: "20px" }}>イラストを配置・アニメーションを付与</div>
</PixiGroupSampleProvider>



            {/* <PixiSample canvasP5ToPixi={canvasP5ToPixi} updateTrigger={updateTrigger} />
            <div className="potta-one t-text" style={{ fontSize: "30px", marginTop: "20px" }}>イラストを配置・アニメーションを付与</div> */}
          </div>

      </div>
    </>
  );
};
export default DraggableArea;