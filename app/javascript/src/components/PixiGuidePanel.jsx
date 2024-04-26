import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiGroup } from './PixiGroupContext';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { PixiListSpaceContext } from './PixiListSpaceContext';
import { PixiListItemContext } from './PixiListItemContext';


const PixiGuidePanel = ({ itemAllId, spaceAllId }) => {


  // useEffect(() => {
  //   console.log('アイテム', itemAllId);

  //   itemAllId.forEach(item => {
  //     console.log(`Name: ${item.item_name}`);
  //   });

  // }, []);

  const {
    pixiGuidePanelVisible,
    setPixiGuidePanelVisible,
    guidePanelPosition,
    setGuidePanelPosition,
    toggleGuidePanelVisible,
    toggleGuidePanelClose,
    handlePixiPanelDragStop
  } = usePixiGroup();


  const {
    handleAddSprite
  } = usePixiComponentShare();


    // コンテナ内で特定の位置にスクロールする関数
    const scrollGuide = (containerId, position) => {
      const container = document.getElementById(containerId);
  
      if(container) {
        container.scrollTo({
          top: position,
          behavior: 'smooth'
        });
      }
    };

  return (
    <Rnd
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      bounds="parent"
      className="control-panel-white"
      position={{ x: guidePanelPosition.x, y: guidePanelPosition.y }}
      // // onMouseDown={() => setP5DrawingEnabled(false)}
      // onTouchStart={(e) => {
      //   // setP5DrawingEnabled(false);
      //   handleBackgroundTouch(e);
      // }}
      onDragStop={(e, d) => handlePixiPanelDragStop(setGuidePanelPosition, e, d)}
      size={{ width: 600, height: 400 }}
      style={{ position: 'absolute', zIndex: 32 }}
      // disableDragging={!isDraggablePanel}
      cancel=".no-drag"
    >

    <div className="panel-title">
      <span>ガイド</span>
      {/* 閉じる */}
      <div className="close-btn-position">
        <div
          className="close-btn tooltip-container"
          onClick={toggleGuidePanelClose}
          onTouchStart={toggleGuidePanelClose}
        >
          <i className="bi bi-x-lg"></i>
          <span className="tooltip-text">閉じる</span>
        </div>
      </div>
    </div>

    <div className="select-detail-tool-group" style={{ position: 'relative' }}>
      <div
        className="flex-column text-Rounded"
        style={{
          width: '100px',
          height: '180px',
          // backgroundColor: '#c2c1c1',
          position: 'absolute',
          top: '78px',
          right: '0px',
          zIndex: '80',
          fontSize: '10px',
          // borderRadius: '7px 0px 0px 7px',
        }}
        >
          <div
            className="flex pressure-panel-btn"
            onClick={() => scrollGuide('specialGuideContainer', 213)}
            onTouchStart={() => scrollGuide('specialGuideContainer', 213)}
            style={{
              borderBottom: '0.5px solid #4A4A4A',
              borderRadius: '7px 0px 0px 7px',
              fontSize: '8px',
              height: '30px',
              width: '100px',
              backgroundColor: '#c2c1c1'
            }}
          >
            [リスト]Flow Thing
          </div>

          <div
            className="flex pressure-panel-btn"
            onClick={() => scrollGuide('specialGuideContainer', 478)}
            onTouchStart={() => scrollGuide('specialGuideContainer', 478)}
            style={{
              borderBottom: '0.5px solid #4A4A4A',
              borderTop: '0.5px solid #4A4A4A',
              backgroundColor: '#c2c1c1',
              fontSize: '8px',
              height: '30px',
              width: '100px',
              borderRadius: '7px 0px 0px 7px'
            }}
          >
            [リスト]Screen
          </div>

          <div
            className="flex pressure-panel-btn"
            onClick={() => scrollGuide('specialGuideContainer', 648)}
            onTouchStart={() => scrollGuide('specialGuideContainer', 648)}
            style={{
              borderBottom: '0.5px solid #4A4A4A',
              borderTop: '0.5px solid #4A4A4A',
              fontSize: '8px',
              height: '30px',
              width: '100px',
              borderRadius: '7px 0px 0px 7px',
              backgroundColor: '#c2c1c1'
            }}
          >
          [カスタム]Flow Thing<br />
          [スタイル]タブ
          </div>

          <div
            className="flex pressure-panel-btn"
            onClick={() => scrollGuide('specialGuideContainer', 1070)}
            onTouchStart={() => scrollGuide('specialGuideContainer', 1070)}
            style={{
              borderTop: '0.5px solid #4A4A4A',
              borderRadius: '7px 0px 0px 7px',
              fontSize: '8px',
              height: '30px',
              width: '100px',
              backgroundColor: '#c2c1c1',
              borderBottom: '0.5px solid #4A4A4A'
            }}
          >
            [カスタム]Flow Thing<br />
          [シンプル]タブ
          </div>

          <div
            className="flex pressure-panel-btn"
            onClick={() => scrollGuide('specialGuideContainer', 1625)}
            onTouchStart={() => scrollGuide('specialGuideContainer', 1625)}
            style={{
              borderTop: '0.5px solid #4A4A4A',
              borderRadius: '7px 0px 0px 7px',
              fontSize: '8px',
              height: '30px',
              width: '100px',
              backgroundColor: '#c2c1c1',
              borderBottom: '0.5px solid #4A4A4A'
            }}
          >
            [カスタム]Flow Thing<br />
          [トクベツ]タブ
          </div>

          <div
            className="flex pressure-panel-btn"
            onClick={() => scrollGuide('specialGuideContainer', 2387)}
            onTouchStart={() => scrollGuide('specialGuideContainer', 2387)}
            style={{
              borderTop: '0.5px solid #4A4A4A',
              borderRadius: '7px 0px 0px 7px',
              fontSize: '8px',
              height: '30px',
              width: '100px',
              backgroundColor: '#c2c1c1',
              boxShadow: '1px 1px black'
            }}
          >
          [カスタム]Screen
          </div>
        </div>

      <div id="specialGuideContainer" style={{ overflowY: 'auto', height: '300px', display: 'flex', flexDirection: 'column', marginTop: '10px', width: '360px', alignItems: 'center' }}>

      <div style={{ marginTop: '35px', marginBottom: '25px', fontSize: '25px' }}><span className="red-text text-Rounded gaido-panel-title">ガイド</span></div>
        <div className="gaido-panel">
        <span className="red-text">選択中</span>：赤い四角で囲まれたFlow Thingが現在選択されているものです。画面内の何もないところをクリックすると選択状態を解除できます。<br />
        <div style={{ margin: '2px' }}><span className="red-text">Screenの挿入について</span>：こちらは必ず何か1枚挿入してください。Screenの挿入がない場合Flux Screenは作成されません。</div>

        <div className="guide-section"><span className="light-blue-text gaido-panel-title">[リスト]パネル（Flow Thing）</span></div>
          Flow Thingのアイコンボタンを押すと選択されたFlow Thingがステージに挿入されます。
          初期スケールは1となっているため横400px・縦400pxで挿入されます。<br />スケール変更は[リスト]パネル右上の
          <div
            className="panel-tool-button-guide"
            style={{ margin: '2px' }}
            >
            <i className="bi bi-collection-play"></i>
          </div>
          アイコンをクリックし[カスタム]パネルにて行えます。<br />


          <div
            className="panel-tool-button-guide"
            style={{ margin: '7px 2px 2px 2px' }}
            >
            <i className="bi bi-collection-play"></i>
          </div>


          アイコン：Flow Thingのスタイル変更やアニメーションの付与が行える[カスタム]パネルが表示されます。<br />


          <div
            className="panel-tool-button-guide"
            style={{ margin: '2px' }}
            >
            <i className="bi bi-trash3-fill"></i>
          </div>アイコン：選択中のFlow Thingを削除します。

          <div className="guide-section"><span className="light-blue-text gaido-panel-title">[リスト]パネル（Screen）</span></div>
          Screenのアイコンボタンを押すと選択されたScreenがステージに挿入されます。<br />



          <div
            className="panel-tool-button-guide"
            style={{ margin: '7px 2px 2px 2px' }}
            >
            <i className="bi bi-collection-play"></i>
          </div>アイコン：Screenにアニメーションの付与が行える[カスタム]パネルが表示されます。



          <div className="guide-section"><span className="light-blue-text gaido-panel-title">[カスタム]パネル（Flow Thing）</span></div>

          <div style={{ marginTop: '6px' }}><span className="f-text gaido-panel-title">[スタイル]タブ</span>
          </div>Flow Thingのスタイルを変更します。


          <div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[スケール]</span>
          </div>Flow Thingのスケールを変更します。Flow Thingを選択して[変更]ボタンを押すと変更されます。<br />
フォームに表示されている値が現在の設定値になっているため、設定後に挿入されるFlow Thingはその値で挿入されます。


<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[透明度]</span>
          </div>Flow Thingの透明度を変更します。Flow Thingを選択して[変更]ボタンを押すと変更されます。<br />
フォームに表示されている値が現在の設定値になっているため、設定後に挿入されるFlow Thingはその値で挿入されます。


<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[角度]</span>
          </div>Flow Thingの角度を変更します。Flow Thingを選択して[変更]ボタンを押すと変更されます。<br />
フォームに表示されている値が現在の設定値になっているため、設定後に挿入されるFlow Thingはその値で挿入されます。


<div style={{ marginTop: '16px' }}><span className="f-text gaido-panel-title">[シンプル]タブ</span>
          </div>Flow Thingにシンプルなアニメーションを付与します。<br />
    
          <span className="red-text">※[上下アニメ]と[左右アニメ]は[トクベツ]のアニメと同時実行できません。</span>


          <div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[上下アニメ]</span></div>
Flow Thingが上下にスライドします。スライド移動距離と速さを設定できます。



<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[左右アニメ]</span></div>
Flow Thingが左右にスライドします。スライド移動距離と速さを設定できます。


<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[回転アニメ]</span></div>
Flow Thingが360度回転します。回転の速さを設定できます。また
<div
className="panel-tool-button-guide"
style={{ margin: '7px 2px 2px 2px' }}
>
<i className="bi bi-arrow-clockwise"></i>
</div>

<div
className="panel-tool-button-guide"
style={{ margin: '7px 2px 2px 2px' }}
>
<i className="bi bi-arrow-counterclockwise"></i>
</div>


アイコンから回転方向を設定できます。<br />
オプションタイトル横の
<div
className="panel-tool-button-guide"
style={{ margin: '7px 2px 2px 2px' }}
>
<i className="bi bi-broadcast"></i>
</div>
アイコンをクリックすると[振り子アニメ]モードに切り替わります。

<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[振り子アニメ]</span></div>
Flow Thingが左右に振り子のように揺れます。揺れる速さと回転角度（回転範囲）を設定できます。また

<div
className="panel-tool-button-guide"
style={{ margin: '7px 2px 2px 2px' }}
>
<i className="bi bi-arrow-clockwise"></i>
</div>

<div
className="panel-tool-button-guide"
style={{ margin: '7px 2px 2px 2px' }}
>
<i className="bi bi-arrow-counterclockwise"></i>
</div>


アイコンから回転方向を設定できます。<br />
オプションタイトル横の
<div
className="panel-tool-button-guide"
style={{ margin: '7px 2px 2px 2px' }}
>
<i className="bi bi-arrow-repeat"></i>
</div>
アイコンをクリックすると[回転アニメ]モードに切り替わります。


<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[縮尺アニメ]</span></div>
Flow Thingのスケールが変動するアニメです。変動する最大・最小スケールとアニメの速さを設定できます。




<div style={{ marginTop: '16px' }}><span className="f-text gaido-panel-title">[トクベツ]タブ</span>
          </div>Flow Thingにシンプルなアニメーションを付与します。<br />
    
          <span className="red-text">※[トクベツ]のアニメは1つの項目しか選択できません。また、[上下アニメ][左右アニメ]とは同時実行できません。<br />
[回転アニメ][振り子アニメ][縮尺アニメ]とは同時実行可能です。</span>



<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[ランダムアニメ]</span></div>
選択しアニメを付与したFlow Thingがステージ内をランダムに移動するアニメです。移動速度と移動方向でターゲットになった目的地に到達する時の到達判定[距離]を設定できます。[距離]が大きいほど目的地の到達判定が広くなり次の動作に早く切り替わります。

<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[追従アニメ]</span></div>
Flow Thingを選択し、[登録]を押すと追従アニメを付与できます。<br />
ステージ内をクリックすると登録したFlow Thingがマウスに追従します。複数のFlow Thingを登録できます。<br />
追従する速さをFlow Thing個別に設定できます。選択されているFlow Thingが対象です。<br />
また、[削除]で選択されているFlow Thingを削除できます。[全選択]では選択に関係なくすべてのFlow Thingの登録を削除します。


<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[移動範囲アニメ]（四角形）</span></div>
選択しアニメを付与したFlow Thingが四角形の形に移動します。ステージ内の左上が（X: 0, Y: 0）となっており、それを基準に[X座標][Y座標]の項目でアニメスタートの位置を指定できます。（X: 1, Y: 1）が最小値となります。<br />
また、[幅]と[高さ]で移動範囲を、[速さ]で移動速度を設定できます。

<div style={{ marginTop: '5px' }}><span className="t-text gaido-panel-title">[移動範囲アニメ]（円形）</span></div>
選択しアニメを付与したFlow Thingが円形の形に移動します。ステージ内の左上が（X: 0, Y: 0）となっており、それを基準に[X座標][Y座標]の項目でアニメスタートの位置を指定できます。（X: 1, Y: 1）が最小値となり、指定した値が円の中心となります。<br />
また、[半径]で移動範囲を、[速さ]で移動速度を設定できます。




<div style={{ marginBottom: '35px' }}><div className="guide-section"><span className="light-blue-text gaido-panel-title">[カスタム]パネル（Screen）</span></div>

背景であるScreenにアニメを付与できます。アイコンで左右上下にスクロールするアニメをアイコンで一定時間でScreenが切り替わるアニメを作成できます。<br />
[複数選択]ボタンでアニメに使用するScreenを上限20枚まで選択できます。選択を解除するには表示されたScreen名のタブをクリックして下さい。Screenを選択後[更新]ボタンでアニメーションを開始できます。作り直したい場合は再度任意のScreenを選択し[更新]ボタンを押して下さい。<br />
[単一選択]ボタンでアニメーションのない1枚の通常Screenに戻ります。<br />
[速さ]の項目でScreenのスクロール速度を、[時間]の項目で切り替わり時間を設定できます。</div>





</div>






      </div>



    </div>


  </Rnd>
  );
};


export { PixiGuidePanel };