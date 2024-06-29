import React, { useEffect, useState, useRef } from 'react';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiPanelParts } from './PixiPanelParts';
//import { Rnd } from 'react-rnd';



const PixiCustomSimple = () => {



  const {
    inputLeftRightAmplitude,
    inputLeftRightPeriod,
    inputTopBottomAmplitude,
    inputTopBottomPeriod,
    rotationTypeTab,
    inputRotationSpeed,
    inputPendulumPeriod,
    inputPendulumMaxRotation,
    inputScaleAnimationPeriod,
    inputScaleAnimationMaxScale,
    inputScaleAnimationMinScale
  } = usePixiGroup();

  const { 
    handleVerticalSwingById,
    handleHorizontalSwingById,
    handleRotationAnimation,
    handleSwingPendulumBtn,
    handleScaleAnimationById
  } = usePixiComponentShare();


    // コンテナ内で特定の位置にスクロールする関数
    const scrollSimple = (containerId, position) => {
      const container = document.getElementById(containerId);
  
      if(container) {
        container.scrollTo({
          top: position,
          behavior: 'smooth'
        });
      }
    };


  return (
    <>
      <div
        className="flex-column text-Rounded"
        style={{
          width: '30px',
          height: '100px',
          backgroundColor: '#c2c1c1',
          position: 'absolute',
          top: '78px',
          left: '0px',
          zIndex: '80',
          boxShadow: '1px 1px black',
          fontSize: '10px',
          borderRadius: '0px 7px 7px 0px',
        }}
      >
        <div
          className="flex pressure-panel-btn"
          onClick={() => scrollSimple('simpleAnimeContainer', 0)}
          onTouchStart={() => scrollSimple('simpleAnimeContainer', 0)}
          style={{
            borderBottom: '0.5px solid #4A4A4A',
            borderRadius: '0px 7px 0px 0px'
          }}
        >
          上下
        </div>

        <div
          className="flex pressure-panel-btn"
          onClick={() => scrollSimple('simpleAnimeContainer', 120)}
          onTouchStart={() => scrollSimple('simpleAnimeContainer', 120)}
          style={{
            borderBottom: '0.5px solid #4A4A4A',
            borderTop: '0.5px solid #4A4A4A'
          }}
        >
          左右
        </div>

        <div
          className="flex pressure-panel-btn"
          onClick={() => scrollSimple('simpleAnimeContainer', 255)}
          onTouchStart={() => scrollSimple('simpleAnimeContainer', 255)}
          style={{
            borderBottom: '0.5px solid #4A4A4A',
            borderTop: '0.5px solid #4A4A4A',
            fontSize: rotationTypeTab ? '10px' : '8px'
          }}
        >
        {rotationTypeTab ? '回転' : '振り子'}
        </div>

        <div
          className="flex pressure-panel-btn"
          onClick={() => scrollSimple('simpleAnimeContainer', 300)}
          onTouchStart={() => scrollSimple('simpleAnimeContainer', 300)}
          style={{
            borderTop: '0.5px solid #4A4A4A',
            borderRadius: '0px 0px 7px 0px'
          }}
        >
        縮尺
        </div>
      </div>


      <div id="simpleAnimeContainer" style={{ overflowY: 'auto', height: '300px', display: 'flex', flexDirection: 'column', marginTop: '10px', width: '232px', alignItems: 'center' }}>

        <div className="selection-range-bottomline" style={{ marginTop: '15px', height: 'auto' }}>
          <span className="selection-range-optiontitle" style={{ color: '#ececec' }}>
            上下アニメ
          </span>
          <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px', marginTop: '5px' }}>
            <PixiPanelParts PanelParts="directionForm" direction="topBottom" type="amplitude" minValue={1} maxValue={800} formTitle="移動範囲" inputValue={inputTopBottomAmplitude} explanation="移動範囲" />
            <PixiPanelParts PanelParts="directionForm" direction="topBottom" type="period" minValue={100} maxValue={10000} formTitle="進行具合" inputValue={inputTopBottomPeriod} explanation="進行具合" />
          </div>

          <div style={{ marginTop: '10px', marginBottom: '5px' }}>
            <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleVerticalSwingById} formTitle="実行/停止" />
          </div>
        </div>

        <div className="selection-range-bottomline" style={{ marginTop: '30px', height: 'auto' }}>
          <span className="selection-range-optiontitle" style={{ color: '#ececec' }}>
            左右アニメ
          </span>
          <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px', marginTop: '5px' }}>
            <PixiPanelParts PanelParts="directionForm" direction="leftRight" type="amplitude" minValue={1} maxValue={1050} formTitle="移動範囲" inputValue={inputLeftRightAmplitude} explanation="移動範囲" />
            <PixiPanelParts PanelParts="directionForm" direction="leftRight" type="period" minValue={100} maxValue={10000} formTitle="進行具合" inputValue={inputLeftRightPeriod} explanation="進行具合" />
          </div>

          <div style={{ marginTop: '10px', marginBottom: '5px' }}>
            <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleHorizontalSwingById} formTitle="実行/停止" />
          </div>
        </div>

        <div className="selection-range-bottomline" style={{ marginTop: '30px', height: 'auto' }}>
          <div className="flex" style={{ position: 'absolute', top: '-14px', paddingLeft: '8px', paddingRight: '8px' }}>
            <div>
              <PixiPanelParts PanelParts="selectRotateAnimeBtn" />
              </div>
              <div style={{ width: '80px', marginLeft: '2px' }}>
              <span className="selection-rotation" style={{ color: '#ececec' }}>
              {rotationTypeTab ? '回転アニメ' : '振り子アニメ'}
              </span>
            </div>
          </div>

          <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
            <PixiPanelParts PanelParts="selectClockwiseType" />
          </div>

          {rotationTypeTab ? (
            <>
            <div style={{ marginTop: '25px' }}>
            <PixiPanelParts PanelParts="rotationAnimeForm" type="rotation" minValue={1} maxValue={20} formTitle="速さ" inputValue={inputRotationSpeed} explanation="回転速度" />
            </div>

            <div style={{ marginTop: '10px', marginBottom: '5px' }}>
              <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleRotationAnimation} formTitle="実行/停止" />
            </div>

            
            </>
          ) : (
            <>
            <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px', marginTop: '25px' }}>
              <PixiPanelParts PanelParts="rotationAnimeForm" type="pendulum" minValue={100} maxValue={10000} formTitle="速さ" inputValue={inputPendulumPeriod} explanation="回転速度" />
              <PixiPanelParts PanelParts="rotationAnimeForm" type="maxRotation" minValue={1} maxValue={360} formTitle="最大回転角度" inputValue={inputPendulumMaxRotation} explanation="回転角度" />
            </div>
            
            <div style={{ marginTop: '10px', marginBottom: '5px' }}>
                <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleSwingPendulumBtn} formTitle="実行/停止" />
              </div>
            </>
          )}
        </div>


        <div className="selection-range-bottomline" style={{ marginTop: '30px', height: 'auto', marginBottom: '10px' }}>
          <span className="selection-range-optiontitle" style={{ color: '#ececec' }}>
            縮尺アニメ
          </span>

          <div className="flex-items-end" style={{ width: '150px', marginTop: '5px' }}>
            <div className="flex-between" style={{ alignItems: 'flex-end', marginTop: '5px', width: '150px' }}>
              <PixiPanelParts PanelParts="scaleAnimeForm" type="maxScale" minValue={0.1} maxValue={10} formTitle="最大" inputValue={inputScaleAnimationMaxScale} explanation="最大拡大率" />
              <PixiPanelParts PanelParts="scaleAnimeForm" type="minScale" minValue={0.1} maxValue={0.9} formTitle="最小" inputValue={inputScaleAnimationMinScale} explanation="最小縮小率" />
            </div>
            <PixiPanelParts PanelParts="scaleAnimeForm" type="period" minValue={100} maxValue={10000} formTitle="速さ" inputValue={inputScaleAnimationPeriod} explanation="縮尺変化速度" />
          </div>

          <div style={{ marginTop: '10px', marginBottom: '5px' }}>
            <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleScaleAnimationById} formTitle="実行/停止" />
          </div>
        </div>
      </div>
    </>
  );
};


export { PixiCustomSimple };