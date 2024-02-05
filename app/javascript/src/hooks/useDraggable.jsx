//app/javascript/src/hooks/useDraggable.jsx
import { useState, useCallback } from 'react';

function useDraggable(initialX = 0, initialY = 0) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = useCallback((event) => {
    setDragging(true);
    event.preventDefault(); // テキスト選択の無効化
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (dragging) {
      setPosition((prevPosition) => {
        // 新しい位置を計算
        let newX = prevPosition.x + event.movementX;
        let newY = prevPosition.y + event.movementY;

        // 範囲を800x600に制限
        newX = Math.min(Math.max(newX, 0), 800 - 100); // オブジェクトの幅を考慮
        newY = Math.min(Math.max(newY, 0), 600 - 100); // オブジェクトの高さを考慮

        return {
          x: newX,
          y: newY,
        };
      });
    }
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  return { position, handleMouseDown, handleMouseMove, handleMouseUp };
}

export { useDraggable };
