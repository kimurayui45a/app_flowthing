import React, { useEffect, useRef, useState } from 'react';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';


const PixiPanelParts = ({ PanelParts, formTitle, inputValue, direction, type, minValue, maxValue, handleRunButton, explanation }) => {

  const {
    //上下左右アニメーション
    leftRightAmplitude,
    setLeftRightAmplitude,
    inputLeftRightAmplitude,
    setInputLeftRightAmplitude,
    leftRightPeriod,
    setLeftRightPeriod,
    inputLeftRightPeriod,
    setInputLeftRightPeriod,
    topBottomAmplitude,
    setTopBottomAmplitude,
    inputTopBottomAmplitude,
    setInputTopBottomAmplitude,
    topBottomPeriod,
    setTopBottomPeriod,
    inputTopBottomPeriod,
    setInputTopBottomPeriod,
    clockwiseType,
    setClockwiseType,
    rotationTypeTab,
    setRotationTypeTab,

    //回転アニメーション
    rotationSpeed,
    setRotationSpeed,
    inputRotationSpeed,
    setInputRotationSpeed,
    pendulumPeriod,
    setPendulumPeriod,
    inputPendulumPeriod,
    setInputPendulumPeriod,
    pendulumMaxRotation,
    setPendulumMaxRotation,
    inputPendulumMaxRotation,
    setInputPendulumMaxRotation,

    //スケールアニメーション
    scaleAnimationPeriod,
    setScaleAnimationPeriod,
    inputScaleAnimationPeriod,
    setInputScaleAnimationPeriod,
    scaleAnimationMaxScale,
    setScaleAnimationMaxScale,
    inputScaleAnimationMaxScale,
    setInputScaleAnimationMaxScale,
    scaleAnimationMinScale,
    setScaleAnimationMinScale,
    inputScaleAnimationMinScale,
    setInputScaleAnimationMinScale,

    //スプライトのパラメータ
    scaleSprite,
    setScaleSprite,
    inputScaleSprite,
    setInputScaleSprite,
    alphaSprite,
    setAlphaSprite,
    inputAlphaSprite,
    setInputAlphaSprite,
    angleSprite,
    setAngleSprite,
    inputAngleSprite,
    setInputAngleSprite,

    //ランダムアニメ
    randomEasing,
    setRandomEasing,
    inputRandomEasing,
    setInputRandomEasing,
    randomCloseEnough,
    setRandomCloseEnough,
    inputRandomCloseEnough,
    setInputRandomCloseEnough,
    moveClickSpeed,
    setMoveClickSpeed,
    inputMoveClickSpeed,
    setInputMoveClickSpeed,

    //範囲アニメ
    boundaryAnimeSpeed,
    setBoundaryAnimeSpeed,
    inputBoundaryAnimeSpeed,
    setInputBoundaryAnimeSpeed,
    boundaryAnimeXValue,
    setBoundaryAnimeXValue,
    inputBoundaryAnimeXValue,
    setInputBoundaryAnimeXValue,
    boundaryAnimeYValue,
    setBoundaryAnimeYValue,
    inputBoundaryAnimeYValue,
    setInputBoundaryAnimeYValue,
    boundaryAnimeWidth,
    setBoundaryAnimeWidth,
    inputBoundaryAnimeWidth,
    setInputBoundaryAnimeWidth,
    boundaryAnimeHeight,
    setBoundaryAnimeHeight,
    inputBoundaryAnimeHeight,
    setInputBoundaryAnimeHeight,

    //円形アニメ
    circularAnimeSpeed,
    setCircularAnimeSpeed,
    inputCircularAnimeSpeed,
    setInputCircularAnimeSpeed,
    circularAnimeXValue,
    setCircularAnimeXValue,
    inputCircularAnimeXValue,
    setInputCircularAnimeXValue,
    circularAnimeYValue,
    setCircularAnimeYValue,
    inputCircularAnimeYValue,
    setInputCircularAnimeYValue,
    circularAnimeRadius,
    setCircularAnimeRadius,
    inputCircularAnimeRadius,
    setInputCircularAnimeRadius
  } = usePixiGroup();

  const { 
    activeSprite,
    spriteInfo
  } = usePixiComponentShare();

  const sprite = spriteInfo.find(s => s.sprite_id === activeSprite);



    //上下左右のアニメのパラメータ
    const updateDirectionAnime = (newValue, direction, type, minValue, maxValue) => {
      if (newValue >= minValue && newValue <= maxValue) {
  
        if (direction === 'leftRight') {
          if (type === 'amplitude') {
            setLeftRightAmplitude(newValue)
            setInputLeftRightAmplitude(String(newValue))
          } else {
            setLeftRightPeriod(newValue)
            setInputLeftRightPeriod(String(newValue))
          }
        } else {
          if (type === 'amplitude') {
            setTopBottomAmplitude(newValue)
            setInputTopBottomAmplitude(String(newValue))
          } else {
            setTopBottomPeriod(newValue)
            setInputTopBottomPeriod(String(newValue))
          }
        }
      }
    };
  
    const handleDirectionAnimeChange = (e, direction, type) => {
      const value = e.target.value;
  
      if (direction === 'leftRight') {
        if (type === 'amplitude') {
          setInputLeftRightAmplitude(String(value))
        } else {
          setInputLeftRightPeriod(String(value))
        }
      } else {
        if (type === 'amplitude') {
          setInputTopBottomAmplitude(String(value))
        } else {
          setInputTopBottomPeriod(String(value))
        }
      }
    };

  const handleDirectionAnime = (inputValue, direction, type, minValue, maxValue) => {
    const newValue = parseInt(inputValue, 10);
    if (newValue >= minValue && newValue <= maxValue) {

      updateDirectionAnime(newValue, direction, type, minValue, maxValue);
    } else {

      if (direction === 'leftRight') {
        if (type === 'amplitude') {
          setInputLeftRightAmplitude(String(leftRightAmplitude))
        } else {
          setInputLeftRightPeriod(String(leftRightPeriod))
        }
      } else {
        if (type === 'amplitude') {
          setInputTopBottomAmplitude(String(topBottomAmplitude))
        } else {
          setInputTopBottomPeriod(String(topBottomPeriod))
        }
      }
    }
  };


  //回転アニメの切り替えボタン
  const rotationTypeChangeBtn = () => {
    setRotationTypeTab(!rotationTypeTab)
  };


    //回転のアニメのパラメータ
    const updateRotationAnimeForm = (newValue, type, minValue, maxValue) => {
      if (newValue >= minValue && newValue <= maxValue) {

        if (type === 'rotation') {
          setRotationSpeed(newValue)
          setInputRotationSpeed(String(newValue))
        } else if (type === 'maxRotation') {
          setPendulumMaxRotation(newValue)
          setInputPendulumMaxRotation(String(newValue))
        } else {
          setPendulumPeriod(newValue)
          setInputPendulumPeriod(String(newValue))
        }
      }
    };
  
    const handleRotationAnimeFormChange = (e, type) => {
      const value = e.target.value;
  
      if (type === 'rotation') {
        setInputRotationSpeed(String(value))
      } else if (type === 'maxRotation') {
        setInputPendulumMaxRotation(String(value))
      } else {
        setInputPendulumPeriod(String(value))
      }
    };

  const handleRotationAnimeForm = (inputValue, type, minValue, maxValue) => {
    let newValue;
    if (type === 'maxRotation') {
      const inputNewValue = parseFloat(inputValue);
      newValue = Math.round(inputNewValue * 10) / 10;
    } else {
      newValue = parseInt(inputValue, 10);
    }
    if (newValue >= minValue && newValue <= maxValue) {
      updateRotationAnimeForm(newValue, type, minValue, maxValue);
    } else {
      if (type === 'rotation') {
        setInputRotationSpeed(String(rotationSpeed))
      } else if (type === 'maxRotation') {
        setInputPendulumMaxRotation(String(pendulumMaxRotation))
      } else {
        setInputPendulumPeriod(String(pendulumPeriod))
      }
    }
  };




    //スケールのアニメのパラメータ
    const updateScaleAnimeForm = (newValue, type, minValue, maxValue) => {
      if (newValue >= minValue && newValue <= maxValue) {

        if (type === 'period') {
          setScaleAnimationPeriod(newValue)
          setInputScaleAnimationPeriod(String(newValue))
        } else if (type === 'maxScale') {
          setScaleAnimationMaxScale(newValue)
          setInputScaleAnimationMaxScale(String(newValue))
        } else {
          setScaleAnimationMinScale(newValue)
          setInputScaleAnimationMinScale(String(newValue))
        }
      }
    };
  
    const handleScaleAnimeFormChange = (e, type) => {
      const value = e.target.value;
  
      if (type === 'period') {
        setInputScaleAnimationPeriod(String(value))
      } else if (type === 'maxScale') {
        setInputScaleAnimationMaxScale(String(value))
      } else {
        setInputScaleAnimationMinScale(String(value))
      }
    };

  const handleScaleAnimeForm = (inputValue, type, minValue, maxValue) => {
    let newValue;
    if (type === 'period') {
      newValue = parseInt(inputValue, 10);
    } else {
      const inputNewValue = parseFloat(inputValue);
      newValue = Math.round(inputNewValue * 10) / 10;
    }
    if (newValue >= minValue && newValue <= maxValue) {
      updateScaleAnimeForm(newValue, type, minValue, maxValue);
    } else {
      if (type === 'period') {
        setInputScaleAnimationPeriod(String(scaleAnimationPeriod))
      } else if (type === 'maxScale') {
        setInputScaleAnimationMaxScale(String(scaleAnimationMaxScale))
      } else {
        setInputScaleAnimationMinScale(String(scaleAnimationMinScale))
      }
    }
  };



    //スプライトのパラメータ
    const updateSpriteForm = (newValue, type, minValue, maxValue) => {
      if (newValue >= minValue && newValue <= maxValue) {

        if (type === 'scale') {
          setScaleSprite(newValue)
          setInputScaleSprite(String(newValue))
        } else if (type === 'alpha') {
          setAlphaSprite(newValue)
          setInputAlphaSprite(String(newValue))
        } else {
          setAngleSprite(newValue)
          setInputAngleSprite(String(newValue))
        }
      }
    };
  
    const handleSpriteFormChange = (e, type) => {
      const value = e.target.value;
  
      if (type === 'scale') {
        setInputScaleSprite(String(value))
      } else if (type === 'alpha') {
        setInputAlphaSprite(String(value))
      } else {
        setInputAngleSprite(String(value))
      }
    };

  const handleSpriteForm = (inputValue, type, minValue, maxValue) => {

    let newValue;
    const inputNewValue = parseFloat(inputValue);
    if (type === 'scale') {
      newValue = Math.round(inputNewValue * 100) / 100;
    } else {
      newValue = Math.round(inputNewValue * 10) / 10;
    }

    if (newValue >= minValue && newValue <= maxValue) {
      updateSpriteForm(newValue, type, minValue, maxValue);
    } else {
      if (type === 'scale') {
        setInputScaleSprite(String(scaleSprite))
      } else if (type === 'alpha') {
        setInputAlphaSprite(String(alphaSprite))
      } else {
        setInputAngleSprite(String(angleSprite))
      }
    }
  };




  //ランダムアニメ
  const updateRandomAnimeForm = (newValue, type) => {
    if (newValue >= 0.01 && newValue <= 1) {
      if (type === 'circularSpeed') {
        setCircularAnimeSpeed(newValue)
        setInputCircularAnimeSpeed(String(newValue))
      } else if (type === 'boundarySpeed') {
        setBoundaryAnimeSpeed(newValue)
        setInputBoundaryAnimeSpeed(String(newValue))
      } else if (type === 'moveClick') {
        setMoveClickSpeed(newValue)
        setInputMoveClickSpeed(String(newValue))
      } else if (type === 'easing') {
        setRandomEasing(newValue)
        setInputRandomEasing(String(newValue))
      } else {
        setRandomCloseEnough(newValue)
        setInputRandomCloseEnough(String(newValue))
      }
    }
  };
  
    const handleRandomAnimeChange = (e, type) => {
      const value = e.target.value;
      if (type === 'circularSpeed') {
        setInputCircularAnimeSpeed(String(value))
      } else if (type === 'boundarySpeed') {
        setInputBoundaryAnimeSpeed(String(value))
      } else if (type === 'moveClick') {
        setInputMoveClickSpeed(String(value))
      } else if (type === 'easing') {
        setInputRandomEasing(String(value))
      } else {
        setInputRandomCloseEnough(String(value))
      }
    };

  const handleRandomAnimeForm = (inputValue, type) => {
    const inputNewValue = parseFloat(inputValue);
    const newValue = Math.round(inputNewValue * 100) / 100;

    if (newValue >= 0.01 && newValue <= 1) {
      updateRandomAnimeForm(newValue, type);
    } else {
      if (type === 'circularSpeed') {
        setInputCircularAnimeSpeed(String(circularAnimeSpeed))
      } else if (type === 'boundarySpeed') {
        setInputBoundaryAnimeSpeed(String(boundaryAnimeSpeed))
      } else if (type === 'moveClick') {
        setInputMoveClickSpeed(String(moveClickSpeed))
      } else if (type === 'easing') {
        setInputRandomEasing(String(randomEasing))
      } else {
        setInputRandomCloseEnough(String(randomCloseEnough))
      }
    }
  };




    //範囲アニメのパラメータ
    const updateBoundaryAnimeForm = (newValue, type) => {
      if (newValue >= 1 && newValue <= 1200) {
  
        if (type === 'xValue') {
          setBoundaryAnimeXValue(newValue)
          setInputBoundaryAnimeXValue(String(newValue))
        } else if (type === 'yValue') {
          setBoundaryAnimeYValue(newValue)
          setInputBoundaryAnimeYValue(String(newValue))
        } else if (type === 'width') {
          setBoundaryAnimeWidth(newValue)
          setInputBoundaryAnimeWidth(String(newValue))
        } else {
          setBoundaryAnimeHeight(newValue)
          setInputBoundaryAnimeHeight(String(newValue))
        }
      }
    };
  
    const handleBoundaryAnimeChange = (e, type) => {
      const value = e.target.value;
  
      if (type === 'xValue') {
        setInputBoundaryAnimeXValue(String(value))
      } else if (type === 'yValue') {
        setInputBoundaryAnimeYValue(String(value))
      } else if (type === 'width') {
        setInputBoundaryAnimeWidth(String(value))
      } else {
        setInputBoundaryAnimeHeight(String(value))
      }
    };

  const handleBoundaryAnimeForm = (inputValue, type) => {
    const newValue = parseInt(inputValue, 10);

    if (newValue >= 1 && newValue <= 1200) {
      updateBoundaryAnimeForm(newValue, type);
    } else {
      if (type === 'xValue') {
        setInputBoundaryAnimeXValue(String(boundaryAnimeXValue))
      } else if (type === 'yValue') {
        setInputBoundaryAnimeYValue(String(boundaryAnimeYValue))
      } else if (type === 'width') {
        setInputBoundaryAnimeWidth(String(boundaryAnimeWidth))
      } else {
        setInputBoundaryAnimeHeight(String(boundaryAnimeHeight))
      }
    }
  };





    //円形アニメのパラメータ
    const updateCircularAnimeForm = (newValue, type) => {
      if (newValue >= 1 && newValue <= 1200) {
  
        if (type === 'xValue') {
          setCircularAnimeXValue(newValue)
          setInputCircularAnimeXValue(String(newValue))
        } else if (type === 'yValue') {
          setCircularAnimeYValue(newValue)
          setInputCircularAnimeYValue(String(newValue))
        } else {
          setCircularAnimeRadius(newValue)
          setInputCircularAnimeRadius(String(newValue))
        }
      }
    };
  
    const handleCircularAnimeChange = (e, type) => {
      const value = e.target.value;
  
      if (type === 'xValue') {
        setInputCircularAnimeXValue(String(value))
      } else if (type === 'yValue') {
        setInputCircularAnimeYValue(String(value))
      } else {
        setInputCircularAnimeRadius(String(value))
      }
    };

  const handleCircularAnimeForm = (inputValue, type) => {
    const newValue = parseInt(inputValue, 10);

    if (newValue >= 1 && newValue <= 1200) {
      updateCircularAnimeForm(newValue, type);
    } else {
      if (type === 'xValue') {
        setInputCircularAnimeXValue(String(circularAnimeXValue))
      } else if (type === 'yValue') {
        setInputCircularAnimeYValue(String(circularAnimeYValue))
      } else {
        setInputCircularAnimeRadius(String(circularAnimeRadius))
      }
    }
  };

  switch (PanelParts) {
    case 'directionForm':
      return  (
        <>
        {/* 上下左右フォーム */}
          <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
            <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{formTitle}</span></div>
            <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
              <input
                className="no-drag form-select-value"
                type="number"
                min={minValue}
                max={maxValue}
                step="1"
                style={{ width: '60px', fontSize: '14px' }}
                value={inputValue}
                onChange={(e) => handleDirectionAnimeChange(e, direction, type)}
                onBlur={() => handleDirectionAnime(inputValue, direction, type, minValue, maxValue)}
              />
              <span className="tooltip-text" style={{ textAlign: 'left' }}>{explanation}<br />最大値{maxValue}</span>
            </div>
          </div>
        </>
        );
      case 'directionRunButton':
        return (
          <>
            {/* 上下左右の決定ボタン */}
            <div
              className="select-confirm-btn"
              onClick={handleRunButton}
              onTouchStart={handleRunButton}
              style={{ width: 'auto', height: 'auto', padding: '2px 12px', marginTop: '5px' }}
            >
              {formTitle}
            </div>
          </>
        );
      case 'selectClockwiseType':
        return (
          <>
            {/* 回転方向決定ボタン */}
            <div className="flex" style={{ boxShadow: '1px 1px black', borderRadius: '5px', width: '40px' }}>
              <div
                className= "panel-tool-button-small tooltip-container"
                onClick={() => setClockwiseType(true)}
                onTouchStart={() => setClockwiseType(true)}
                style={{
                  backgroundColor: clockwiseType ? '#9199AE' : '#c2c1c1',
                  borderRadius: '5px 0px 0px 5px',
                  borderRight: '0.5px solid #4A4A4A',
                  width: '20px',
                  height: '20px'
                }}
              >
                <div>
                <i className="bi bi-arrow-clockwise"></i>
                </div>
                <span className="tooltip-text">時計回り</span>
              </div>

              <div
                className= "panel-tool-button-small tooltip-container"
                onClick={() => setClockwiseType(false)}
                onTouchStart={() => setClockwiseType(false)}
                style={{
                  backgroundColor: !clockwiseType ? '#9199AE' : '#c2c1c1',
                  borderRadius: '0px 5px 5px 0px',
                  borderLeft: '0.5px solid #4A4A4A',
                  width: '20px',
                  height: '20px'
                }}
              >
                <div>
                <i className="bi bi-arrow-counterclockwise"></i>
                </div>
                <span className="tooltip-text">反時計回り</span>
              </div>
            </div>
          </>
        );
      case 'selectRotateAnimeBtn':
        return (
          <>
            {/* 回転アニメパネル切り替えボタン */}
            <div
              className="panel-tool-button tooltip-container"
              onClick={rotationTypeChangeBtn}
              onTouchStart={rotationTypeChangeBtn}
              style={{ width: '20px', height: '20px' }}
            >
              {rotationTypeTab ? (
                <>
                  <i className="bi bi-arrow-repeat"></i>
                  <span className="tooltip-text">360度回転アニメ</span>
                </>
              ) : (
                <>
                  <i className="bi bi-broadcast"></i>
                  <span className="tooltip-text">振り子アニメ</span>
                </>
              )}
            </div>
          </>
        );
      case 'rotationAnimeForm':
        return (
          <>
            {/* 回転のアニメのパラメータフォーム */}
            <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{formTitle}</span></div>
              <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                <input
                  className="no-drag form-select-value"
                  type="number"
                  min={minValue}
                  max={maxValue}
                  step="1"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputValue}
                  onChange={(e) => handleRotationAnimeFormChange(e, type)}
                  onBlur={() => handleRotationAnimeForm(inputValue, type, minValue, maxValue)}
                />
                <span className="tooltip-text" style={{ textAlign: 'left' }}>{explanation}<br />最大値{maxValue}</span>
              </div>
            </div>
          </>
        );
      case 'scaleAnimeForm':
        return (
          <>
            {/* スケールアニメのパラメータフォーム */}
            <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{formTitle}</span></div>
              <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                <input
                  className="no-drag form-select-value"
                  type="number"
                  min={minValue}
                  max={maxValue}
                  step="1"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputValue}
                  onChange={(e) => handleScaleAnimeFormChange(e, type)}
                  onBlur={() => handleScaleAnimeForm(inputValue, type, minValue, maxValue)}
                />
                <span className="tooltip-text" style={{ textAlign: 'left' }}>{explanation}<br />最大値{maxValue}</span>
              </div>
            </div>
          </>
        );
      case 'spriteForm':
        return (
          <>
            {/* スプライトのパラメータフォーム */}
            <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{formTitle}</span></div>
              <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                <input
                  className="no-drag form-select-value"
                  type="number"
                  min={minValue}
                  max={maxValue}
                  step="1"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputValue}
                  onChange={(e) => handleSpriteFormChange(e, type)}
                  onBlur={() => handleSpriteForm(inputValue, type, minValue, maxValue)}
                />
                <span className="tooltip-text">最大値{maxValue}</span>
              </div>
            </div>
          </>
        );

      case 'randomAnimeForm':
        return (
          <>
            {/* ランダムアニメ */}  
            <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{formTitle}</span></div>
              <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                <input
                  className="no-drag form-select-value"
                  type="number"
                  min="0.01"
                  max="1"
                  step="0.01"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputValue}
                  onChange={(e) => handleRandomAnimeChange(e, type)}
                  onBlur={() => handleRandomAnimeForm(inputValue, type)}
                />
                <span className="tooltip-text" style={{ textAlign: 'left' }}>{explanation}<br />最大値 1</span>
              </div>
            </div>
          </>
        );

      case 'boundaryAnimeForm':
        return (
          <>
            {/* 範囲アニメのフォーム */}
            <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{formTitle}</span></div>
              <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                <input
                  className="no-drag form-select-value"
                  type="number"
                  min="1"
                  max="1200"
                  step="1"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputValue}
                  onChange={(e) => handleBoundaryAnimeChange(e, type)}
                  onBlur={() => handleBoundaryAnimeForm(inputValue, type)}
                />
                <span className="tooltip-text" style={{ textAlign: 'left' }}>{explanation}<br />最大値 1200</span>
              </div>
            </div>
          </>
        );

        case 'circularAnimeForm':
          return (
            <>
              {/* 円形アニメのフォーム */}
              <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
                <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>{formTitle}</span></div>
                <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                  <input
                    className="no-drag form-select-value"
                    type="number"
                    min="1"
                    max="1200"
                    step="1"
                    style={{ width: '60px', fontSize: '14px' }}
                    value={inputValue}
                    onChange={(e) => handleCircularAnimeChange(e, type)}
                    onBlur={() => handleCircularAnimeForm(inputValue, type)}
                  />
                  <span className="tooltip-text" style={{ textAlign: 'left' }}>{explanation}<br />最大値 1200</span>
                </div>
              </div>
            </>
          );
        case 'selectAreaDeleteBtn':
          return (
            <>
              {/* 「選択範囲」を削除するボタン */}
        
            </>
          );

        case 'selectAreaDeleteInversionBtn':
          return (
            <>
              {/* 「選択範囲外」を削除するボタン */}
              <div
                className="panel-tool-button-small tooltip-container"
                onClick={() => setSelectDeleteInversion(true)}
                onTouchStart={() => setSelectDeleteInversion(true)}
                style={{
                  backgroundColor: selectDeleteInversion ? '#9199AE' : '#c2c1c1',
                  borderRadius: '0px 5px 5px 0px',
                  borderLeft: '0.5px solid #4A4A4A'
                }}
              >
                <SelectToolComponent selectToolButton="selectAreaDeleteInversionIcon" />
                <span className="tooltip-text">選択範囲外を削除</span>
              </div>
            </>
          );
      default:
        return  (
          <>
            <span>詳細設定はありません。</span>
          </>
        );
  }

};


export { PixiPanelParts };