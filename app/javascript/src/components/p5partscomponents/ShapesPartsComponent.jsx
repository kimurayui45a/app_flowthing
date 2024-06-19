import React, { useEffect, useRef, useState } from 'react';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import { useP5CanvasCoreShare } from '../P5CanvasCoreShareContext';
import { useP5ToolModeContext } from '../P5ModeContext';
import { useP5PenToolParametersContext } from '../P5PenToolParametersContext';
import { useP5Color } from '../P5ColorContext';


const ShapesPartsComponent = ({ShapesFormParts, direction, inputValue, formTitle}) => {

  const {
    handleImage,
    copyLayerActive,
    handleCopyLayerConfirm,
    getLayersInfoData,
    handleInversionClickChange,
    toolSize
  } = useP5CanvasCoreShare();

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
    shapesInstallation,
    setShapesInstallation,
    lineDirection,
    setLineDirection,

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
    shapesGradation,
    setShapesGradation,
  } = useP5PenToolParametersContext();


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

// プレビュー縮小ステート
const [scaleRatioPreview, setScaleRatioPreview] = useState(1);


useEffect(() => {
  let scaleRatio;
  if (shapesWidthSize > 70 || shapesHeightSize > 70) {
    scaleRatio = 70 / Math.max(shapesWidthSize, shapesHeightSize);
  } else {
    scaleRatio = 1;
  }
  setScaleRatioPreview(scaleRatio); // 計算されたスケール比をステートにセット
}, [shapesWidthSize, shapesHeightSize, shapesGradation]);


  //図形の「縦・横」指定フォーム処理
  const updateShapesValue = (newValue, direction) => {
    if (newValue >= 0 && newValue <= 200) {

      if (direction === 'width') {
        setShapesWidthSize(newValue);
        setInputShapesWidthSize(String(newValue));
      } else {
        setShapesHeightSize(newValue);
        setInputShapesHeightSize(String(newValue));
      }
    }
  };

  const handleShapesValueChange = (e, direction) => {
    const value = e.target.value;

    if (direction === 'width') {
      setInputShapesWidthSize(value);
    } else {
      setInputShapesHeightSize(value);
    }
  };


  const handleShapesValueBlur = (direction, inputValue) => {
    const inputNewValue = parseFloat(inputValue);
    const newValue = Math.round(inputNewValue * 10) / 10;

    if (newValue >= 0 && newValue <= 200) {
      updateShapesValue(newValue, direction);
      
    } else {
      if (direction === 'width') {
        setInputShapesWidthSize(String(shapesWidthSize));
      } else {
        setInputShapesHeightSize(String(shapesHeightSize));
      }
    }
  };


  //図形の中を塗りつぶすかどうかのボタン
  const handleShapesFillChange = (value) => {
    setShapesFillChange(value);
  };


  //図形の「角」指定フォーム処理
  const updateCornerValue = (newValue, direction) => {
    if (newValue >= 0 && newValue <= 50) {

      if (direction === 'upperLeft') {
        //「図形」角(左上)
        setUpperLeft(newValue);
        setInputUpperLeft(String(newValue));
      } else if (direction === 'upperRight') {
        //「図形」角(右上)
        setUpperRight(newValue);
        setInputUpperRight(String(newValue));
      } else if (direction === 'lowerRight') {
        //「図形」角(右下)
        setLowerRight(newValue);
        setInputLowerRight(String(newValue));
      } else {
        //「図形」角(左下)
        setLowerLeft(newValue);
        setInputLowerLeft(String(newValue));
      }
    };
  };

  const handleCornerValueChange = (e, direction) => {
    const value = e.target.value;

    if (direction === 'upperLeft') {
      //「図形」角(左上)
      setInputUpperLeft(value);
    } else if (direction === 'upperRight') {
      //「図形」角(右上)
      setInputUpperRight(value);
    } else if (direction === 'lowerRight') {
      //「図形」角(右下)
      setInputLowerRight(value);
    } else {
      //「図形」角(左下)
      setInputLowerLeft(value);
    }
  };


  const handleCornerValueBlur = (direction, inputValue) => {
    const inputNewValue = parseFloat(inputValue);
    const newValue = Math.round(inputNewValue * 10) / 10;

    if (newValue >= 0 && newValue <= 50) {
      updateCornerValue(newValue, direction);
      
    } else {
      if (direction === 'upperLeft') {
        //「図形」角(左上)
        setInputUpperLeft(String(upperLeft));
      } else if (direction === 'upperRight') {
        //「図形」角(右上)
        setInputUpperRight(String(upperRight));
      } else if (direction === 'lowerRight') {
        //「図形」角(右下)
        setInputLowerRight(String(lowerRight));
      } else {
        //「図形」角(左下)
        setInputLowerLeft(String(lowerLeft));
      }
    }
  };


  //図形の角を丸めるかどうかのボタン
  const handleCornerChange = () => {
    setCornerChange(!cornerChange);
  };


  //図形にグラデーションをつけるどうかのボタン
  const handleShapesGradationChange = () => {
    setShapesGradation(!shapesGradation);
  };


  switch (ShapesFormParts) {
    case 'shapesCheckBtn':
      return  (
        <>
          {!shapesGradation ? (
            <>
              {/* 図形の中を塗りつぶすかどうかのボタン */}
              <div className="flex">
                {/* 輪郭のみ */}
                <div
                  className= "pen-panel-button tooltip-container"
                  onClick={() => handleShapesFillChange('nofill')}
                  onTouchStart={() => handleShapesFillChange('nofill')}
                  style={{ backgroundColor: shapesFillChange === 'nofill' ? '#9199AE' : '#c2c1c1' }}
                >
                  <svg id="_レイヤー_48" data-name="レイヤー 48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                    <defs>
                      <style>
                        {`
                          .nostroke-icon-cls-1, .nostroke-icon-cls-2 {
                            fill: none;
                            stroke: #000;
                            stroke-linecap: round;
                            stroke-miterlimit: 10;
                          }

                          .nostroke-icon-cls-2 {
                            stroke-dasharray: 0 0 1.02 2.04;
                          }
                        }
                      `}
                      </style>
                    </defs>
                    <rect className="nostroke-icon-cls-2" x="7.87" y="8.75" width="16.6" height="16.6" rx="1.22" ry="1.22"/>
                    <rect className="nostroke-icon-cls-1" x="5.58" y="6.47" width="21.18" height="21.18" rx="1.12" ry="1.12"/>
                  </svg>
                  <span className="tooltip-text">輪郭のみ塗る</span>
                </div>

                {/* 中のみ */}
                <div
                  className= "pen-panel-button tooltip-container"
                  onClick={() => handleShapesFillChange('nostroke')}
                  onTouchStart={() => handleShapesFillChange('nostroke')}
                  style={{ backgroundColor: shapesFillChange === 'nostroke' ? '#9199AE' : '#c2c1c1' }}
                >
                  <svg id="_レイヤー_48" data-name="レイヤー 48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                    <defs>
                      <style>
                        {`
                          .nofill-icon-cls-1 {
                            fill: none;
                            stroke-dasharray: 0 0 .99 1.97;
                            stroke-linecap: round;
                          }

                          .nofill-icon-cls-1, .nofill-icon-cls-2 {
                            stroke: #000;
                            stroke-miterlimit: 10;
                          }

                          .nofill-icon-cls-2 {
                            fill: #231815;
                          }
                        `}
                      </style>
                    </defs>
                    <rect className="nofill-icon-cls-2" x="7.87" y="8.75" width="16.6" height="16.6" rx="1.22" ry="1.22"/>
                    <rect className="nofill-icon-cls-1" x="5.58" y="6.47" width="21.18" height="21.18" rx="1.12" ry="1.12"/>
                  </svg>
                  <span className="tooltip-text">内部のみ塗る</span>
                </div>

                {/* 輪郭も中も塗りつぶす */}
                <div
                  className= "pen-panel-button tooltip-container"
                  onClick={() => handleShapesFillChange('allpaint')}
                  onTouchStart={() => handleShapesFillChange('allpaint')}
                  style={{ backgroundColor: shapesFillChange === 'allpaint' ? '#9199AE' : '#c2c1c1' }}
                >
                  <svg id="_レイヤー_48" data-name="レイヤー 48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                    <defs>
                      <style>
                        {`
                          .allpaint-icon-cls-1 {
                            stroke: #000;
                            stroke-linecap: round;
                          }

                          .allpaint-icon-cls-1, .allpaint-icon-cls-2 {
                            fill: #231815;
                            stroke-miterlimit: 10;
                          }

                          .allpaint-icon-cls-2 {
                            stroke: #fff;
                          }
                        `}
                      </style>
                    </defs>
                    <rect className="allpaint-icon-cls-1" x="5.58" y="6.47" width="21.18" height="21.18" rx="1.12" ry="1.12"/>
                    <rect className="allpaint-icon-cls-2" x="7.87" y="8.75" width="16.6" height="16.6" rx="1.22" ry="1.22"/>
                  </svg>
                  <span className="tooltip-text">線も内部も塗る</span>
                </div>
              </div>
            </>
          ) : (
            <>
            {/* 図形の中を塗りつぶすかどうかのボタン */}
            <div className="flex">
              {/* 輪郭のみ */}
              <div
                className= "pen-panel-button-grayout"
              >
                <svg id="_レイヤー_48" data-name="レイヤー 48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                  <defs>
                    <style>
                      {`
                        .nostroke-icon-cls-1, .nostroke-icon-cls-2 {
                          fill: none;
                          stroke: #000;
                          stroke-linecap: round;
                          stroke-miterlimit: 10;
                        }

                        .nostroke-icon-cls-2 {
                          stroke-dasharray: 0 0 1.02 2.04;
                        }
                      }
                    `}
                    </style>
                  </defs>
                  <rect className="nostroke-icon-cls-2" x="7.87" y="8.75" width="16.6" height="16.6" rx="1.22" ry="1.22"/>
                  <rect className="nostroke-icon-cls-1" x="5.58" y="6.47" width="21.18" height="21.18" rx="1.12" ry="1.12"/>
                </svg>
              </div>

              {/* 中のみ */}
              <div
                className= "pen-panel-button-grayout"
              >
                <svg id="_レイヤー_48" data-name="レイヤー 48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                  <defs>
                    <style>
                      {`
                        .nofill-icon-cls-1 {
                          fill: none;
                          stroke-dasharray: 0 0 .99 1.97;
                          stroke-linecap: round;
                        }

                        .nofill-icon-cls-1, .nofill-icon-cls-2 {
                          stroke: #000;
                          stroke-miterlimit: 10;
                        }

                        .nofill-icon-cls-2 {
                          fill: #231815;
                        }
                      `}
                    </style>
                  </defs>
                  <rect className="nofill-icon-cls-2" x="7.87" y="8.75" width="16.6" height="16.6" rx="1.22" ry="1.22"/>
                  <rect className="nofill-icon-cls-1" x="5.58" y="6.47" width="21.18" height="21.18" rx="1.12" ry="1.12"/>
                </svg>
              </div>

              {/* 輪郭も中も塗りつぶす */}
              <div
                className= "pen-panel-button-grayout"
              >
                <svg id="_レイヤー_48" data-name="レイヤー 48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                  <defs>
                    <style>
                      {`
                        .allpaint-icon-cls-1 {
                          stroke: #000;
                          stroke-linecap: round;
                        }

                        .allpaint-icon-cls-1, .allpaint-icon-cls-2 {
                          fill: #231815;
                          stroke-miterlimit: 10;
                        }

                        .allpaint-icon-cls-2 {
                          stroke: #fff;
                        }
                      `}
                    </style>
                  </defs>
                  <rect className="allpaint-icon-cls-1" x="5.58" y="6.47" width="21.18" height="21.18" rx="1.12" ry="1.12"/>
                  <rect className="allpaint-icon-cls-2" x="7.87" y="8.75" width="16.6" height="16.6" rx="1.22" ry="1.22"/>
                </svg>
              </div>
            </div>
            </>
          )}
        </>
      );

      case 'shapesForm':
        return  (
          <>
            {/* 図形の縦・横指定フォーム */}
            {!shapesGradation ? (
              <>
                <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
                  <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{formTitle}</span></div>
                  <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                    <input
                      className="no-drag form-select-value"
                      type="number"
                      min="0"
                      max="200"
                      step="0.1"
                      style={{ width: '60px', fontSize: '14px' }}
                      value={inputValue}
                      onChange={(e) => handleShapesValueChange(e, direction)}
                      onBlur={() => handleShapesValueBlur(direction, inputValue)}
                    /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
                    <span className="tooltip-text">最大値200px</span>
                  </div>
                </div>
              </>
            ) : (
              <>
              <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
                <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>{formTitle}</span></div>
                <div style={{ alignItems: 'flex-end', display: 'flex' }}>
                  <div
                    className="form-select-value"
                    style={{ width: '60px', height: '27px' }}
                  /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
                </div>
              </div>
              </>
            )}
          </>
        );

      case 'cornerCheckBox':
        return  (
          <>
            {/* 図形の角を丸めるかどうかのチェックボックス */}
            <div
            className= "pen-panel-button tooltip-container"
              onClick={handleCornerChange}
              onTouchStart={handleCornerChange}
              style={{ backgroundColor: cornerChange ? '#9199AE' : '#c2c1c1' }}
              >
              <i className="bi bi-bounding-box-circles"></i>
              <span className="tooltip-text">四角形の角を丸める</span>
            </div>
          </>
        );

      case 'cornerValueForm':
        return  (
          <>
            {!shapesGradation ? (
              <>
                {/* 図形の角指定フォーム */}
                <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-8px' }}>
                  <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{formTitle}</span></div>
                  <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                    <input
                      className="no-drag form-select-value"
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      style={{ width: '60px', fontSize: '14px' }}
                      value={inputValue}
                      onChange={(e) => handleCornerValueChange(e, direction)}
                      onBlur={() => handleCornerValueBlur(direction, inputValue)}
                    /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
                    <span className="tooltip-text">最大値50px</span>
                  </div>
                </div>
              </>
            ) : (
              <>
              <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-8px' }}>
                <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#4A4A4A' }}>{formTitle}</span></div>
                <div style={{ alignItems: 'flex-end', display: 'flex' }}>
                  <div
                    className="form-select-value"
                    style={{ width: '60px', height: '27px' }}
                  /><span className="text-Rounded" style={{ fontSize: '14px', marginLeft: '4px', color:'#4A4A4A' }}>px</span>
                </div>
              </div>
              </>
            )}
          </>
        );

      case 'shapesInstallationBtn':
        return  (
          <>
            {/* 図形を配置するか設置するかを切り替えるボタン */}
            <div className="flex" style={{ boxShadow: '1px 1px black', borderRadius: '5px', width: '50px' }}>
                <div
                  className= "panel-tool-button-small tooltip-container"
                  onClick={() => setShapesInstallation(false)}
                  onTouchStart={() => setShapesInstallation(false)}
                  style={{
                    backgroundColor: !shapesInstallation ? '#9199AE' : '#c2c1c1',
                    borderRadius: '5px 0px 0px 5px',
                    borderRight: '0.5px solid #4A4A4A'
                  }}
                >
                  <div style={{ transform: 'scale(0.65)' }}>
                    <svg id="_レイヤー_49" data-name="レイヤー 49" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                      <defs>
                        <style>
                          {`
                            .shapes-paint-cls-1, .shapes-paint-cls-2, .shapes-paint-cls-3, .shapes-paint-cls-4 {
                              fill: none;
                              stroke: #000;
                              stroke-miterlimit: 10;
                            }

                            .shapes-paint-cls-2 {
                              stroke-dasharray: 0 0 0 0 0 0 2 2 4 2 6 1.5;
                            }

                            .shapes-paint-cls-2, .shapes-paint-cls-3 {
                              stroke-linecap: round;
                            }

                            .shapes-paint-cls-5 {
                              fill: #231815;
                              stroke-width: 0px;
                            }

                            .shapes-paint-cls-3 {
                              stroke-dasharray: 0 0 0 0 0 0 6 1.5 4 2 2 2;
                            }

                            .shapes-paint-cls-4 {
                              stroke-width: .25px;
                            }
                          `}
                        </style>
                      </defs>
                      <g>
                        <g>
                          <path className="shapes-paint-cls-5" d="m9.32,10.48l.32-.32c-.18-.37-.36-.73-.53-1.09l-.9.9c.37.17.72.35,1.09.53l.02-.02h0Z"/>
                          <path className="shapes-paint-cls-5" d="m10.07,10.95l-.77-.44c.06.06.1.1.13.13.17.15.34.29.56.32h.08Z"/>
                          <path className="shapes-paint-cls-5" d="m9.62,10.18l.45.76v-.07c-.03-.22-.17-.39-.32-.56-.03-.03-.07-.07-.13-.13h0Z"/>
                          <polygon className="shapes-paint-cls-5" points="9.32 10.48 9.3 10.5 10.07 10.95 9.62 10.18 9.32 10.48"/>
                          <path className="shapes-paint-cls-5" d="m2.86,5l5.05,5.02c.06.06.16.08.2.03l1.07-1.07c.04-.05.03-.14-.04-.2L4.1,3.76c-.06-.06-.16-.08-.2-.03l-1.07,1.07s-.03.14.04.2Z"/>
                        </g>
                        <g>
                          <path className="shapes-paint-cls-4" d="m8.54,9.63l.64-.64c.04-.05.03-.14-.04-.2L4.09,3.76c-.06-.06-.16-.08-.2-.03l-1.07,1.07s-.03.14.04.2l5.05,5.02c.06.06.16.08.2.03l.09-.09"/>
                          <path className="shapes-paint-cls-4" d="m9.32,10.48l-.02.02c-.37-.18-.73-.36-1.09-.53"/>
                          <path className="shapes-paint-cls-4" d="m9.32,10.48l.32-.32c-.18-.37-.36-.73-.53-1.09"/>
                          <polyline className="shapes-paint-cls-4" points="8.21 9.97 8.54 9.63 9.1 9.07"/>
                        </g>
                      </g>
                      <line className="shapes-paint-cls-3" x1="10.49" y1="29.41" x2="10.49" y2="11.38"/>
                      <polyline className="shapes-paint-cls-1" points="28.53 11.38 28.53 29.41 10.49 29.41"/>
                      <line className="shapes-paint-cls-2" x1="10.49" y1="11.38" x2="28.53" y2="11.38"/>
                    </svg>
                  </div>
                  <span className="tooltip-text">図形を描画</span>
                </div>
  
              <div
                className= "panel-tool-button-small tooltip-container"
                onClick={() => setShapesInstallation(true)}
                onTouchStart={() => setShapesInstallation(true)}
                style={{
                  backgroundColor: shapesInstallation ? '#9199AE' : '#c2c1c1',
                  borderRadius: '0px 5px 5px 0px',
                  borderLeft: '0.5px solid #4A4A4A'
                }}
              >
                <div style={{ transform: 'scale(0.65)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                    <defs>
                      <style>
                        {`
                          .shapes-set-cls-1 {
                            stroke-width: 6px;
                          }

                          .shapes-set-cls-1, .shapes-set-cls-2 {
                            fill: none;
                            stroke: #000;
                            stroke-miterlimit: 10;
                          }

                          .shapes-set-cls-2 {
                            stroke-linecap: round;
                          }

                          .shapes-set-cls-3 {
                            stroke-width: 0px;
                          }
                        `}
                      </style>
                    </defs>
                    <g id="_レイヤー_51" data-name="レイヤー 51">
                      <g>
                        <path className="shapes-set-cls-3" d="m22.23,5.08v11.14c-3-.71-6.01-1.42-9.01-2.12.62,3,1.24,6.01,1.87,9.01H4.2V5.08h18.03Z"/>
                        <path className="shapes-set-cls-2" d="m15.09,23.11H4.2V5.08h18.03v11.14c-3-.71-6.01-1.42-9.01-2.12.62,3,1.24,6.01,1.87,9.01Z"/>
                      </g>
                    </g>
                    <g id="_レイヤー_50" data-name="レイヤー 50">
                      <g id="_レイヤー_22" data-name=" レイヤー 22">
                        <g>
                          <line className="shapes-set-cls-1" x1="27.01" y1="27.9" x2="21.7" y2="22.58"/>
                          <polygon className="shapes-set-cls-3" points="18.56 28.3 15.33 16.22 27.41 19.46 18.56 28.3"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <span className="tooltip-text" style={{ textAlign: 'left' }}>サイズを指定して配置<br />指定後、canvasをクリックして下さい</span>
              </div>
            </div>
          </>
        );

      case 'lineDirectionBtn':
        return  (
          <>
            {/* グラデーションをつけるかどうかのボタン */}
            {shapesInstallation && shapesGradation ? (
              <>
                {/* 円形のグラデーションの方向を変える */}
                <div className="flex">
                  <div
                    className= "pen-panel-button tooltip-container"
                    onClick={() => setLineDirection(true)}
                    onTouchStart={() => setLineDirection(true)}
                    style={{ backgroundColor: lineDirection ? '#9199AE' : '#c2c1c1' }}
                  >
                    <div
                      className="flex"
                      style={{
                        width: '18px',
                        height: '18px',
                        backgroundImage: "linear-gradient(black, transparent)",
                        borderRadius: '50%'
                      }}
                    />
                    <span className="tooltip-text">垂直方向のグラデーション</span>
                  </div>

                  <div
                    className= "pen-panel-button tooltip-container"
                    onClick={() => setLineDirection(false)}
                    onTouchStart={() => setLineDirection(false)}
                    style={{ backgroundColor: !lineDirection ? '#9199AE' : '#c2c1c1' }}
                  >
                    <div
                      className="flex"
                      style={{
                        width: '18px',
                        height: '18px',
                        backgroundImage: "radial-gradient(circle, black, transparent)",
                        borderRadius: '50%'
                      }}
                    />
                    <span className="tooltip-text">中心方向のグラデーション</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex">
                  <div
                    className= "pen-panel-button-grayout"
                  >
                    <div
                      className="flex"
                      style={{
                        width: '18px',
                        height: '18px',
                        backgroundImage: "linear-gradient(black, transparent)",
                        borderRadius: '50%'
                      }}
                    />
                  </div>

                  <div
                    className= "pen-panel-button-grayout"
                  >
                    <div
                      className="flex"
                      style={{
                        width: '18px',
                        height: '18px',
                        backgroundImage: "radial-gradient(circle, black, transparent)",
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        );

      case 'leftAndRightBtn':
        return  (
          <>
            {/* 左右反転ボタン */}
            <div
              className="inversion-button tooltip-container"
              onClick={() => handleInversionClickChange('leftAndRight')}
              onTouchStart={() => handleInversionClickChange('leftAndRight')}
            >
              <svg id="_レイヤー_41のコピー" data-name="レイヤー 41のコピー" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                <defs>
                  <style>
                    {`
                      .left-right-cls-1, .left-right-cls-2 {
                        stroke: #000;
                        stroke-linecap: round;
                        stroke-miterlimit: 10;
                      }

                      .left-right-cls-2 {
                        fill: none;
                      }
                    `}
                  </style>
                </defs>
                <line className="left-right-cls-2" x1="16.17" y1="7.01" x2="16.17" y2="27.1"/>
                <path className="left-right-cls-1" d="m18.8,16.44l6.11-4.95c.51-.42,1.28-.05,1.28.61v9.9c0,.66-.77,1.03-1.28.61l-6.11-4.95c-.39-.32-.39-.91,0-1.22Z"/>
                <path className="left-right-cls-2" d="m13.53,16.44l-6.11-4.95c-.51-.42-1.28-.05-1.28.61v9.9c0,.66.77,1.03,1.28.61l6.11-4.95c.39-.32.39-.91,0-1.22Z"/>
              </svg>
              <span className="tooltip-text">左右に反転</span>
            </div>
          </>
        );

      case 'topAndBottomBtn':
        return  (
          <>
            {/* 上下反転ボタン */}
            <div
              className="inversion-button tooltip-container"
              onClick={() => handleInversionClickChange('topAndBottom')}
              onTouchStart={() => handleInversionClickChange('topAndBottom')}
            >
              <svg id="_レイヤー_41" data-name="レイヤー 41" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.38 32.86" width="32.38" height="32.86">
                <defs>
                  <style>
                    {`
                      .top-bottom-cls-1, .top-bottom-cls-2 {
                        stroke: #000;
                        stroke-linecap: round;
                        stroke-miterlimit: 10;
                      }

                      .top-bottom-cls-2 {
                        fill: none;
                      }
                    `}
                  </style>
                </defs>
                <line className="top-bottom-cls-2" x1="6.12" y1="17.05" x2="26.21" y2="17.05"/>
                <path className="top-bottom-cls-1" d="m15.55,14.42l-4.95-6.11c-.42-.51-.05-1.28.61-1.28h9.9c.66,0,1.03.77.61,1.28l-4.95,6.11c-.32.39-.91.39-1.22,0Z"/>
                <path className="top-bottom-cls-2" d="m15.55,19.69l-4.95,6.11c-.42.51-.05,1.28.61,1.28h9.9c.66,0,1.03-.77.61-1.28l-4.95-6.11c-.32-.39-.91-.39-1.22,0Z"/>
              </svg>
              <span className="tooltip-text">上下に反転</span>
            </div>
          </>
        );

      case 'rotateVerticalBtn':
        return  (
          <>
            {/* 右に90度反転ボタン */}
            <div
              className="inversion-button tooltip-container-right bi-reply-fill-right"
              onClick={() => handleInversionClickChange('rotateVertical')}
              onTouchStart={() => handleInversionClickChange('rotateVertical')}
              style={{ boxShadow: '-1px 1px black' }}
            >
              <i className="bi bi-arrow-90deg-down"></i>
              <span className="tooltip-text-right">右に90度回転</span>
            </div>
          </>
        );

        case 'rotateVerticalOppositionBtn':
          return  (
            <>
              {/* 左に90度回転ボタン */}
              <div
                className="inversion-button tooltip-container"
                onClick={() => handleInversionClickChange('rotateVerticalOpposition')}
                onTouchStart={() => handleInversionClickChange('rotateVerticalOpposition')}
              >
                <i className="bi bi-arrow-90deg-down"></i>
                <span className="tooltip-text">左に90度回転</span>
              </div>
            </>
          );
      case 'shapesGradationBtn':
        return  (
          <>
            {/* グラデーションをつけるかどうかのボタン */}
            {shapesInstallation ? (
              <>
                <div
                  className= "pen-panel-button tooltip-container"
                  onClick={handleShapesGradationChange}
                  onTouchStart={handleShapesGradationChange}
                  style={{ backgroundColor: shapesGradation ? '#9199AE' : '#c2c1c1' }}
                  >
                  <div
                    className= "flex"
                    style={{
                      width: '18px',
                      height: '18px',
                      backgroundImage: "linear-gradient(black, transparent)",
                      borderRadius: '0.5px',
                      border: '1px solid black'
                    }}
                  >
                  </div>
                  <span className="tooltip-text">グラデーションをつける</span>
                </div>
              </>
            ) : (
              <>
                <div
                  className= "pen-panel-button-grayout"
                  >
                  <div
                    className= "flex"
                    style={{
                      width: '18px',
                      height: '18px',
                      backgroundImage: "linear-gradient(black, transparent)",
                      borderRadius: '0.5px',
                      border: '1px solid black'
                    }}
                  >
                  </div>
                </div>
              </>
            )}
          </>
        );
      case 'rectPreview':
        return  (
          <>
            <div className="flex-start-start">
              <span className="destination-layer" style={{ color: '#ececec' }}>四角形のプレビュー</span>
              {!shapesGradation ? (
                <div className="pen-tool-preview-container">
                  <div className="pen-tool-preview-background flex">
                    <div
                      className="flex"
                      style={{
                        width: `${shapesWidthSize * scaleRatioPreview}px`,
                        height: `${shapesHeightSize * scaleRatioPreview}px`,
                        backgroundColor: `${shapesFillChange !== 'nofill' ? currentAlphaColor : 'transparent'}`,
                        borderRadius: `${cornerChange ? `${upperLeft * scaleRatioPreview}px ${upperRight * scaleRatioPreview}px ${lowerRight * scaleRatioPreview}px ${lowerLeft * scaleRatioPreview}px` : 'none'}`,
                        border: `${
                          shapesFillChange !== 'nostroke'
                            ? `${Math.min(toolSize * scaleRatioPreview, 15)}px solid ${
                                shapesFillChange === 'allpaint' ? secondAlphaColor : currentAlphaColor
                              }`
                            : 'none'
                        }`                        
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="pen-tool-preview-container">
                  <div className="pen-tool-preview-background flex">
                    <div
                      className="flex"
                      style={{
                        width: `${shapesWidthSize * scaleRatioPreview}px`,
                        height: `${shapesHeightSize * scaleRatioPreview}px`,
                        backgroundImage: `linear-gradient(${currentAlphaColor}, ${secondAlphaColor})`
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case 'circlePreview':
        return  (
          <>
            <div className="flex-start-start">
              <span className="destination-layer" style={{ color: '#ececec' }}>円形のプレビュー</span>
              {!shapesGradation ? (
                <div className="pen-tool-preview-container">
                  <div className="pen-tool-preview-background flex">
                    <div
                      className="flex"
                      style={{
                        width: `${shapesWidthSize * scaleRatioPreview}px`,
                        height: `${shapesHeightSize * scaleRatioPreview}px`,
                        backgroundColor: `${shapesFillChange !== 'nofill' ? currentAlphaColor : 'transparent'}`,
                        borderRadius: '50%',
                        border: `${
                          shapesFillChange !== 'nostroke'
                            ? `${Math.min(toolSize * scaleRatioPreview, 15)}px solid ${
                                shapesFillChange === 'allpaint' ? secondAlphaColor : currentAlphaColor
                              }`
                            : 'none'
                        }`
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="pen-tool-preview-container">
                  <div className="pen-tool-preview-background flex">
                    <div
                      className="flex"
                      style={{
                        width: `${shapesWidthSize * scaleRatioPreview}px`,
                        height: `${shapesHeightSize * scaleRatioPreview}px`,
                        backgroundImage: lineDirection 
                          ? `linear-gradient(${currentAlphaColor}, ${secondAlphaColor})` 
                          : `radial-gradient(circle, ${currentAlphaColor}, ${secondAlphaColor})`,
                        borderRadius: '50%'
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      case 'trianglePreview':
        return  (
          <>
            <div className="flex-start-start">
              <span className="destination-layer" style={{ color: '#ececec' }}>三角形のプレビュー</span>

              <div className="pen-tool-preview-container">
                <div className="pen-tool-preview-background flex">
                  <svg width={shapesWidthSize * scaleRatioPreview} height={shapesHeightSize * scaleRatioPreview}>
                    <polygon
                      points={`0,${shapesHeightSize * scaleRatioPreview} ${shapesWidthSize * scaleRatioPreview / 2},0 ${shapesWidthSize * scaleRatioPreview},${shapesHeightSize * scaleRatioPreview}`}
                      fill={shapesFillChange !== 'nofill' ? currentAlphaColor : 'transparent'}
                      stroke={shapesFillChange !== 'nostroke' ? (shapesFillChange === 'allpaint' ? secondAlphaColor : currentAlphaColor) : 'none'}
                      strokeWidth="2" // 線の太さを適切な値に調整
                      strokeLinejoin="miter" // 尖った角を作るための設定
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        );
      case 'linePreview':
        return  (
          <>
            <div className="flex-start-start">
              <span className="destination-layer" style={{ color: '#ececec' }}>直線のプレビュー</span>
              <div className="pen-tool-preview-container">
                <div className="pen-tool-preview-background flex">
                  <div
                    className="flex"
                    style={{
                      width: `${toolSize * scaleRatioPreview}px`,
                      height: `${shapesHeightSize * scaleRatioPreview}px`,
                      backgroundColor: `${currentAlphaColor}`,
                      borderRadius: `${Math.min(toolSize / 2, 15)}px`
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        );
    default:
      return (
        <>
          <span>設定はありません</span>
        </>
      );
  }
};


export { ShapesPartsComponent };