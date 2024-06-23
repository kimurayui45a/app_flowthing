import React, { useEffect, useState, useRef } from 'react';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiPanelParts } from './PixiPanelParts';
// import { Rnd } from 'react-rnd';



const PixiCustomStyle = () => {



  const {
    inputScaleSprite,
    inputAlphaSprite,
    inputAngleSprite
  } = usePixiGroup();

  const { 
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
          <span className="tooltip-text" style={{ textAlign: 'left' }}>選択中のFlow Thing及び<br />以降の追加Flow Thingのスケールを選択値に変更</span>
        </div>
      </div>



      <div style={{ marginTop: '10px' }}><span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>[透明度を設定]</span></div>
      <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px' }}>
        <PixiPanelParts PanelParts="spriteForm" type="alpha" minValue={0.1} maxValue={1} formTitle="透明度" inputValue={inputAlphaSprite} />
        <div className="tooltip-container">
        <PixiPanelParts PanelParts="directionRunButton" handleRunButton={changeNewAlpha} formTitle="変更" />
          <span className="tooltip-text" style={{ textAlign: 'left' }}>選択中のFlow Thing及び<br />以降の追加Flow Thingの透明度を選択値に変更</span>
        </div>
      </div>



      <div style={{ marginTop: '10px' }}><span className="text-Rounded" style={{ fontSize: '12px', color: '#ececec' }}>[角度を設定]</span></div>
      <div className="flex-between" style={{ alignItems: 'flex-end', width: '150px' }}>
        <PixiPanelParts PanelParts="spriteForm" type="angle" minValue={0} maxValue={360} formTitle="角度" inputValue={inputAngleSprite} />
        <div className="tooltip-container">
        <PixiPanelParts PanelParts="directionRunButton" handleRunButton={changeNewAngle} formTitle="変更" />
          <span className="tooltip-text" style={{ textAlign: 'left' }}>選択中のFlow Thing及び<br />以降の追加Flow Thingの角度を選択値に変更</span>
        </div>
      </div>


    </>
  );
};


export { PixiCustomStyle };