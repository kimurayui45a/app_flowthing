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
      {/* {penGroup.has(toolMode) && (
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
      )} */}
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