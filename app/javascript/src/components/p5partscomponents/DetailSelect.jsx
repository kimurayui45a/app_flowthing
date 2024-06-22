import React, { useRef } from 'react';

import { useP5ToolModeContext } from '../P5ModeContext';
import { SelectionRangeDetail } from './SelectionRangeDetail';
import { ShapesDetail } from './ShapesDetail';
// import { useP5PanelGroupContext } from '../P5PanelGroupContext';
// import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
//import { SelectToolComponent } from './SelectToolComponent';


const DetailSelect = () => {

  // const { handleImage, copyLayerActive, handleCopyLayerConfirm, getLayersInfoData } = useP5CanvasCoreShare();


  // const { 
  //   showSizeAndDetailPanels,
  //   toggleColorPalettePanelVisible,
  //   toggleLayersInfoPanelVisible,
  //   toggleScalePanelVisible,
  //   layersInfoPanelVisible,
  //   scalePanelVisible,
  //   colorPalettePanelVisible,
  //   mainPanelMode,
  // } = useP5PanelGroupContext();

  const { 
    toolMode,
    setToolMode,
    shapesTool,
    selectionRangeTool
  } = useP5ToolModeContext();

  
  //タブがクリックされた時、toolModeがselectionRangeToolでなかったら「選択ツール」にセットする
  const selectToolTabChange = () => {
    if (!selectionRangeTool.has(toolMode)) {
      setToolMode('selectMode');
    } else {
      return;
    }
  };
  //タブがクリックされた時、toolModeがshapesToolでなかったら「四角形ツール」にセットする
  const shapesToolTabChange = () => {
    if (!shapesTool.has(toolMode)) {
      setToolMode('rectTool');
    } else {
      return;
    }
  };

  return (
    <div className="select-detail-tool-container">
      <div className="flex">
        <div
          className="select-tool-tabbtn tooltip-container"
          onClick={selectToolTabChange}
          onTouchStart={selectToolTabChange}
          style={{
            backgroundColor: selectionRangeTool.has(toolMode) ? '#777777' : '#616161',
            borderBottom: selectionRangeTool.has(toolMode) ? 'none' : '1px solid #4A4A4A',
            color: selectionRangeTool.has(toolMode) ? '#ececec' : '#343434'
          }}
        >
          <span>選択/画像</span>
          <span className="tooltip-text">選択ツールタブ</span>
        </div>

        <div
          className="shapes-tool-tabbtn tooltip-container"
          onClick={shapesToolTabChange}
          onTouchStart={shapesToolTabChange}
          style={{
            backgroundColor: shapesTool.has(toolMode) ? '#777777' : '#616161',
            borderBottom: shapesTool.has(toolMode) ? 'none' : '1px solid #4A4A4A',
            color: shapesTool.has(toolMode) ? '#ececec' : '#343434'
          }}
        >
          <span>図形/テキスト</span>
          <span className="tooltip-text">図形ツールタブ</span>
        </div>
      </div>

      <div className="select-detail-tool-group">
        {/* グループ分岐 */}
        {selectionRangeTool.has(toolMode) ? (
          //「選択範囲」グループ
          <SelectionRangeDetail />
        ) : (
          //「図形」グループ
          <ShapesDetail />
        )}
      </div>

    </div>
  );
};


export { DetailSelect };