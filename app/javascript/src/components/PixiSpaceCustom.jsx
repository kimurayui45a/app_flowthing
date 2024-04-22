import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiPanelParts } from './PixiPanelParts';



const PixiSpaceCustom = () => {


  const {
    listPanelPosition,
    setListPanelPosition,
    handlePixiPanelDragStop,

    //背景アニメ
    spaceAnimeDirection,
    setSpaceAnimeDirection,
    spaceAnimeSpeed,
    setSpaceAnimeSpeed,
    inputSpaceAnimeSpeed,
    setInputSpaceAnimeSpeed,
    intervalTime,
    setIntervalTime,
    inputIntervalTime,
    setInputIntervalTime
  } = usePixiGroup();


  const {
    handleAddSprite,
    updateSpaceAnime,
    spaceSpritesAnime,
    handleRemoveSpaceData,
    setSpaceAnimMode,
    updateSimpleSpace,
    spaceAnimMode,
    maxSpaceSprites
  } = usePixiComponentShare();


//背景の速さ方向を切り替える
  const updateSpaceAnimeDirection = (newDirection) => {
    setSpaceAnimeDirection(newDirection)
    }
  

    //背景の速さ
    const updateSpaceAnimeForm = (newValue) => {
      if (newValue >= 0.1 && newValue <= 100) {
        setSpaceAnimeSpeed(newValue)
        setInputSpaceAnimeSpeed(String(newValue))
      }
    };
  
    const handleSpaceAnimeChange = (e) => {
      const value = e.target.value;
      setInputSpaceAnimeSpeed(String(value))
      
    };

  const handleSpaceAnimeForm = () => {
    const inputNewValue = parseFloat(inputSpaceAnimeSpeed);
    const newValue = Math.round(inputNewValue * 10) / 10;

    if (newValue >= 0.1 && newValue <= 100) {
      updateSpaceAnimeForm(newValue);
    } else {
      setInputSpaceAnimeSpeed(String(spaceAnimeSpeed))
    }
  };


    //背景アニメを切り替える時間
    const updateIntervalTimeForm = (newValue) => {
      if (newValue >= 1 && newValue <= 600000) {
        setIntervalTime(newValue)
        setInputIntervalTime(String(newValue))
      }
    };
  
    const handleIntervalTimeChange = (e) => {
      const value = e.target.value;
      setInputIntervalTime(String(value))
      
    };

  const handleIntervalTimeForm = () => {
    const newValue = parseInt(inputIntervalTime, 10);

    if (newValue >= 1 && newValue <= 600000) {
      updateIntervalTimeForm(newValue);
    } else {
      setInputIntervalTime(String(intervalTime))
    }
  };

  return (
    <>
      {/* 背景方向決定ボタン */}
      <div className="flex" style={{ boxShadow: '1px 1px black', borderRadius: '5px', width: '150px' }}>
        <div
          className= "panel-tool-button-small tooltip-container"
          onClick={() => updateSpaceAnimeDirection('topBottom')}
          onTouchStart={() => updateSpaceAnimeDirection('topBottom')}
          style={{
            backgroundColor: spaceAnimeDirection === 'topBottom' ? '#9199AE' : '#c2c1c1',
            borderRadius: '5px 0px 0px 5px',
            borderRight: '0.5px solid #4A4A4A',
            width: '30px',
            height: '30px'
          }}
        >
          <div>
          <i className="bi bi-arrow-down-square"></i>
          </div>
          <span className="tooltip-text">上から下にスクロールするアニメ</span>
        </div>

        <div
          className= "panel-tool-button-small tooltip-container"
          onClick={() => updateSpaceAnimeDirection('bottomTop')}
          onTouchStart={() => updateSpaceAnimeDirection('bottomTop')}
          style={{
            backgroundColor: spaceAnimeDirection === 'bottomTop' ? '#9199AE' : '#c2c1c1',
            borderRight: '0.5px solid #4A4A4A',
            borderLeft: '0.5px solid #4A4A4A',
            width: '30px',
            height: '30px'
          }}
        >
          <div>
          <i className="bi bi-arrow-up-square"></i>
          </div>
          <span className="tooltip-text">下から上にスクロールするアニメ</span>
        </div>

        <div
          className= "panel-tool-button-small tooltip-container"
          onClick={() => updateSpaceAnimeDirection('leftRight')}
          onTouchStart={() => updateSpaceAnimeDirection('leftRight')}
          style={{
            backgroundColor: spaceAnimeDirection === 'leftRight' ? '#9199AE' : '#c2c1c1',
            borderRight: '0.5px solid #4A4A4A',
            borderLeft: '0.5px solid #4A4A4A',
            width: '30px',
            height: '30px'
          }}
        >
          <div>
          <i className="bi bi-arrow-right-square"></i>
          </div>
          <span className="tooltip-text">左から右にスクロールするアニメ</span>
        </div>

        <div
          className= "panel-tool-button-small tooltip-container"
          onClick={() => updateSpaceAnimeDirection('rightLeft')}
          onTouchStart={() => updateSpaceAnimeDirection('rightLeft')}
          style={{
            backgroundColor: spaceAnimeDirection === 'rightLeft' ? '#9199AE' : '#c2c1c1',
            borderRight: '0.5px solid #4A4A4A',
            borderLeft: '0.5px solid #4A4A4A',
            width: '30px',
            height: '30px'
          }}
        >
          <div>
          <i className="bi bi-arrow-left-square"></i>
          </div>
          <span className="tooltip-text">右から左にスクロールするアニメ</span>
        </div>
        <div
          className= "panel-tool-button-small tooltip-container"
          onClick={() => updateSpaceAnimeDirection('change')}
          onTouchStart={() => updateSpaceAnimeDirection('change')}
          style={{
            backgroundColor: spaceAnimeDirection === 'change' ? '#9199AE' : '#c2c1c1',
            borderRadius: '0px 5px 5px 0px',
            borderLeft: '0.5px solid #4A4A4A',
            width: '30px',
            height: '30px'
          }}
        >
          <div>
          <i className="bi bi-back"></i>
          </div>
          <span className="tooltip-text">切り替えアニメ</span>
        </div>
      </div>

      <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px', marginTop: '5px' }}>
        {spaceAnimeDirection === 'change' ? (
          <>
            {/* 背景アニメを切り替える時間 */}  
            <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>時間</span></div>
              <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                <input
                  className="no-drag form-select-value"
                  type="number"
                  min="1"
                  max="600000"
                  step="1"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputIntervalTime}
                  onChange={(e) => handleIntervalTimeChange(e)}
                  onBlur={handleIntervalTimeForm}
                />
                <span className="tooltip-text" style={{ textAlign: 'left' }}>スペースを切り替える時間<br />最大値 10分(600000)</span>
              </div>
            </div>
            </>
          ):(
          <>
            {/* 背景アニメ */}  
            <div className="flex-column-start" style={{ alignItems: 'flex-start', marginTop:'-6px' }}>
              <div><span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>速さ</span></div>
              <div style={{ alignItems: 'flex-end', display: 'flex' }} className="tooltip-container">
                <input
                  className="no-drag form-select-value"
                  type="number"
                  min="0.1"
                  max="100"
                  step="0.1"
                  style={{ width: '60px', fontSize: '14px' }}
                  value={inputSpaceAnimeSpeed}
                  onChange={(e) => handleSpaceAnimeChange(e)}
                  onBlur={handleSpaceAnimeForm}
                />
                <span className="tooltip-text" style={{ textAlign: 'left' }}>スクロールの速さ<br />最大値 100</span>
              </div>
            </div>
          </>
        )}
        <div className="tooltip-container">
          <PixiPanelParts PanelParts="directionRunButton" handleRunButton={updateSpaceAnime} formTitle="更新" />
          <span className="tooltip-text">アニメを更新する</span>
        </div>
      </div>


      <div><span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>[スペースの選択]</span></div>
      <div className="flex-between" style={{ alignItems: 'flex-end', width: '200px' }}>
        {/* 複数選択ボタン */}
        <div
          className="select-confirm-btn tooltip-container"
          onClick={() => setSpaceAnimMode(true)}
          onTouchStart={() => setSpaceAnimMode(true)}
          style={{ 
            width: 'auto',
            height: 'auto',
            padding: '2px 12px',
            marginTop: '5px',
            backgroundColor: spaceAnimMode ? '#9199AE' : '#c2c1c1',
          }}
        >
            複数選択
            <span className="tooltip-text" style={{ textAlign: 'left', marginTop: '5px' }}>アニメーションで使用するスペースを選択</span>
        </div>

        {/* 複数選択ボタン */}
        <div
          className="select-confirm-btn tooltip-container"
          onClick={updateSimpleSpace}
          onTouchStart={updateSimpleSpace}
          style={{ 
            width: 'auto',
            height: 'auto',
            padding: '2px 12px',
            marginTop: '5px',
            backgroundColor: !spaceAnimMode ? '#9199AE' : '#c2c1c1',
          }}
        >
            単一選択
            <span className="tooltip-text" style={{ textAlign: 'left' }}>アニメーションを停止しメインスペースのみを表示</span>
        </div>
      </div>

      <div className="flex-between" style={{ alignItems: 'flex-end', width: '180px', marginTop: '5px' }}>
        <div><span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>[選択中のスペース]</span></div>
        <div><span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>あと{maxSpaceSprites}枚</span></div>
      </div>

      <div style={{ marginTop: '5px' }}>
        <div className="pixi-space-tag-block">
          {spaceSpritesAnime && spaceSpritesAnime.map((sprite, index) => (
            <div key={index} onClick={() => {
              handleRemoveSpaceData(index);
            }}>
              <div className="space-sprites-anime-tag">
                <div className="angleDegrees_value space-sprites-anime-tag-name">
                  <div className="flex-start-center" style={{ marginLeft: '3px', paddingRight: '2px' }}>
                    <i className="bi bi-tag-fill"  style={{ fontSize: '12px', color: '#ececec', marginRight: '2px' }}></i>
                    <span className="text-Rounded" style={{ fontSize: '10px', color: '#ececec' }}>
                      {sprite.space_name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export { PixiSpaceCustom };