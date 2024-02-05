//app/javascript/src/components/DraggableSquare.jsx
import React, { useEffect } from 'react';
import { useDraggable } from '../hooks/useDraggable'; // カスタムフックをインポート

function DraggableSquare({ color, initialX, initialY }) {
  const { position, handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable(initialX, initialY);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: color,
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'grab',
      }}
    />
  );
}


export { DraggableSquare };