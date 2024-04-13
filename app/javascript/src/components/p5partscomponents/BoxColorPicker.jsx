import React, { useEffect, useState, useRef } from 'react';
import { useP5Color } from '../P5ColorContext';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import iro from '@jaames/iro';



const BoxColorPicker = () => {

  const { currentColor, setCurrentColor } = useP5Color();

  const { colorPaletteDrag, colorPaletteDragEnd } = useP5PanelGroupContext();

  const boxPickerRef = useRef(null);


  useEffect(() => {
    if (!boxPickerRef.current) {
      // 四角形カラーピッカーの初期化
      boxPickerRef.current = new iro.ColorPicker("#box-picker-container", {
        width: 140,
        color: currentColor,
        layout: [
          {
            component: iro.ui.Box, // 四角形カラーピッカー
            options: {}
          },
          {
            component: iro.ui.Slider, // 色相調整バー
            options: {
              sliderType: 'hue' // 色相（Hue）を調整するためのスライダー
            }
          }
        ]
      });


      const handleColorChange = function(color) {
        setCurrentColor(color.rgbaString);
      };
  
      boxPickerRef.current.on(["color:init", "color:change"], handleColorChange);
  
      // クリーンアップ関数
      return () => {
        // イベントリスナーの削除
        if (boxPickerRef.current) {
          boxPickerRef.current.off(["color:init", "color:change"], handleColorChange);
        }
      };
    }
  }, []);
  
  // currentColorが変更されたときに実行するuseEffect
  useEffect(() => {
    if (boxPickerRef.current) {
      boxPickerRef.current.color.set(currentColor);
    }
  }, [currentColor]);
  


  return (
    <div>
      <div
        onMouseDown={colorPaletteDrag}
        onTouchStart={colorPaletteDrag}
        onMouseUp={colorPaletteDragEnd}
        onTouchEnd={colorPaletteDragEnd}
        id="box-picker-container"
      ></div>
    </div>
  );
};


export { BoxColorPicker };