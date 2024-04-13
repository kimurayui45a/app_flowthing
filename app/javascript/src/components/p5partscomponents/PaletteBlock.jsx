import React, { useEffect, useState, useRef } from 'react';
import { useP5PanelGroupContext } from '../P5PanelGroupContext';
import { WheelColorPicker } from './WheelColorPicker';
import { BoxColorPicker } from './BoxColorPicker';


const PaletteBlock = () => {

  const { boxPickerChange, handleBoxPickerChange } = useP5PanelGroupContext();

  
  return (
    <div>
      <button onClick={handleBoxPickerChange} style={{ backgroundColor: boxPickerChange ? '#9199AE' : '#c2c1c1' }}>
      </button>
      {boxPickerChange ? (
        <BoxColorPicker />
      ) : (
        <WheelColorPicker />
      )}
      
    </div>
  );
};


export { PaletteBlock };