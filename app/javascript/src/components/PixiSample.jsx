import React, { useEffect, useState, useRef } from 'react';
import { Application, Assets, Sprite, SCALE_MODES, Texture, Graphics } from 'pixi.js';
import { usePixiGroupSample } from '../PixiGroupSampleContext';



const PixiSample = ({ canvasP5ToPixi, updateTrigger }) => {

  const [sampleAnime, setSampleAnime] = useState(false);

  const [backgroundSample, setBackgroundSample] = useState([]);

      //全体共有からの取得
      const {
        sampleRoomItem,
        sampleRoomSpace,
        pixiDetailPanelVisibleSample,
        setPixiDetailPanelVisibleSample,
        togglePixiDetailPanelSampleVisible,
        activeSpriteSample,
        setActiveSpriteSample,
        sampleRoomItem2,
  
        sampleRoomItem3,
        sampleRoomItem4,
        sampleRoomItem5,
        sampleRoomItem6,
        sampleRoomItem7,
        sampleRoomItem8,
        sampleRoomItem9,
        sampleRoomItem10,
        sampleRoomItem11,
        sampleRoomItem12,
        sampleRoomItem13,
        sampleRoomItem14,
        sampleRoomItem15
      } = usePixiGroupSample();


    //pixiを管理するref
    const pixiContainer = useRef(null);

  //外部からappにアクセスするref
  const appRef = useRef(null);
  const [sampleSprite, setSampleSprite] = useState();



  //pixiのメイン
  useEffect(() => {
    const init = async () => {
      const app = new Application({
        background: 0xC2C1C1,
        width: 800,
        height: 450,
        preserveDrawingBuffer: true
      });

      pixiContainer.current.appendChild(app.view);
      appRef.current = app;
      app.stage.interactive = true;
      app.stage.hitArea = app.screen;

      let spriteSpace = Texture.from(sampleRoomSpace);
      handleAddBackgroundSample(appRef.current, spriteSpace)

    };

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

  


  //背景画像を切り替える処理
  const handleAddBackgroundSample = (app, texture) => {
    // 古い背景スプライトを削除
    backgroundSample.forEach(sprite => app.stage.removeChild(sprite));
    setBackgroundSample([]);

    const backgroundSprite = new Sprite(texture);
    setBackgroundSample([backgroundSprite]);
    backgroundSprite.width = app.screen.width;
    backgroundSprite.height = app.screen.height;
    backgroundSprite.x = 0;
    backgroundSprite.y = 0;
    // 背景スプライトをステージに追加
    app.stage.addChild(backgroundSprite);
    // 背景スプライトを最下層に設定
    app.stage.setChildIndex(backgroundSprite, 0);
    backgroundSprite.texture = texture;


    return backgroundSprite;
  };


useEffect(() => {
  if (canvasP5ToPixi !== 'sample') {
    createSpriteTest(appRef.current, canvasP5ToPixi);
    setSampleAnime(true);
  }
}, [updateTrigger]);


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
  setSampleAnime(false);
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
  if (canvasP5ToPixi !== 'sample' && sampleAnime) {
    addRandomMoveSample(appRef.current, sampleSprite, 0.05, 1);
  }
};



  return (
<>
<div className="flux-screen-show-third">
          <div className="flux-screen-show-frame">
            <div>
<div
          style={{
            width: '850px',
            height: '500px',
            border: 'none',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 1px 1px 3px 3px rgba(0, 0, 0, 0.4)',
            borderRadius: '16px',
            background: 'rgb(155 198 204)'
          }}
        >
<div ref={pixiContainer} />
</div>





            </div>
          </div>
        </div>





{/* <button onClick={canvasP5ToPixiBtn}>読み込む</button> */}
<button onClick={handleRandomMoveSample}>アニメ</button>
</>
  );
};


export { PixiSample };