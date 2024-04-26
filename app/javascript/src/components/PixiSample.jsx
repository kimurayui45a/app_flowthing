import React, { useEffect, useState, useRef } from 'react';
import { Application, Assets, Sprite, SCALE_MODES, Texture, Graphics } from 'pixi.js';


const PixiSample = ({ canvasP5ToPixi }) => {


    //pixiを管理するref
    const pixiContainer = useRef(null);

  //外部からappにアクセスするref
  const appRef = useRef(null);
  const [sampleSprite, setSampleSprite] = useState();

  //pixiのメイン
  useEffect(() => {
    const init = async () => {
      const app = new Application({
        background: 0x1099bb,
        width: 800,
        height: 450,
      });

      pixiContainer.current.appendChild(app.view);
      appRef.current = app;
      app.stage.interactive = true;
      app.stage.hitArea = app.screen;
  }
    init();

    return () => {
      if (pixiContainer.current && pixiContainer.current.children.length > 0) {
        pixiContainer.current.removeChild(pixiContainer.current.children[0]);
      }
    };
  }, []);



  //スプライトの作成
  const createSpriteTest = (app, texture) => {

    let spriteImage;

    spriteImage = Texture.from(texture);
    const sprite = new Sprite(spriteImage);
    sprite.anchor.set(0.5);
    sprite.x = 100;
    sprite.y = 100;
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.cursor = 'pointer';
  
    sprite.scale.set(0.4);
    //sprite.hitArea = new Rectangle(200, 200, 400, 400);

    sprite.on('pointerdown', event => {
      event.stopPropagation();  // ステージのクリックイベントが発火しないように阻止
      onDragStart(event, sprite, app);  // ドラッグ開始処理を呼び出し
       // スプライトをアクティブに設定
      //console.log(`Sprite clicked: ID=${spriteid}`, 'Sprite now active');
    });
  
    // sprite.on('pointerup', () => onDragEnd(sprite));
    // sprite.on('pointerupoutside', () => onDragEnd(sprite));

    sprite.on('pointerup', () => {
      onDragEnd(sprite);
    });
    sprite.on('pointerupoutside', () => {
      onDragEnd(sprite);
    });

    setSampleSprite(sprite);
    app.stage.addChild(sprite);
  }


const canvasP5ToPixiBtn = () => {
  if (canvasP5ToPixi !== 'sample') {
    createSpriteTest(appRef.current, canvasP5ToPixi);
  }
};


//ランダム移動
const addRandomMoveSample = (app, sprite, easing, closeEnough) => {
  if (sprite.ticker) {
    app.ticker.remove(sprite.ticker);
    sprite.ticker = null;
  }

  let targetX = Math.random() * app.screen.width;
  let targetY = Math.random() * app.screen.height;

  // Tickerイベントを追加する前にスプライトが有効であるかをチェック
  if (!app.stage.children.includes(sprite)) {
    console.log("スプライトは既に削除されています");
    return; // スプライトが存在しなければ関数を抜ける
  }

  const tickerCallback = () => {
    if (!app.stage.children.includes(sprite)) {
      console.log("スプライトが削除されたため、移動を停止します");
      app.ticker.remove(tickerCallback); // スプライトが削除されたらTickerを停止する
      return;
    }

    sprite.x += (targetX - sprite.x) * easing;
    sprite.y += (targetY - sprite.y) * easing;
    if (Math.abs(sprite.x - targetX) < closeEnough && Math.abs(sprite.y - targetY) < closeEnough) {
      targetX = Math.random() * app.screen.width;
      targetY = Math.random() * app.screen.height;
    }
  };

  app.ticker.add(tickerCallback);  // スプライトのプロパティとしてTickerのコールバックを保存
  sprite.stopRandomMoveAnimation = () => app.ticker.remove(tickerCallback);
};



const onDragStart = (event, sprite, app) => {
  if (!sprite) {
    return;
  }
  // sprite.alpha = 0.5;
  sprite.data = event.data;
  app.stage.on('pointermove', e => onDragMove(e, sprite, app));
};

const onDragMove = (event, sprite, app) => {
  if (!sprite || !sprite.data) {
    app.stage.off('pointermove'); // ドラッグ中のイベントを安全に削除
    return;
  }
  const newPosition = sprite.data.getLocalPosition(sprite.parent);
  sprite.x = newPosition.x;
  sprite.y = newPosition.y;
};

const onDragEnd = (sprite) => {
  if (!sprite) {
    return;
  }
  // sprite.alpha = 1;
  sprite.data = null;
  appRef.current.stage.off('pointermove');

};





//作動ボタン
const handleRandomMoveSample = () => {
  addRandomMoveSample(appRef.current, sampleSprite, 0.05, 1);
};



  return (
<>
<div ref={pixiContainer} />
<button onClick={canvasP5ToPixiBtn}>読み込む</button>
<button onClick={handleRandomMoveSample}>アニメ</button>
</>
  );
};


export { PixiSample };