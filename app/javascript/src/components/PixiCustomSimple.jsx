import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiPanelParts } from './PixiPanelParts';



const PixiCustomSimple = () => {



  const {
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
    rotationTypeTab,
    inputRotationSpeed,
    inputPendulumPeriod,
    inputPendulumMaxRotation,
    inputScaleAnimationPeriod,
    inputScaleAnimationMaxScale,
    inputScaleAnimationMinScale
  } = usePixiGroup();

  const { 
    activeSprite,
    spriteInfo,
    handleVerticalSwingById,
    handleHorizontalSwingById,
    handleHorizontalStopById,
    handleRotationAnimation,
    handleSwingPendulumBtn,
    handleScaleAnimationById
  } = usePixiComponentShare();


  

  return (

<>


<div className="flex">
<PixiPanelParts PanelParts="directionForm" direction="leftRight" type="amplitude" minValue={1} maxValue={1050} formTitle="左右:距離" inputValue={inputLeftRightAmplitude} />
<PixiPanelParts PanelParts="directionForm" direction="leftRight" type="period" minValue={100} maxValue={10000} formTitle="左右:速さ" inputValue={inputLeftRightPeriod} />
</div>
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleVerticalSwingById} formTitle="上下実行/停止" />

<div className="flex">
<PixiPanelParts PanelParts="directionForm" direction="topBottom" type="amplitude" minValue={1} maxValue={800} formTitle="上下:距離" inputValue={inputTopBottomAmplitude} />
<PixiPanelParts PanelParts="directionForm" direction="topBottom" type="period" minValue={100} maxValue={10000} formTitle="上下:速さ" inputValue={inputTopBottomPeriod} />
</div>

<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleHorizontalSwingById} formTitle="左右実行/停止" />





<PixiPanelParts PanelParts="selectRotateAnimeBtn" />

  {rotationTypeTab ? (
    <>
    <PixiPanelParts PanelParts="rotationAnimeForm" type="rotation" minValue={1} maxValue={20} formTitle="回転:速さ" inputValue={inputRotationSpeed} />
    <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleRotationAnimation} formTitle="回転実行/停止" />
    </>
  ) : (
    <>
    <div className="flex">
      <PixiPanelParts PanelParts="rotationAnimeForm" type="pendulum" minValue={100} maxValue={10000} formTitle="振り子:速さ" inputValue={inputPendulumPeriod} />
      <PixiPanelParts PanelParts="rotationAnimeForm" type="maxRotation" minValue={1} maxValue={360} formTitle="振り子:最大回転角度" inputValue={inputPendulumMaxRotation} />
      <PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleSwingPendulumBtn} formTitle="振り子実行/停止" />
    </div>
    
    </>
  )}
<PixiPanelParts PanelParts="selectClockwiseType" />


<PixiPanelParts PanelParts="scaleAnimeForm" type="period" minValue={100} maxValue={10000} formTitle="スケ:速さ" inputValue={inputScaleAnimationPeriod} />
<PixiPanelParts PanelParts="scaleAnimeForm" type="maxScale" minValue={1} maxValue={10} formTitle="スケ:最大" inputValue={inputScaleAnimationMaxScale} />
<PixiPanelParts PanelParts="scaleAnimeForm" type="minScale" minValue={0.1} maxValue={0.9} formTitle="スケ:最小" inputValue={inputScaleAnimationMinScale} />
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={handleScaleAnimationById} formTitle="スケール実行/停止" />
</>
  );
};


export { PixiCustomSimple };