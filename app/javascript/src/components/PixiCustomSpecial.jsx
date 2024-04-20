import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiPanelParts } from './PixiPanelParts';



const PixiCustomSpecial = () => {



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
    pixiItemListTab,
    setPixiItemListTab,
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
    activeSprite,
    spriteInfo,
    handleVerticalSwingById,
    handleVerticalSwingAnimationStop,
    handleHorizontalSwingById,
    handleHorizontalStopById,
    handleRandomMove,
    handleMoveClickBtn,
    handleMoveClickDeleteAll,
    handleMoveClickDelete,
    handleBoundaryAnimation,
    handleCircularMove
  } = usePixiComponentShare();




  return (

<>
<span>スペシャルカスタム</span>

<PixiPanelParts PanelParts="randomAnimeForm" type="easing" formTitle="ランダム:速さ" inputValue={inputRandomEasing} />
<PixiPanelParts PanelParts="randomAnimeForm" type="closeEnough" formTitle="ランダム:距離" inputValue={inputRandomCloseEnough} />
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleRandomMove} formTitle="ランダム実行/停止" />

<PixiPanelParts PanelParts="randomAnimeForm" type="moveClick" formTitle="追従:速さ" inputValue={inputMoveClickSpeed} />
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleMoveClickBtn} formTitle="追従登録" />

<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleMoveClickDelete} formTitle="追従削除" />
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleMoveClickDeleteAll} formTitle="追従全削除" />


<div className="flex">
<PixiPanelParts PanelParts="randomAnimeForm" type="boundarySpeed" formTitle="範囲:速さ" inputValue={inputBoundaryAnimeSpeed} />
<PixiPanelParts PanelParts="boundaryAnimeForm" type="xValue" formTitle="範囲:X" inputValue={inputBoundaryAnimeXValue} />
<PixiPanelParts PanelParts="boundaryAnimeForm" type="yValue" formTitle="範囲:Y" inputValue={inputBoundaryAnimeYValue} />

<PixiPanelParts PanelParts="boundaryAnimeForm" type="width" formTitle="範囲:幅" inputValue={inputBoundaryAnimeWidth} />
<PixiPanelParts PanelParts="boundaryAnimeForm" type="height" formTitle="範囲:高さ" inputValue={inputBoundaryAnimeHeight} />
</div>
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleBoundaryAnimation} formTitle="範囲アニメ実行/停止" />

<div className="flex">
<PixiPanelParts PanelParts="randomAnimeForm" type="circularSpeed" formTitle="円形:速さ" inputValue={inputCircularAnimeSpeed} />
<PixiPanelParts PanelParts="circularAnimeForm" type="xValue" formTitle="円形:X" inputValue={inputCircularAnimeXValue} />
<PixiPanelParts PanelParts="circularAnimeForm" type="yValue" formTitle="円形:Y" inputValue={inputCircularAnimeYValue} />
<PixiPanelParts PanelParts="circularAnimeForm" type="radius" formTitle="円形:半径" inputValue={inputCircularAnimeRadius} />
</div>
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleCircularMove} formTitle="円形アニメ実行/停止" />
</>
  );
};


export { PixiCustomSpecial };