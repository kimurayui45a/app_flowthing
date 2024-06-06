import React, { useEffect, useState, useRef } from 'react';
import { Application, Assets, Sprite, SCALE_MODES, Texture, Graphics } from 'pixi.js';


const SampleRoomPixi = ({ sampleRoomItem }) => {


  //pixiを管理するref
  const pixiContainer = useRef(null);

  //外部からappにアクセスするref
  const appRef = useRef(null);
  const [sampleSprite, setSampleSprite] = useState();


  // 背景画像を管理する
  const [backgroundSprites, setBackgroundSprites] = useState([]);

  //選択状態のスプライトを管理する
  const [activeSpriteSample, setActiveSpriteSample] = useState(null);
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
        console.log('Stage clicked, deselecting any active sprite');
        setActiveSpriteSample(null);  // すべてのスプライトの選択を解除
    });
    const handleClickOutside = (event) => {
      console.log('Stage clicked, deselecting any active sprite');
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
    //let itemData = JSON.parse(sampleRoomItem);
    let spriteImage = Texture.from(sampleRoomItem);
    createSpriteSample(appRef.current, spriteImage, 0, 0, 1, 1, 0, 1);
  }, [sampleRoomItem]);

  //背景画像を切り替える処理
  const handleAddBackground = (app, texture, spaceId, updateState) => {
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

    if (updateState) {
      updateSpaceInfo(spaceId);
    }
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
const createSpriteSample = (app, texture, x, y, scaleValue, alphaValue, angleDegrees, spriteid) => {
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
    //console.log(`Sprite clicked: ID=${spriteid}`, 'Sprite now active');
    //togglePixiDetailPanelVisible();
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

//   if (bool) {
//   const newSpriteInfo = {
//     sprite_id: sprite.id,
//     item_id: itemId,
//     sprite_position: { x: x, y: y },
//     sprite_scale: scale,
//     sprite_mask: false,
//     mask_value: null,
//     sprite_alpha: 1,
//     top_bottom: false,
//     top_bottom_value: null,
//     left_right: false,
//     left_right_value: null,
//     rotate_anime: false,
//     rotate_value: null,
//     scale_anime: false,
//     scale_anime_value: null,
//     others_anime: false,
//     anime_value: null,
//     angleDegrees_value: angleDegrees,
//     sub_user_id: subUserId
//   };

//   setSpriteInfo(prevInfo => [...prevInfo, newSpriteInfo])
//   const result = maxSprite - 1;
//   setMaxSprite(result);
// }

  app.stage.addChild(sprite);
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
<div ref={pixiContainer} />

</>
  );
};


export default SampleRoomPixi;