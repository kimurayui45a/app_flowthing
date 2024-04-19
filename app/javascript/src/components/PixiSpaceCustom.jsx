import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';



const PixiSpaceCustom = () => {


  const {
    listPanelPosition,
    setListPanelPosition,
    handlePixiPanelDragStop
  } = usePixiGroup();


  const {
    handleAddSprite
  } = usePixiComponentShare();



  return (

<>
<span>スペースカスタム</span>
</>
  );
};


export { PixiSpaceCustom };