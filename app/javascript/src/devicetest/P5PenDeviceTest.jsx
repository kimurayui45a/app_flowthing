import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

function P5PenDeviceTest() {
  const sketchRef = useRef(); // Canvasを描画するdivへの参照を作成

  useEffect(() => {
    let sketch = new p5((p) => {
      let isDrawing = false;
      let prev = { x: 0, y: 0 }; // マウスの前回の位置を初期化

      p.setup = () => {
        const canvas = p.createCanvas(400, 400).parent(sketchRef.current);
        p.background(220);
        p.noStroke();

        // タッチ操作の場合、デフォルトのスクロールやズームを無効化
        canvas.touchStarted((event) => {
          if (event.cancelable) {
            event.preventDefault();
          }
        });
      };

      // タッチ操作とマウス操作のイベントハンドラ
      p.mousePressed = () => {
        isDrawing = true;
        prev.x = p.mouseX;
        prev.y = p.mouseY;
      };

      p.mouseMoved = () => {
        if (isDrawing) {
          p.stroke(0);
          p.strokeWeight(20);
          p.line(prev.x, prev.y, p.mouseX, p.mouseY);
          prev.x = p.mouseX;
          prev.y = p.mouseY;
        }
      };

      p.mouseReleased = () => {
        isDrawing = false;
      };

      p.touchStarted = () => {
        isDrawing = true;
        prev.x = p.touchX;
        prev.y = p.touchY;
        return false; // ブラウザのデフォルト動作を防ぐ
      };

      p.touchMoved = () => {
        if (isDrawing) {
          p.stroke(255, 0, 0);
          p.strokeWeight(20);
          p.line(prev.x, prev.y, p.touchX, p.touchY);
          prev.x = p.touchX;
          prev.y = p.touchY;
        }
        return false; // ブラウザのデフォルト動作を防ぐ
      };

      p.touchEnded = () => {
        isDrawing = false;
        return false; // ブラウザのデフォルト動作を防ぐ
      };

      // p.drawは現在の要件には不要なので削除しました
    });

    // コンポーネントのクリーンアップ時にp5スケッチを削除
    return () => {
      sketch.remove();
    };
  }, []);

  return <div ref={sketchRef} />;
}

export default P5PenDeviceTest;
