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

      <div style={{ marginTop: '15px' }}><span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>[スケールを設定]</span></div>
      <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px' }}>
          <PixiPanelParts PanelParts="spriteForm" type="scale" minValue={0.01} maxValue={20} formTitle="スケール" inputValue={inputScaleSprite} />
        <div className="tooltip-container">
          <PixiPanelParts PanelParts="directionRunButton" handleRunButton={changeNewScale} formTitle="変更" />
          <span className="tooltip-text" style={{ textAlign: 'left' }}>選択中のアイテム及び<br />以降の追加アイテムのスケールを選択値に変更</span>
        </div>
      </div>



      <div style={{ marginTop: '10px' }}><span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>[透明度を設定]</span></div>
      <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px' }}>
        <PixiPanelParts PanelParts="spriteForm" type="alpha" minValue={0.1} maxValue={1} formTitle="透明度" inputValue={inputAlphaSprite} />
        <div className="tooltip-container">
        <PixiPanelParts PanelParts="directionRunButton" handleRunButton={changeNewAlpha} formTitle="変更" />
          <span className="tooltip-text" style={{ textAlign: 'left' }}>選択中のアイテム及び<br />以降の追加アイテムの透明度を選択値に変更</span>
        </div>
      </div>



      <div style={{ marginTop: '10px' }}><span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>[角度を設定]</span></div>
      <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px' }}>
        <PixiPanelParts PanelParts="spriteForm" type="angle" minValue={0} maxValue={360} formTitle="角度" inputValue={inputAngleSprite} />
        <div className="tooltip-container">
        <PixiPanelParts PanelParts="directionRunButton" handleRunButton={changeNewAngle} formTitle="変更" />
          <span className="tooltip-text" style={{ textAlign: 'left' }}>選択中のアイテム及び<br />以降の追加アイテムの角度を選択値に変更</span>
        </div>
      </div>

    </>
  );
};


export { PixiCustomStyle };