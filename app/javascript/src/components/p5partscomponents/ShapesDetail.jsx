import React, { useRef } from 'react';
import { useP5ToolModeContext } from '../P5ModeContext';
import { SelectToolComponent } from './SelectToolComponent';
import { ShapesPartsComponent } from './ShapesPartsComponent';
import { SelectModeDetail } from './SelectModeDetail';
import { AlphaColorPicker } from './AlphaColorPicker';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';
import { ShapesTextBlock } from './ShapesTextBlock';
// import { useP5PanelGroupContext } from '../P5PanelGroupContext';
// import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';


const ShapesDetail = () => {

  //const { handleImage, copyLayerActive, handleCopyLayerConfirm, getLayersInfoData } = useP5CanvasCoreShare();


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
    isImageInsertionActive,
    toolMode,
    setToolMode,
    handleAlertMessage
  } = useP5ToolModeContext();


  const {
    //図形ツールのパラメータ
    inputShapesWidthSize,
    inputShapesHeightSize,

    //図形の角を丸めるかどうかのステート
    inputUpperLeft,
    inputUpperRight,
    inputLowerRight,
    inputLowerLeft,
    setShapesInstallation
  } = useP5PenToolParametersContext();



  //ツールの切り替え処理
  const toolChangeShapes = (newToolMode, e) => {
    if (isImageInsertionActive) {
      handleAlertMessage(e);
      return;
    } else {
      setToolMode(newToolMode);
      if (newToolMode === 'textTool') {
        setShapesInstallation(true);
      }
    }
  };



  // //もしも図形ツールの切り替え時に描画モードをオンにするなら
  // const toolChangeShapes = (newToolMode, e) => {
  //   if (isImageInsertionActive) {
  //     handleAlertMessage(e);
  //     return;
  //   } else {
  //     setToolMode(newToolMode);
  //     if (newToolMode === 'textTool') {
  //       setShapesInstallation(true);
  //     } else {
  //       setShapesInstallation(false);
  //     }
  //   }
  // };


  //プレビューの切り替え
  const renderPreview = (shapesToolPreview) => {
    switch (shapesToolPreview) {
      case 'rectTool':
        {/* 四角形プレビュー */}
        return <ShapesPartsComponent ShapesFormParts="rectPreview" />;
      case 'circleTool':
        {/* 円形プレビュー */}
        return <ShapesPartsComponent ShapesFormParts="circlePreview" />;
      case 'triangleTool':
        {/* 三角形プレビュー */}
        return <ShapesPartsComponent ShapesFormParts="trianglePreview" />;
      case 'lineTool':
        {/* 直線プレビュー */}
        return <ShapesPartsComponent ShapesFormParts="linePreview" />;
      case 'textTool':
        {/* テキストプレビュー */}
        return <ShapesTextBlock ShapesTextParts="textPreview" />;
      default:
        return <span>設定はありません。</span>;
    }
  };



  return (
    <>
       {/* トップライン（ツールボタン） */}
      <div className="flex">
        {/* 四角形 */}
        <SelectToolComponent handleChangeButton={toolChangeShapes} selectToolButton="rectTool" />

        {/* 円形 */}
        <SelectToolComponent handleChangeButton={toolChangeShapes} selectToolButton="circleTool" />

        {/* 三角形 */}
        <SelectToolComponent handleChangeButton={toolChangeShapes} selectToolButton="triangleTool" />

        {/* 直線 */}
        <SelectToolComponent handleChangeButton={toolChangeShapes} selectToolButton="lineTool" />

        {/* テキスト */}
        <SelectToolComponent handleChangeButton={toolChangeShapes} selectToolButton="textTool" />
      </div>


    
          <div className="flex-between" style={{ width: '190px', marginTop: '3px', position: 'relative', alignItems: 'flex-end' }}>
          
            {/* プレビュー内容の切り替え */}
            {renderPreview(toolMode)}

            <div>
              {/* 図形を配置するか設置するかを切り替えるボタン */}
              {toolMode !== 'textTool' ? (
                <div style={{ position: 'absolute', top: '-1px', right: '0px' }}>
                  <ShapesPartsComponent ShapesFormParts="shapesInstallationBtn" />
                </div>
              ) : (
                <>
                  <div style={{ position: 'absolute', top: '2px', right: '-8px' }}>
                    {/* 水平方向のテキストの揃え位置を変更するボタン */}
                    <ShapesTextBlock ShapesTextParts="shapesTextAlignBtn" />
                  </div>
                </>
              )}

              {/* 図形のサイズを指定するform */}
              <div className="flex-column-end" style={{ alignItems: 'flex-start' }}>
                {(toolMode !== 'lineTool' && toolMode !== 'textTool') && (
                  // 図形の横幅を指定するform
                  <ShapesPartsComponent ShapesFormParts="shapesForm" formTitle="横幅" inputValue={inputShapesWidthSize} direction="width" />
                )}


                {toolMode === 'textTool' && (
                  //行間フォーム
                  <ShapesTextBlock ShapesTextParts="shapesTextLeadingForm" />
                )}

                {toolMode === 'lineTool' ? (
                  //直線の長さを指定するform
                  <div style={{ marginBottom: '22px' }}>
                    <ShapesPartsComponent ShapesFormParts="shapesForm" formTitle="直線の長さ" inputValue={inputShapesHeightSize} direction="height" />
                  </div>
                ) : toolMode === 'textTool' ? (
                  //テキストの枠線の太さフォーム
                  <ShapesTextBlock ShapesTextParts="shapesTextStrokeForm" />
                ) : (
                  //縦幅フォーム
                  <ShapesPartsComponent ShapesFormParts="shapesForm" formTitle="縦幅" inputValue={inputShapesHeightSize} direction="height" />
                )}
              </div>
            </div>
          </div>


          <div className="flex-between" style={{ width: '190px', alignItems: 'flex-end' }}>
            {/* 図形の中を塗りつぶすかどうかのボタン */}
            <ShapesPartsComponent ShapesFormParts="shapesCheckBtn" />

            <div className="flex">
              {/* 左に90度回転ボタン */}
              <ShapesPartsComponent ShapesFormParts="rotateVerticalOppositionBtn" />
              {/* 右に90度反転ボタン */}
              <ShapesPartsComponent ShapesFormParts="rotateVerticalBtn" />

              {/* 左右反転ボタン */}
              <ShapesPartsComponent ShapesFormParts="leftAndRightBtn" />
              {/* 上下反転ボタン */}
              <ShapesPartsComponent ShapesFormParts="topAndBottomBtn" />
            </div>
          </div>

          {/* 透明度スライダー */}
          <div className="flex-column-end" style={{ alignItems: 'flex-start', marginTop: '2px' }}>
            <span className="text-Rounded" style={{ fontSize: '8px', color: '#ececec', alignSelf: 'flex-start' }}>透明度スライダー</span>

            <div style={{ marginBottom: '2px' }}><AlphaColorPicker /></div>
            <div className="flex-between" style={{ width: '190px' }}>

              <div style={{ visibility: toolMode === 'rectTool' || toolMode === 'circleTool' ? 'visible' : 'hidden' }}>
                {toolMode === 'rectTool' ? (
                  <ShapesPartsComponent ShapesFormParts="shapesGradationBtn" />
                ) : toolMode === 'circleTool' ? (
                  <div className="flex">
                    <ShapesPartsComponent ShapesFormParts="shapesGradationBtn" />
                    <ShapesPartsComponent ShapesFormParts="lineDirectionBtn" />
                  </div>
                ) : <div style={{ width: 'auto' }}></div>}
              </div>
      
              {/* 選択色プレビューボタン */}
              <div style={{ margin: '3px' }}>
                <SelectModeDetail selectToolPanelParts="alphaColorsPreview" previewClassName="alpha-colors-preview-small" fastPreviewClassName="color-preview-fast-small" secondPreviewClassName="color-preview-second-small" />
              </div>

            </div>
          </div>

          {toolMode === 'rectTool' && (
            <div className="flex-between" style={{ alignItems: 'flex-start', width: '87%', marginTop: '-2px' }}>
              <div style={{ marginTop: '15px' }}>
                {/* 図形の角を丸めるかどうかのボタン */}
                <ShapesPartsComponent ShapesFormParts="cornerCheckBox" />
              </div>

              {/* 図形の角指定フォーム */}
              <div>
                <div className="flex">
                  <div style={{ marginRight: '6px' }}><ShapesPartsComponent ShapesFormParts="cornerValueForm" formTitle="左上" inputValue={inputUpperLeft} direction="upperLeft" /></div>
                  <ShapesPartsComponent ShapesFormParts="cornerValueForm" formTitle="右上" inputValue={inputUpperRight} direction="upperRight" />
                </div>
                <div className="flex" style={{ marginTop: '2px' }}>
                  <div style={{ marginRight: '6px' }}><ShapesPartsComponent ShapesFormParts="cornerValueForm" formTitle="左下" inputValue={inputLowerLeft} direction="lowerLeft" /></div>
                  <ShapesPartsComponent ShapesFormParts="cornerValueForm" formTitle="右下" inputValue={inputLowerRight} direction="lowerRight" />
                </div>
              </div>
            </div>
          )}

          {toolMode === 'textTool' && (
            <>
              <div className="flex-between" style={{ width: '200px', marginTop: '-3px' }}>
                {/* フォントのスタイルを変更するボタン */}
                <ShapesTextBlock ShapesTextParts="shapesTextStyleBtn" />
                {/* テキストフォントの選択 */}
                <ShapesTextBlock ShapesTextParts="shapesTextFontDrop" />
              </div>

              {/* テキストフォーム */}
              <ShapesTextBlock ShapesTextParts="shapesTextArea" />
            </>
          )}

    </>
  );
};


export { ShapesDetail };