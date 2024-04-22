import React from 'react';
import { P5ToolModeProvider } from './P5ModeContext';
import { P5PanelGroupProvider } from './P5PanelGroupContext';
import { P5CanvasCore } from './P5CanvasCore';
import { P5ColorProvider } from './P5ColorContext';
import { P5PenToolParametersProvider } from './P5PenToolParametersContext';


const P5CanvasSet = ({
  canvasSize,
  onDataFromGrandchild,
  canvasSpaceSize,
  canvasImgId,
  canvasData,
  canvasSaveData,
  notLayerSave
}) => {
  return (
    <div>
      <P5PanelGroupProvider notLayerSave={notLayerSave}>
        <P5ToolModeProvider>
          <P5ColorProvider>
            <P5PenToolParametersProvider>
            
              <div>
                <P5CanvasCore
                  canvasSize={canvasSize}
                  onDataFromGrandchild={onDataFromGrandchild}
                  canvasSpaceSize={canvasSpaceSize}
                  key={canvasImgId}
                  canvasImgId={canvasImgId}
                  canvasData={canvasData}
                  canvasSaveData={canvasSaveData}
                />
              </div>

            </P5PenToolParametersProvider>
          </P5ColorProvider>
        </P5ToolModeProvider>
      </P5PanelGroupProvider>
    </div>
  );
};

export { P5CanvasSet };
