import React, { useEffect, useState } from 'react';
import { useP5ToolModeContext } from './P5ModeContext';
import { useP5CanvasCoreShare } from './P5CanvasCoreShareContext';

const P5Cursor = () => {

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [cursorIsVisible, setCursorIsVisible] = useState(false);

  const { penGroup, toolMode } = useP5ToolModeContext();

  const { scaleFactor, toolSize } = useP5CanvasCoreShare();


  //カーソルサイズ
  const cursorSize = toolSize * scaleFactor;


  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  useEffect(() => {
    // タッチ開始時
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      setPosition({ x: touch.clientX, y: touch.clientY });
      setCursorIsVisible(true); // カーソルを表示
    };

    // タッチ移動時
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      setPosition({ x: touch.clientX, y: touch.clientY });
    };

    // タッチ終了時
    const handleTouchEnd = () => {
      setCursorIsVisible(false); // カーソルを非表示
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div>

{/* <div
  className="tool pen-tool"
  style={{
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${cursorSize}px`,
    height: `${cursorSize}px`,
    borderRadius: '50%',
    cursor: 'none'
    // 必要に応じて追加
  }}
/> */}
      {penGroup.has(toolMode) && (
        <div
          className="tool pen-tool"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
            borderRadius: '50%',
            cursor: 'none'
            // 必要に応じて追加
          }}
        />
      )}



{toolMode === 'dropperTool' && (
  <div
    className="tool dropper-tool"
    style={{
      left: `${position.x}px`,
      top: `${position.y}px`,
      cursor: 'none'
      // width: `16px`,
      // height: `16px`,
      // position: 'absolute',
      // 必要に応じて調整
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"/>
    </svg>
  </div>
)}


{ (!penGroup.has(toolMode) && toolMode !== 'dropperTool') && (

<div
  className="tool other-tool"
  style={{
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: 'none'
    // width: `16px`,
    // height: `16px`,
    // position: 'absolute',
    // 必要に応じて調整
  }}
>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>

</div>

)}

  {/* コンテンツ */}


      {/* {toolMode === 'betaPen' && (
  <div
    className="tool pen-tool"
    style={{
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${cursorSize}px`,
      height: `${cursorSize}px`,
      borderRadius: '50%',
      // 必要に応じて追加
    }}
  />
)} */}
    </div>
  );
};


export { P5Cursor };