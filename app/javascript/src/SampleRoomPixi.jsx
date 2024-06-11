import React, { useEffect, useState, useRef } from 'react';
import { Application, Assets, Sprite, SCALE_MODES, Texture, Graphics } from 'pixi.js';
import { usePixiGroupSample } from './PixiGroupSampleContext';
import { PixiSampleRoomDetailPanel } from './PixiSampleRoomDetailPanel';

const SampleRoomPixi = ({ sampleRoomId }) => {


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


  // 背景画像を管理する
  const [backgroundSprites, setBackgroundSprites] = useState([]);

  //選択状態のスプライトを管理する
  const activeSpriteSampleRef = useRef(activeSpriteSample);

  //選択しているスプライトの周りにつける枠
  const borderSampleRef = useRef(null);



  //pixiのメイン
  // useEffect(() => {
  //   const init = async () => {
  //     const app = new Application({
  //       background: 0x1099bb,
  //       width: 800,
  //       height: 450,
  //     });

  //     pixiContainer.current.appendChild(app.view);
  //     appRef.current = app;
  //     app.stage.interactive = true;
  //     app.stage.hitArea = app.screen;
  // }
  //   init();

  //   return () => {
  //     if (pixiContainer.current && pixiContainer.current.children.length > 0) {
  //       pixiContainer.current.removeChild(pixiContainer.current.children[0]);
  //     }
  //   };
  // }, []);



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

      //初期の背景処理
      // // 透明なグラフィックスオブジェクトを作成
      // const transparentGraphics = new Graphics();
      // transparentGraphics.beginFill(0x000000, 0); // 完全に透明な色で塗りつぶし
      // transparentGraphics.drawRect(0, 0, app.screen.width, app.screen.height);
      // transparentGraphics.endFill();

      // // グラフィックスからテクスチャを生成
      // const transparentTexture = app.renderer.generateTexture(transparentGraphics);

      // // 生成したテクスチャからスプライトを作成
      // const backgroundSprite = new Sprite(transparentTexture);
      // backgroundSprite.x = 0;
      // backgroundSprite.y = 0;

      // // ステージに背景スプライトを追加
      // app.stage.addChild(backgroundSprite);

      app.stage.on('pointerdown', () => {
        // console.log('Stage clicked, deselecting any active sprite');
        setActiveSpriteSample(null);  // すべてのスプライトの選択を解除
    });
    const handleClickOutside = (event) => {
      // console.log('Stage clicked, deselecting any active sprite');
      if (borderSampleRef.current) {
        borderSampleRef.current.clear(); // 直接枠をクリア
      }
      setActiveSpriteSample(null);
      // クリックされた座標を保存
      //const position = event.data.global;
      //setClickPositionApp({ x: position.x, y: position.y });
    };


    // app.stage.on('pointerdown', (event) => {
    //   const mousePosition = event.data.global;
    //   // moveClickSpritesRef.current 内の各スプライト情報に基づいて移動処理を適用
    //   moveClickSpritesRef.current.forEach(spriteId => {
    //     const sprite = app.stage.children.find(child => child.id === spriteId.id);
    //     if (sprite) {
    //       moveToTarget(mousePosition, sprite, spriteId.speed);
    //     }
    //   });
    // });


    app.stage.on('pointerdown', handleClickOutside);

    // 枠を示すグラフィックスオブジェクトを作成
    const border = new Graphics();
    border.lineStyle(2, 0xFF0000, 1); // 赤色の枠
    app.stage.addChild(border);
    borderSampleRef.current = border;
    };

    init();

    return () => {
      if (pixiContainer.current && pixiContainer.current.children.length > 0) {
        pixiContainer.current.removeChild(pixiContainer.current.children[0]);
      }
    };
  }, []);


  useEffect(() => {

    if (sampleRoomId === 'myRoom') {
      //背景スプライト
      let spriteSpace = Texture.from(sampleRoomSpace);
      handleAddBackground(appRef.current, spriteSpace)


      //スプライト作成
      //(app, texture, x, y, scaleValue, alphaValue, angleDegrees, spriteid, anime)

      //スプライト14(ゴキ)
      let spriteImage14 = Texture.from(sampleRoomItem14);
      createSpriteSample(appRef.current, spriteImage14, 595.1328125, 104.19921875, 0.3, 1, 0, 14, 'boundary');

      //サンプルスプライト(ゴミ箱)
      let spriteImage = Texture.from(sampleRoomItem);
      createSpriteSample(appRef.current, spriteImage, 290, 89.3515625, 0.3, 1, 0, 1, 'noAnime');

      //スプライト3(ポテチ)
      let spriteImage3 = Texture.from(sampleRoomItem3);
      createSpriteSample(appRef.current, spriteImage3, 468.51171875, 357.7109375, 0.5, 1, 0, 3, 'noAnime');

      //スプライト6(座布団)
      let spriteImage6 = Texture.from(sampleRoomItem6);
      createSpriteSample(appRef.current, spriteImage6, 400.2265625, 269.26953125, 0.2, 1, 0, 6, 'noAnime');
      
      //スプライト7(キャンバス)
      let spriteImage7 = Texture.from(sampleRoomItem7);
      createSpriteSample(appRef.current, spriteImage7, 595.1328125, 104.19921875, 0.3, 1, 0, 7, 'noAnime');

      //スプライト8(本棚)
      let spriteImage8 = Texture.from(sampleRoomItem8);
      createSpriteSample(appRef.current, spriteImage8, 719.52734375, 85.890625, 0.2, 1, 0, 8, 'noAnime');
    
      //スプライト4(布団)
      let spriteImage4 = Texture.from(sampleRoomItem4);
      createSpriteSample(appRef.current, spriteImage4, 213.6875, 301.28125, 0.28, 1, 0, 4, 'noAnime');

      //サンプルスプライト(住民)
      let spriteImage2 = Texture.from(sampleRoomItem2);
      createSpriteSample(appRef.current, spriteImage2, 673.38671875, 265.296875, 0.33, 1, 0, 2, 'pendulum');

      //スプライト9(スナック)
      let spriteImage9 = Texture.from(sampleRoomItem9);
      createSpriteSample(appRef.current, spriteImage9, 168.0390625, 149.55859375, 0.1, 1, 0, 9, 'noAnime');

      //スプライト10(ゲーム)
      let spriteImage10 = Texture.from(sampleRoomItem10);
      createSpriteSample(appRef.current, spriteImage10, 254.79296875, 143.09765625, 0.15, 1, 340, 10, 'noAnime');
      
      //スプライト15(友達)
      let spriteImage15 = Texture.from(sampleRoomItem15);
      createSpriteSample(appRef.current, spriteImage15, 398.0390625, 152.89453125, 0.15, 1, 0, 15, 'noAnime');

      //スプライト5(盛り塩)
      let spriteImage5 = Texture.from(sampleRoomItem5);
      createSpriteSample(appRef.current, spriteImage5, 747.64453125, 398.97265625, 0.3, 1, 0, 5, 'noAnime');
      
      //スプライト11(ししゃも)
      let spriteImage11 = Texture.from(sampleRoomItem11);
      createSpriteSample(appRef.current, spriteImage11, 515.0546875, 150.296875, 0.25, 1, 0, 11, 'noAnime');

      //スプライト12(地縛霊)
      let spriteImage12 = Texture.from(sampleRoomItem12);
      createSpriteSample(appRef.current, spriteImage12, 559.4197377515305, 155.2641443339201, 0.3, 0.7, 0, 12, 'random');

      //スプライト13(ロゴ)
      let spriteImage13 = Texture.from(sampleRoomItem13);
      createSpriteSample(appRef.current, spriteImage13, 101.921875, 66.21484375, 0.25, 1, 0, 13, 'noAnime');
      

    }

  }, []);

  //背景画像を切り替える処理
  const handleAddBackground = (app, texture) => {
    // 古い背景スプライトを削除
    backgroundSprites.forEach(sprite => app.stage.removeChild(sprite));
    setBackgroundSprites([]);

    const backgroundSprite = new Sprite(texture);
    setBackgroundSprites([backgroundSprite]);
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



  //スプライトの作成
//   const createSpriteTest = (app, texture) => {

//     let spriteImage;

//     spriteImage = Texture.from(texture);
//     const sprite = new Sprite(spriteImage);
//     sprite.anchor.set(0.5);
//     sprite.x = 100;
//     sprite.y = 100;
//     sprite.interactive = true;
//     sprite.buttonMode = true;
//     sprite.cursor = 'pointer';
  
//     sprite.scale.set(0.4);
//     //sprite.hitArea = new Rectangle(200, 200, 400, 400);

//     sprite.on('pointerdown', event => {
//       event.stopPropagation();  // ステージのクリックイベントが発火しないように阻止
//       onDragStart(event, sprite, app);  // ドラッグ開始処理を呼び出し
//        // スプライトをアクティブに設定
//       //console.log(`Sprite clicked: ID=${spriteid}`, 'Sprite now active');
//     });
  
//     // sprite.on('pointerup', () => onDragEnd(sprite));
//     // sprite.on('pointerupoutside', () => onDragEnd(sprite));

//     sprite.on('pointerup', () => {
//       onDragEnd(sprite);
//     });
//     sprite.on('pointerupoutside', () => {
//       onDragEnd(sprite);
//     });

//     setSampleSprite(sprite);
//     app.stage.addChild(sprite);
//   }


// const canvasP5ToPixiBtn = () => {
//   if (canvasP5ToPixi !== 'sample') {
//     createSpriteTest(appRef.current, canvasP5ToPixi);
//   }
// };



//スプライトの作成
const createSpriteSample = (app, texture, x, y, scaleValue, alphaValue, angleDegrees, spriteid, anime) => {
  // if (maxSprite === 0) {
  //   handleAlertMessageAnime("スプライト数が上限に達しました。新規で追加する場合は削除して下さい。");
  //   return;
  // }
  const sprite = new Sprite(texture);
  // if (bool) {
  //   sprite.id = nextSpriteIdRef.current++;
  // } else {
  //   sprite.id = spriteid;
  // }
  sprite.id = spriteid;
  sprite.anchor.set(0.5);
  sprite.x = x;
  sprite.y = y;
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.cursor = 'pointer';
  sprite.rotation = angleDegrees * (Math.PI / 180);

  const scale = scaleValue;
  sprite.scale.set(scale);
  //sprite.hitArea = new Rectangle(200, 200, 400, 400);

  sprite.alpha = alphaValue;

  sprite.on('pointerdown', event => {
    event.stopPropagation();  // ステージのクリックイベントが発火しないように阻止
    onDragStart(event, sprite, app);  // ドラッグ開始処理を呼び出し
    setActiveSpriteSample(sprite.id);  // スプライトをアクティブに設定
    togglePixiDetailPanelSampleVisible();
    //console.log(`Sprite clicked: ID=${spriteid}`, 'Sprite now active');
  });

  // sprite.on('pointerup', () => onDragEnd(sprite));
  // sprite.on('pointerupoutside', () => onDragEnd(sprite));

  sprite.on('pointerup', () => {
    onDragEnd(sprite);
    updateBorder(sprite);
  });
  sprite.on('pointerupoutside', () => {
    onDragEnd(sprite);
    updateBorder(sprite);
  });


  app.stage.addChild(sprite);



  if (anime !== 'noAnime') {
    if (anime === 'pendulum') {
      addPendulumAnime(app, sprite, 80, 2000, true)
    } else if (anime === 'random') {
      addRandomAnime(app, sprite, 0.05, 1)
    } else if (anime === 'boundary') {
      addBoundaryAnime(app, sprite, 20, 90, 760, 345, 0.01)
    }
  }

  return sprite;
  // setItemSprites(prevSprites => [...prevSprites, sprite]);

  // if (!bool) {
  //   // 非同期処理が必要な場合（例：ロードが完了するのを待つ）
  //   return new Promise(resolve => {
  //     resolve(sprite);
  //   });
  // } else {
  //   // 非同期処理が不要な場合でもPromiseを返す
  //   return Promise.resolve(sprite);
  // }
};



//振り子アニメ
const addPendulumAnime = (app, sprite, maxRotation, period, clockwise) => {
  let rotationDirection = clockwise ? 1 : -1;
  let startTime = app.ticker.lastTime; // アニメーション開始時の時間を保存
  let maxRotationValue = Math.PI / maxRotation;

  const swingPendulum = () => {
    if (!app.stage.children.includes(sprite)) {
      // console.log("スプライトは既に削除されています");
      app.ticker.remove(swingPendulum); // スプライトが削除されたらTickerからこの関数を削除する
      return; // スプライトが存在しなければ関数を抜ける
    }

    const currentTime = app.ticker.lastTime;
    const elapsedTime = (currentTime - startTime) % period; // 現在の周期内での経過時間
    const phase = (elapsedTime / period) * Math.PI * 2; // 振動のフェーズ（全周の2π）

    // Math.sinの範囲は-1から1なので、この値に最大回転角度を掛ける
    sprite.rotation = maxRotationValue * Math.sin(phase) * rotationDirection;

    // πに到達したら方向を反転
    if (phase >= Math.PI) {
      rotationDirection *= -1;
      startTime = currentTime; // 次の周期の開始時刻を更新
    }
  };

  app.ticker.add(swingPendulum);
  sprite.stopSwingPendulumTicker = () => app.ticker.remove(swingPendulum); // アニメーション停止用の関数を提供
};


//ランダム移動
const addRandomAnime = (app, sprite, easing, closeEnough) => {
  if (sprite.ticker) {
    app.ticker.remove(sprite.ticker);
    sprite.ticker = null;
  }

  let targetX = Math.random() * app.screen.width;
  let targetY = Math.random() * app.screen.height;

  // Tickerイベントを追加する前にスプライトが有効であるかをチェック
  if (!app.stage.children.includes(sprite)) {
    // console.log("スプライトは既に削除されています");
    return; // スプライトが存在しなければ関数を抜ける
  }

  const tickerCallback = () => {
    if (!app.stage.children.includes(sprite)) {
      // console.log("スプライトが削除されたため、移動を停止します");
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


//指定範囲内の移動
const addBoundaryAnime = (app, sprite, x, y, width, height, speed) => {
  let side = 0; // 0: 上辺, 1: 右辺, 2: 下辺, 3: 左辺
  let progress = 0; // 0から1までの進行状況

  const updatePosition = () => {

    if (!app.stage.children.includes(sprite)) {
      // console.log("スプライトは既に削除されています");
      app.ticker.remove(updatePosition); // スプライトが削除されたらTickerからこの関数を削除する
      return; // スプライトが存在しなければ関数を抜ける
    }

    // const { x, y, width, height, speed } = boundary;
    switch (side) {
      case 0: // 上辺を移動
        sprite.x = x + progress * width;
        sprite.y = y;
        break;
      case 1: // 右辺を移動
        sprite.x = x + width;
        sprite.y = y + progress * height;
        break;
      case 2: // 下辺を移動
        sprite.x = x + width - progress * width;
        sprite.y = y + height;
        break;
      case 3: // 左辺を移動
        sprite.x = x;
        sprite.y = y + height - progress * height;
        break;
    }
    progress += speed; // 進行速度を調整
    if (progress >= 1) {
      progress = 0;
      side = (side + 1) % 4; // 次の辺に移動
    }
  };

  app.ticker.add(updatePosition);
  sprite.stopBoundaryAnimationTicker = () => app.ticker.remove(updatePosition);
};



  
const updateBorder = (sprite) => {
  const border = borderSampleRef.current;
  if (sprite) {
  border.clear();
  border.lineStyle(2, 0xFF0000, 1);
  border.drawRect(
    sprite.x - sprite.width / 2,
    sprite.y - sprite.height / 2,
    sprite.width,
    sprite.height
  );
}
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





  return (
<>

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

{pixiDetailPanelVisibleSample && <PixiSampleRoomDetailPanel />}
      <div ref={pixiContainer} />
      </div>
</>
  );
};


export default SampleRoomPixi;