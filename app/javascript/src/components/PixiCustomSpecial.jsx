import React, { useEffect, useState, useRef } from 'react';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiPanelParts } from './PixiPanelParts';
//import { Rnd } from 'react-rnd';



const PixiCustomSpecial = () => {



  const {
    inputRandomEasing,
    inputRandomCloseEnough,
    inputMoveClickSpeed,
    inputBoundaryAnimeSpeed,
    inputBoundaryAnimeXValue,
    inputBoundaryAnimeYValue,
    inputBoundaryAnimeWidth,
    inputBoundaryAnimeHeight,
    inputCircularAnimeSpeed,
    inputCircularAnimeXValue,
    inputCircularAnimeYValue,
    inputCircularAnimeRadius
  } = usePixiGroup();

  const { 
    handleRandomMove,
    handleMoveClickBtn,
    handleMoveClickDeleteAll,
    handleMoveClickDelete,
    handleBoundaryAnimation,
    handleCircularMove
  } = usePixiComponentShare();



    // コンテナ内で特定の位置にスクロールする関数
    const scrollSpecial = (containerId, position) => {
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
          onClick={() => scrollSpecial('specialAnimeContainer', 0)}
          onTouchStart={() => scrollSpecial('specialAnimeContainer', 0)}
          style={{
            borderBottom: '0.5px solid #4A4A4A',
            borderRadius: '0px 7px 0px 0px'
          }}
        >
          乱
        </div>

        <div
          className="flex pressure-panel-btn"
          onClick={() => scrollSpecial('specialAnimeContainer', 120)}
          onTouchStart={() => scrollSpecial('specialAnimeContainer', 120)}
          style={{
            borderBottom: '0.5px solid #4A4A4A',
            borderTop: '0.5px solid #4A4A4A'
          }}
        >
          追従
        </div>

        <div
          className="flex pressure-panel-btn"
          onClick={() => scrollSpecial('specialAnimeContainer', 255)}
          onTouchStart={() => scrollSpecial('specialAnimeContainer', 255)}
          style={{
            borderBottom: '0.5px solid #4A4A4A',
            borderTop: '0.5px solid #4A4A4A',
            fontSize: '8px'
          }}
        >
        四角形
        </div>

        <div
          className="flex pressure-panel-btn"
          onClick={() => scrollSpecial('specialAnimeContainer', 380)}
          onTouchStart={() => scrollSpecial('specialAnimeContainer', 380)}
          style={{
            borderTop: '0.5px solid #4A4A4A',
            borderRadius: '0px 0px 7px 0px'
          }}
        >
        円形
        </div>
      </div>

      <div id="specialAnimeContainer" style={{ overflowY: 'auto', height: '300px', display: 'flex', flexDirection: 'column', marginTop: '10px', width: '232px', alignItems: 'center' }}>
        <div className="selection-range-bottomline" style={{ marginTop: '15px', height: 'auto' }}>
          <span className="selection-range-optiontitle" style={{ color: '#ececec' }}>
            ランダムアニメ
          </span>
          <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px', marginTop: '5px' }}>
            <PixiPanelParts PanelParts="randomAnimeForm" type="closeEnough" formTitle="距離" inputValue={inputRandomCloseEnough} explanation="目的地到達までの精度" />
            <PixiPanelParts PanelParts="randomAnimeForm" type="easing" formTitle="速さ" inputValue={inputRandomEasing} explanation="移動速度" />
          </div>

          <div style={{ marginTop: '10px', marginBottom: '5px' }}>
            <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleRandomMove} formTitle="実行/停止" />
          </div>
        </div>

        <div className="selection-range-bottomline" style={{ marginTop: '30px', height: 'auto' }}>
          <span className="selection-range-optiontitle" style={{ color: '#ececec' }}>
            追従アニメ
          </span>

          <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px', marginTop: '5px' }}>
            <PixiPanelParts PanelParts="randomAnimeForm" type="moveClick" formTitle="速さ" inputValue={inputMoveClickSpeed} explanation="追従速度" />

            <div className="tooltip-container">
              <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleMoveClickBtn} formTitle="登録" />
              <span className="tooltip-text" style={{ textAlign: 'left' }}>選択中のFlow Thingにクリック地点を追従するアニメを付与</span>
            </div>
          </div>

          <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px', marginTop: '5px', marginBottom: '5px' }}>
            <div className="tooltip-container">
              <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleMoveClickDelete} formTitle="削除" />
              <span className="tooltip-text" style={{ textAlign: 'left' }}>選択中のFlow Thingの追従アニメを削除</span>
            </div>


            <div className="tooltip-container">
              <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleMoveClickDeleteAll} formTitle="全削除" />
              <span className="tooltip-text" style={{ textAlign: 'left' }}>全てのFlow Thingの追従アニメを削除</span>
            </div>
          </div>
        </div>

        <div className="selection-range-bottomline" style={{ marginTop: '30px', height: 'auto', marginBottom: '10px' }}>
          <span className="selection-range-optiontitle" style={{ color: '#ececec' }}>
            移動範囲アニメ[四角形]
          </span>
          <div className="flex-items-end" style={{ width: '150px', marginTop: '5px' }}>
            <PixiPanelParts PanelParts="randomAnimeForm" type="boundarySpeed" formTitle="速さ" inputValue={inputBoundaryAnimeSpeed} explanation="移動速度" />
            <div className="flex-between" style={{ alignItems: 'flex-end', marginTop: '5px', width: '150px' }}>
              <PixiPanelParts PanelParts="boundaryAnimeForm" type="xValue" formTitle="X座標" inputValue={inputBoundaryAnimeXValue} explanation="アニメ開始位置" />
              <PixiPanelParts PanelParts="boundaryAnimeForm" type="yValue" formTitle="Y座標" inputValue={inputBoundaryAnimeYValue} explanation="アニメ開始位置" />
            </div>
            <div className="flex-between" style={{ alignItems: 'flex-end', marginTop: '5px', width: '150px' }}>
              <PixiPanelParts PanelParts="boundaryAnimeForm" type="width" formTitle="幅" inputValue={inputBoundaryAnimeWidth} explanation="移動範囲" />
              <PixiPanelParts PanelParts="boundaryAnimeForm" type="height" formTitle="高さ" inputValue={inputBoundaryAnimeHeight} explanation="移動範囲" />
            </div>
          </div>
          <div style={{ marginTop: '10px', marginBottom: '5px' }}>
            <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleBoundaryAnimation} formTitle="実行/停止" />
          </div>
        </div>


        <div className="selection-range-bottomline" style={{ marginTop: '15px', height: 'auto', marginBottom: '10px' }}>
          <span className="selection-range-optiontitle" style={{ color: '#ececec' }}>
            移動範囲アニメ[円形]
          </span>
          <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px', marginTop: '5px' }}>
            <PixiPanelParts PanelParts="circularAnimeForm" type="radius" formTitle="半径" inputValue={inputCircularAnimeRadius} explanation="円形範囲の半径" />
            <PixiPanelParts PanelParts="randomAnimeForm" type="circularSpeed" formTitle="速さ" inputValue={inputCircularAnimeSpeed} explanation="移動速度" />
          </div>

          <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px', marginTop: '5px' }}>
            <PixiPanelParts PanelParts="circularAnimeForm" type="xValue" formTitle="X座標" inputValue={inputCircularAnimeXValue} explanation="アニメ開始位置" />
            <PixiPanelParts PanelParts="circularAnimeForm" type="yValue" formTitle="Y座標" inputValue={inputCircularAnimeYValue} explanation="アニメ開始位置" />
          </div>

          <div style={{ marginTop: '10px', marginBottom: '5px' }}>
            <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleCircularMove} formTitle="実行/停止" />
          </div>
        </div>
      </div>
    </>
  );
};


export { PixiCustomSpecial };