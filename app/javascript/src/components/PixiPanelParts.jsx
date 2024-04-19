import React, { useEffect, useRef, useState } from 'react';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';


const PixiPanelParts = ({ PanelParts, formTitle, inputValue, direction, type, minValue, maxValue, handleRunButton }) => {

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
    setInputAngleSprite
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
  const rotationTypeChange = () => {
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
                    min="0"
                    max="200"
                    step="0.1"
                    style={{ width: '60px', fontSize: '14px' }}
                    value={inputValue}
                    onChange={(e) => handleDirectionAnimeChange(e, direction, type)}
                    onBlur={() => handleDirectionAnime(inputValue, direction, type, minValue, maxValue)}
                  />
                  <span className="tooltip-text">最大値{maxValue}</span>
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
            <div className="flex" style={{ boxShadow: '1px 1px black', borderRadius: '5px', width: '50px' }}>
              <div
                className= "panel-tool-button-small tooltip-container"
                onClick={() => setClockwiseType(true)}
                onTouchStart={() => setClockwiseType(true)}
                style={{
                  backgroundColor: clockwiseType ? '#9199AE' : '#c2c1c1',
                  borderRadius: '5px 0px 0px 5px',
                  borderRight: '0.5px solid #4A4A4A'
                }}
              >
                <div style={{ transform: 'scale(0.65)' }}>
                  右
                </div>
                <span className="tooltip-text">右から</span>
              </div>

              <div
              className= "panel-tool-button-small tooltip-container"
              onClick={() => setClockwiseType(false)}
              onTouchStart={() => setClockwiseType(false)}
              style={{
                backgroundColor: !clockwiseType ? '#9199AE' : '#c2c1c1',
                borderRadius: '0px 5px 5px 0px',
                borderLeft: '0.5px solid #4A4A4A'
              }}
              >
              <div style={{ transform: 'scale(0.65)' }}>
              左
              </div>
              <span className="tooltip-text">左から</span>
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
              onClick={rotationTypeChange}
              onTouchStart={rotationTypeChange}
            >
              {rotationTypeChange ? (
                <>
                  回
                  <span className="tooltip-text">360度回転に切り替える</span>
                </>
              ) : (
                <>
                  ふ
                  <span className="tooltip-text">振り子に切り替える</span>
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
                  min="0"
                  max="200"
                  step="0.1"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputValue}
                  onChange={(e) => handleRotationAnimeFormChange(e, type)}
                  onBlur={() => handleRotationAnimeForm(inputValue, type, minValue, maxValue)}
                />
                <span className="tooltip-text">最大値{maxValue}</span>
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
                  min="0"
                  max="200"
                  step="0.1"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputValue}
                  onChange={(e) => handleScaleAnimeFormChange(e, type)}
                  onBlur={() => handleScaleAnimeForm(inputValue, type, minValue, maxValue)}
                />
                <span className="tooltip-text">最大値{maxValue}</span>
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
        min="0"
        max="200"
        step="0.1"
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

      case 'selectFillColorBtn':
        return (
            <>
              {/* 塗りつぶしボタン */}
            
  
          </>
        );

      case 'imageToolOption':
        return (
          <>
            {/* 画像挿入モードの詳細 */}
        
          </>
        );

        case 'selectLayerClearIcon':
          return (
            <>
      
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