import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
//import { Application, Assets, Sprite, SCALE_MODES, Texture, Graphics } from 'pixi.js';

const P5UserCanvas = ({ canvasImgId, canvasData, canvasSize }) => {
  const sketchRef = useRef();
  const p5CanvasInstanceRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(canvasSize.width, canvasSize.height);
        // p.background(255); // 背景は設定しない
        // canvasData（Base64エンコードされた画像データ）をロードしてキャンバスに描画
        // const layersData = JSON.parse(canvasData);
        p.loadImage(canvasData, img => {
          p.image(img, 0, 0, p.width, p.height);
        }, err => {
          console.error('Failed to load image:', err);
        });
        
      };
    };

    // p5canvasインスタンスに保存
    p5CanvasInstanceRef.current = new p5(sketch, sketchRef.current);

    return () => {
      if (p5CanvasInstanceRef.current) {
        p5CanvasInstanceRef.current.remove();
      }
    };
  }, [canvasData, canvasSize]); // canvasDataが変更された場合に再描画


  // const pixiContainer = useRef(null);

  // useEffect(() => {
  //   const init = async () => {
  //     const app = new Application({
  //       background: 0x1099bb,
  //       width: 800,
  //       height: 600
  //       // resizeTo: window
  //     });
  //     pixiContainer.current.appendChild(app.view);

  //     const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  //     texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;



  //     const textureimage = Texture.from(canvasData);
  //     const spriteImage = new Sprite(textureimage);
  //     spriteImage.x = app.screen.width / 2;
  //     spriteImage.y = app.screen.height / 2;
  //     spriteImage.anchor.set(0.5);
      
  //     const mask = new Graphics();
  //     mask.beginFill(0xFFFFFF);
  //     mask.drawCircle(spriteImage.x, spriteImage.y, 100); // 位置を調整し、半径100の円を描画
  //     mask.endFill();


  //     // マスクをスプライトに適用
  //     spriteImage.mask = mask;

  //     // ステージにマスクとスプライトを追加
  //     app.stage.addChild(mask);
  //     app.stage.addChild(spriteImage);
  //     spriteImage.scale.set(0.4);


  //     // app.stage.addChild(spriteImage);
  //     // spriteImage.scale.set(0.2);


  //     for (let i = 0; i < 10; i++) {
  //       createBunny(app, texture, Math.floor(Math.random() * app.screen.width), Math.floor(Math.random() * app.screen.height));
  //     }

  //     app.stage.interactive = true;
  //     app.stage.hitArea = app.screen;
  //     app.stage.on('pointerup', onDragEnd);
  //     app.stage.on('pointerupoutside', onDragEnd);
  //   };

  //   const createBunny = (app, texture, x, y) => {
  //     const bunny = new Sprite(texture);
  //     bunny.anchor.set(0.5);
  //     bunny.x = x;
  //     bunny.y = y;
  //     bunny.interactive = true;
  //     bunny.buttonMode = true;
  //     bunny.cursor = 'pointer';
  //     bunny.scale.set(3);
  //     bunny.on('pointerdown', (event) => onDragStart(event, bunny, app));
  //     app.stage.addChild(bunny);
  //   };

  //   let dragTarget = null;

  //   const onDragStart = (event, bunny, app) => {
  //     bunny.alpha = 0.5;
  //     dragTarget = bunny;
  //     dragTarget.data = event.data;
  //     app.stage.on('pointermove', (e) => onDragMove(e, dragTarget));
  //   };

  //   const onDragMove = (event, bunny) => {
  //     if (bunny) {
  //       const newPosition = bunny.data.getLocalPosition(bunny.parent);
  //       bunny.x = newPosition.x;
  //       bunny.y = newPosition.y;
  //     }
  //   };

  //   const onDragEnd = () => {
  //     if (dragTarget) {
  //       dragTarget.alpha = 1;
  //       dragTarget.data = null;
  //       dragTarget = null;
  //     }
  //     // Notice that we might need to also remove the pointermove listener here if needed
  //   };

  //   init();

  //   return () => {
  //     if (pixiContainer.current && pixiContainer.current.children.length > 0) {
  //       pixiContainer.current.removeChild(pixiContainer.current.children[0]);
  //     }
  //   };
  // }, [canvasData]);






  return (
    <>
    <div ref={sketchRef} id={`userCanvas_${canvasImgId}`}></div>
    {/* <div ref={pixiContainer} style={{ width: '100%', height: '100%' }} />; */}
    </>
  );
};

export default P5UserCanvas;