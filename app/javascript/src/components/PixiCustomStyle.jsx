import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiPanelParts } from './PixiPanelParts';



const PixiCustomStyle = () => {



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
    inputScaleSprite,
    inputAlphaSprite,
    inputAngleSprite
  } = usePixiGroup();

  const { 
    activeSprite,
    spriteInfo,
    handleVerticalSwingById,
    handleVerticalSwingAnimationStop,
    handleHorizontalSwingById,
    handleHorizontalStopById,
    changeNewScale,
    changeNewAlpha,
    changeNewAngle
  } = usePixiComponentShare();




  return (

<>
<span>スタイルカスタム</span>

<PixiPanelParts PanelParts="spriteForm" type="scale" minValue={0.01} maxValue={20} formTitle="スケール" inputValue={inputScaleSprite} />
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={changeNewScale} formTitle="スケール変更" />

<PixiPanelParts PanelParts="spriteForm" type="alpha" minValue={0.1} maxValue={1} formTitle="透明度" inputValue={inputAlphaSprite} />
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={changeNewAlpha} formTitle="透明度変更" />

<PixiPanelParts PanelParts="spriteForm" type="angle" minValue={0} maxValue={360} formTitle="角度" inputValue={inputAngleSprite} />
<PixiPanelParts PanelParts="directionRunButton" handleRunButton={changeNewAngle} formTitle="角度変更" />

</>
  );
};


export { PixiCustomStyle };