import React, { useRef } from 'react';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
import { useP5ToolModeContext } from '../P5ModeContext';
import { SelectToolComponent } from './SelectToolComponent';
import { ShapesPartsComponent } from './ShapesPartsComponent';
import { SelectModeDetail } from './SelectModeDetail';
import { AlphaColorPicker } from './AlphaColorPicker';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';
import { useP5Color } from '../P5ColorContext';


const ShapesTextBlock = ({ShapesTextParts}) => {

  const { handleImage, copyLayerActive, handleCopyLayerConfirm, getLayersInfoData, toolSize } = useP5CanvasCoreShare();


  //「カラーコンテキスト」から受け取るもの
  const {
    currentColor,
    setCurrentColor,
    currentAlphaColor,
    secondAlphaColor,
    selectAlphaColorPreview,
    h,
    s,
    v,
  } = useP5Color();

  const { 
    showSizeAndDetailPanels,
    toggleColorPalettePanelVisible,
    toggleLayersInfoPanelVisible,
    toggleScalePanelVisible,
    layersInfoPanelVisible,
    scalePanelVisible,
    colorPalettePanelVisible,
    mainPanelMode,
  } = useP5PanelGroupContext();

  const { 
    isImageInsertionActive,
    handleToolChange,
    toolMode,
    setToolMode,
    penDetailGroup,
    selectDetailGroup,
    detailGroup,
    setDetailGroup,
    handleAlertMessage,
    favoritePen,
    favoritePenSecond
  } = useP5ToolModeContext();


  const {
    //図形ツールのパラメータ
    shapesFillChange,
    setShapesFillChange,
    shapesWidthSize,
    setShapesWidthSize,
    inputShapesWidthSize,
    setInputShapesWidthSize,
    shapesHeightSize,
    setShapesHeightSize,
    inputShapesHeightSize,
    setInputShapesHeightSize,


    //図形の角を丸めるかどうかのステート
    cornerChange,
    setCornerChange,
    upperLeft,
    setUpperLeft,
    inputUpperLeft,
    setInputUpperLeft,
    upperRight,
    setUpperRight,
    inputUpperRight,
    setInputUpperRight,
    lowerRight,
    setLowerRight,
    inputLowerRight,
    setInputLowerRight,
    lowerLeft,
    setLowerLeft,
    inputLowerLeft,
    setInputLowerLeft,

    //テキスト関係
    shapesText,
    setShapesText,
    inputShapesText,
    setInputShapesText,
    shapesTextLeading,
    setShapesTextLeading,
    inputShapesTextLeading,
    setInputShapesTextLeading,
    shapesTextFont,
    setShapesTextFont,
    shapesTextStyle,
    setShapesTextStyle,
    shapesTextAlign,
    setShapesTextAlign,
    shapesTextAlignVertical,
    setShapesTextAlignVertical,
    shapesTextFill,
    setShapesTextFill,
    shapesTextStroke,
    setShapesTextStroke,
    inputShapesTextStroke,
    setInputShapesTextStroke
  } = useP5PenToolParametersContext();



  //テキストツールのフォーム処理
  const updateShapesText = (newValue) => {
    // newValueの長さが0以上50以下なら更新する
    if (newValue.length >= 0 && newValue.length <= 50) {
      setShapesText(newValue);
      setInputShapesText(newValue);
    }
  };

  const handleShapesTextChange = (e) => {
    const value = e.target.value;
    setInputShapesText(value);
  };


  const handleShapesTextBlur = () => {
    const newValue = inputShapesText;
  
    if (newValue.length >= 0 && newValue.length <= 50) {
      updateShapesText(newValue);
    } else {
      // 条件を満たさない場合、前の状態に戻す
      setInputShapesText(shapesText);
    }
  };



  //行間フォーム処理
  const updateTextLeading = (newValue) => {
    if (newValue >= 0 && newValue <= 50) {
      setShapesTextLeading(newValue);
      setInputShapesTextLeading(String(newValue));
    }
  };

  const handleTextLeadingChange = (e) => {
    const value = e.target.value;
    setInputShapesTextLeading(value);
  };


  const handleTextLeadingBlur = () => {
    const inputNewValue = parseFloat(inputShapesTextLeading);
    const newValue = Math.round(inputNewValue * 10) / 10;

    if (newValue >= 0 && newValue <= 50) {
      updateTextLeading(newValue);
      
    } else {
      setInputShapesTextLeading(String(shapesTextLeading));
    }
  };




  //テキストの枠線の太さフォーム処理
  const updateTextStroke = (newValue) => {
    if (newValue >= 0 && newValue <= 20) {
      setShapesTextStroke(newValue);
      setInputShapesTextStroke(String(newValue));
    }
  };

  const handleTextStrokeChange = (e) => {
    const value = e.target.value;
    setInputShapesTextStroke(value);
  };


  const handleTextStrokeBlur = () => {
    const inputNewValue = parseFloat(inputShapesTextStroke);
    const newValue = Math.round(inputNewValue * 10) / 10;

    if (newValue >= 0 && newValue <= 20) {
      updateTextStroke(newValue);
      
    } else {
      setInputShapesTextStroke(String(shapesTextStroke));
    }
  };



  // テキストフォントを更新するハンドラ
  const handleShapesTextFontChange = (newTextFont) => {
    setShapesTextFont(newTextFont);
  };


  //フォントのスタイルを変更するボタン
  const handleShapesTextStyleChange = (value) => {
    setShapesTextStyle(value);
  };


  //水平方向のテキストの揃え位置を変更するボタン
  const handleShapesTextAlignChange = (value) => {
    setShapesTextAlign(value);
  };


  //垂直方向のテキストの揃え位置を変更するボタン
  // const handleShapesTextAlignVerticalChange = (value) => {
  //   setShapesTextAlignVertical(value);
  // };


  //テキストに輪郭をつけるボタン
  // const handleShapesTextFillChange = (value) => {
  //   setShapesTextFill(value);
  // };


  const getTextStyle = (shapesTextStyle) => {
    switch (shapesTextStyle) {
      case 'BOLD':
        return { fontWeight: 'bold', fontStyle: 'normal' };
      case 'ITALIC':
        return { fontWeight: 'normal', fontStyle: 'italic' };
      case 'BOLDITALIC':
        return { fontWeight: 'bold', fontStyle: 'italic' };
      case 'NORMAL':
      default:
        return { fontWeight: 'normal', fontStyle: 'normal' };
    }
  };
  
  const textStyle = getTextStyle(shapesTextStyle);



  switch (ShapesTextParts) {
    case 'shapesTextArea':
      return  (
        <>
          {/* テキストフォーム */}
          <textarea
            className="no-drag form-select-value"
            value={inputShapesText}
            onChange={handleShapesTextChange}
            onBlur={handleShapesTextBlur}
            style={{ fontSize: '12px', height: '60px', width: '230px' }}
          />
        </>
      );
    case 'shapesTextLeadingForm':
      return  (
        <>
          {/* 行間フォーム */}
          <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-8px' }}>
            <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>行間</span></div>
            <div style={{ alignItems: 'flex-end', display: 'flex' }}>
              <input
                className="no-drag form-select-value"
                type="number"
                min="0"
                max="100"
                step="0.1"
                style={{ width: '60px', fontSize: '14px' }}
                value={inputShapesTextLeading}
                onChange={handleTextLeadingChange}
                onBlur={handleTextLeadingBlur}
              /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
            </div>
          </div>
        </>
        );
    case 'shapesTextFontDrop':
      return  (
        <>
          {/* テキストフォントの選択 */}
          <div>
            <select
              value={shapesTextFont}
              onChange={(e) => handleShapesTextFontChange(e.target.value)}
              className="no-drag text-font-dropdown dropbox-select-value"
            >
              <option value="Noto Sans JP">Noto Sans JP</option>
              <option value="Hiragino Mincho ProN">ヒラギノ明朝 ProN</option>
              <option value="Hiragino Maru Gothic ProN">ヒラギノ丸ゴ ProN</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Garamond">Garamond</option>
              <option value="Verdana">Verdana</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
        </>
      );
    case 'shapesTextStyleBtn':
      return  (
        <>
          {/* フォントのスタイルを変更するボタン */}
          <div className="flex">
          {/* ノーマルスタイル */}
          <div
            className= "pen-panel-button tooltip-container"
            onClick={() => handleShapesTextStyleChange('NORMAL')}
            onTouchStart={() => handleShapesTextStyleChange('NORMAL')}
            style={{
              backgroundColor: shapesTextStyle === 'NORMAL' ? '#9199AE' : '#c2c1c1',
              width: '20px',
              height: '20px'
            }}
          >
            <i className="bi bi-type"></i>
            <span className="tooltip-text">ノーマル</span>
          </div>

          {/* イタリックスタイル */}
          <div
            className= "pen-panel-button tooltip-container"
            onClick={() => handleShapesTextStyleChange('ITALIC')}
            onTouchStart={() => handleShapesTextStyleChange('ITALIC')}
            style={{
              backgroundColor: shapesTextStyle === 'ITALIC' ? '#9199AE' : '#c2c1c1',
              width: '20px',
              height: '20px'
            }}
          >
            <i className="bi bi-type-italic"></i>
            <span className="tooltip-text">イタリック</span>
          </div>

          {/* ボールドスタイル */}
          <div
            className= "pen-panel-button tooltip-container"
            onClick={() => handleShapesTextStyleChange('BOLD')}
            onTouchStart={() => handleShapesTextStyleChange('BOLD')}
            style={{
              backgroundColor: shapesTextStyle === 'BOLD' ? '#9199AE' : '#c2c1c1',
              width: '20px',
              height: '20px'
            }}
          >
            <span
              className="flex"
              style={{
                fontWeight: 'bold'
              }}
            >B</span>
            <span className="tooltip-text">ボールド</span>
          </div>

          {/* ボールドイタリックスタイル */}
          <div
            className= "pen-panel-button tooltip-container"
            onClick={() => handleShapesTextStyleChange('BOLDITALIC')}
            onTouchStart={() => handleShapesTextStyleChange('BOLDITALIC')}
            style={{
              backgroundColor: shapesTextStyle === 'BOLDITALIC' ? '#9199AE' : '#c2c1c1',
              width: '20px',
              height: '20px'
            }}
          >
            <span
              className="flex"
              style={{
                fontWeight: 'bold',
                fontStyle: 'italic'
              }}
            >B</span>
            <span className="tooltip-text">ボールドイタリック</span>
          </div>
        </div>
      </>
      );
    case 'shapesTextAlignBtn':
      return  (
        <>
          {/* 水平方向のテキストの揃え位置を変更するボタン */}
          <div className="flex" style={{ boxShadow: '1px 1px black', borderRadius: '5px', width: '60px' }}>
            {/* 左揃え */}
            <div
              className= "text-align-button tooltip-container"
              onClick={() => handleShapesTextAlignChange('LEFT')}
              onTouchStart={() => handleShapesTextAlignChange('LEFT')}
              style={{
                backgroundColor: shapesTextAlign === 'LEFT' ? '#9199AE' : '#c2c1c1',
                borderRadius: '5px 0px 0px 5px',
                borderRight: '0.5px solid #4A4A4A'
              }}
            >
              <i className="bi bi-text-left"></i>
              <span className="tooltip-text">左揃え</span>
            </div>

            {/* 中央揃え */}
            <div
              className= "text-align-button tooltip-container"
              onClick={() => handleShapesTextAlignChange('CENTER')}
              onTouchStart={() => handleShapesTextAlignChange('CENTER')}
              style={{
                backgroundColor: shapesTextAlign === 'CENTER' ? '#9199AE' : '#c2c1c1',
                borderRight: '0.5px solid #4A4A4A',
                borderLeft: '0.5px solid #4A4A4A'
              }}
            >
              <i className="bi bi-text-center"></i>
              <span className="tooltip-text">中央揃え</span>
            </div>

            {/* 右揃え */}
            <div
              className= "text-align-button tooltip-container"
              onClick={() => handleShapesTextAlignChange('RIGHT')}
              onTouchStart={() => handleShapesTextAlignChange('RIGHT')}
              style={{
                backgroundColor: shapesTextAlign === 'RIGHT' ? '#9199AE' : '#c2c1c1',
                borderRadius: '0px 5px 5px 0px',
                borderLeft: '0.5px solid #4A4A4A'
              }}
            >
              <i className="bi bi-text-right"></i>
              <span className="tooltip-text">右揃え</span>
            </div>
          </div>
        </>
      );
    case 'shapesTextStrokeForm':
      return  (
        <>
          {/* テキストの枠線の太さフォーム */}
          <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
            <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>枠線の太さ</span></div>
            <div style={{ alignItems: 'flex-end', display: 'flex' }}>
              <input
                className="no-drag form-select-value"
                type="number"
                min="0"
                max="100"
                step="0.1"
                style={{ width: '60px', fontSize: '14px' }}
                value={inputShapesTextStroke}
                onChange={handleTextStrokeChange}
                onBlur={handleTextStrokeBlur}
              /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
            </div>
          </div>
        </>
        );
    case 'textPreview':
    return  (
      <>
        {/* テキストのプレビュー */}
        <div className="flex-start-start">
          <span className="destination-layer" style={{ color: '#ececec' }}>テキストのプレビュー</span>
          <div className="pen-tool-preview-container">
            <div className="pen-tool-preview-background flex">
              <div
                className="flex"
                style={{
                  ...textStyle,
                  color: shapesFillChange === 'nofill' ? 'white' : 'black',
                  fontFamily: `"${shapesTextFont}", "Noto Sans JP", serif`,
                  fontSize: `${toolSize}px`,
                  textShadow: shapesFillChange === 'nostroke'
                  ? 'none'  // 'nostroke' の場合、textShadowを非表示にします
                  : '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black'  // それ以外の場合、シャドウの色を黒にします
                }}
                
              >
                あ
              </div>
            </div>
          </div>
        </div>
      </>
    );
    // case 'shapesTextFillBtn':
    //   return  (
    //     <>
    //       {/* テキストに輪郭をつけるボタン */}
    //       <div className="flex">
            
    //         <div
    //           className= "pen-panel-button tooltip-container"
    //           onClick={() => handleShapesTextFillChange('textFill')}
    //           onTouchStart={() => handleShapesTextFillChange('textFill')}
    //           style={{ backgroundColor: shapesTextFill === 'textFill' ? '#9199AE' : '#c2c1c1' }}
    //         >
    //           f
    //           <span className="tooltip-text">中を塗りつぶす</span>
    //         </div>

            
    //         <div
    //           className= "pen-panel-button tooltip-container"
    //           onClick={() => handleShapesTextFillChange('textStroke')}
    //           onTouchStart={() => handleShapesTextFillChange('textStroke')}
    //           style={{ backgroundColor: shapesTextFill === 'textStroke' ? '#9199AE' : '#c2c1c1' }}
    //         >
    //           線
    //           <span className="tooltip-text">輪郭を塗る</span>
    //         </div>

            
    //         <div
    //           className= "pen-panel-button tooltip-container"
    //           onClick={() => handleShapesTextFillChange('textAllType')}
    //           onTouchStart={() => handleShapesTextFillChange('textAllType')}
    //           style={{ backgroundColor: shapesTextFill === 'textAllType' ? '#9199AE' : '#c2c1c1' }}
    //         >
    //           全
    //           <span className="tooltip-text">全部塗る</span>
    //         </div>
    //       </div>
    //     </>
    //   );

    default:
      return (
        <>
          <span>設定はありません</span>
          {/* 垂直方向のテキストの揃え位置を変更するボタン（現状必要ないがなんかの時のために保持） */}
          {/* <div className="flex">
            <div
              className= "pen-panel-button tooltip-container"
              onClick={() => handleShapesTextAlignVerticalChange('TOP')}
              onTouchStart={() => handleShapesTextAlignVerticalChange('TOP')}
              style={{ backgroundColor: shapesTextAlignVertical === 'TOP' ? '#9199AE' : '#c2c1c1' }}
            >
              上
              <span className="tooltip-text">上揃え</span>
            </div>

            <div
              className= "pen-panel-button tooltip-container"
              onClick={() => handleShapesTextAlignVerticalChange('CENTER')}
              onTouchStart={() => handleShapesTextAlignVerticalChange('CENTER')}
              style={{ backgroundColor: shapesTextAlignVertical === 'CENTER' ? '#9199AE' : '#c2c1c1' }}
            >
              間
              <span className="tooltip-text">中央揃え</span>
            </div>

            <div
              className= "pen-panel-button tooltip-container"
              onClick={() => handleShapesTextAlignVerticalChange('BASELINE')}
              onTouchStart={() => handleShapesTextAlignVerticalChange('BASELINE')}
              style={{ backgroundColor: shapesTextAlignVertical === 'BASELINE' ? '#9199AE' : '#c2c1c1' }}
            >
              ?
              <span className="tooltip-text">下揃え??</span>
            </div>

            <div
              className= "pen-panel-button tooltip-container"
              onClick={() => handleShapesTextAlignVerticalChange('BOTTOM')}
              onTouchStart={() => handleShapesTextAlignVerticalChange('BOTTOM')}
              style={{ backgroundColor: shapesTextAlignVertical === 'BOTTOM' ? '#9199AE' : '#c2c1c1' }}
            >
              下
              <span className="tooltip-text">下揃え</span>
            </div>
          </div> */}
        </>
      );
  }
};


export { ShapesTextBlock };