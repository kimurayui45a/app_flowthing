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
    setPixiItemListTab
  } = usePixiGroup();

  const { 
    activeSprite,
    spriteInfo,
    handleVerticalSwingById,
    handleVerticalSwingAnimationStop,
    handleHorizontalSwingById,
    handleHorizontalStopById
  } = usePixiComponentShare();




  return (

<>
<span>スペシャルカスタム</span>


</>
  );
};


export { PixiCustomSpecial };