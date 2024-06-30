


import React, { useEffect, useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { usePixiComponentShare } from './PixiComponentShareContext';
import { usePixiGroup } from './PixiGroupContext';
// import { PixiPanelParts } from './PixiPanelParts';




const PixiCustomCurrentDetails = () => {



  // const {
  //   //上下左右アニメーション
  //   leftRightAmplitude,
  //   setLeftRightAmplitude,
  //   inputLeftRightAmplitude,
  //   setInputLeftRightAmplitude,
  //   leftRightPeriod,
  //   setLeftRightPeriod,
  //   inputLeftRightPeriod,
  //   setInputLeftRightPeriod,
  //   topBottomAmplitude,
  //   setTopBottomAmplitude,
  //   inputTopBottomAmplitude,
  //   setInputTopBottomAmplitude,
  //   topBottomPeriod,
  //   setTopBottomPeriod,
  //   inputTopBottomPeriod,
  //   setInputTopBottomPeriod,
  //   pixiItemListTab,
  //   setPixiItemListTab,
  //   inputScaleSprite,
  //   inputAlphaSprite,
  //   inputAngleSprite
  // } = usePixiGroup();

  const { 
    activeSpriteDetail
  } = usePixiComponentShare();


  const {
    detailsPanelPosition,
    setDetailsPanelPosition,
    toggleDetailsPanelClose,
    handlePixiPanelDragStop
  } = usePixiGroup();


  return (
    <>


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
      className="control-panel"
      position={{ x: detailsPanelPosition.x, y: detailsPanelPosition.y }}
      // // onMouseDown={() => setP5DrawingEnabled(false)}
      // onTouchStart={(e) => {
      //   // setP5DrawingEnabled(false);
      //   handleBackgroundTouch(e);
      // }}
      onDragStop={(e, d) => handlePixiPanelDragStop(setDetailsPanelPosition, e, d)}
      size={{ width: 250, height: 400 }}
      style={{ position: 'absolute', zIndex: 35 }}
      // disableDragging={!isDraggablePanel}
      cancel=".no-drag"
    >

    <div className="panel-title">
      <span>詳細表示</span>
      {/* 閉じる */}
      <div className="close-btn-position">
        <div
          className="close-btn tooltip-container"
          onClick={toggleDetailsPanelClose}
          onTouchStart={toggleDetailsPanelClose}
        >
          <i className="bi bi-x-lg"></i>
          <span className="tooltip-text">閉じる</span>
        </div>
      </div>
    </div>

    <div className="select-detail-tool-group" style={{ position: 'relative' }}>


      {activeSpriteDetail ? (
        <>
        <i className="bi bi-arrow-down-up" style={{ top: '50px' }}></i>
        <div className="detail-text" style={{ fontSize: '16px', marginTop: '16px' }}>選択中のFlow Thingの詳細</div>
        <div style={{ overflowY: 'auto', height: '300px', display: 'flex', flexDirection: 'column', marginTop: '10px', width: 'auto', alignItems: 'start', padding: '10px', textAlign: 'left'}}>
        

          <div className="detail-text" style={{ marginTop: '0px' }}>
            <span className="light-blue-text">ステージ内の位置(中心基準)</span><br />
            <span>X座標： {activeSpriteDetail.sprite_position.x || '---'}</span><br />
            <span>Y座標： {activeSpriteDetail.sprite_position.y || '---'}</span>
          </div>
          

          <div style={{ marginTop: '16px' }} className="detail-text">
          <span className="light-blue-text">スタイル</span><br />
            <span>縮尺：{activeSpriteDetail.sprite_scale || '---'}</span><br />
            <span>透明度：{activeSpriteDetail.sprite_alpha || '---'}</span><br />
            <span>角度：{activeSpriteDetail.angleDegrees_value || '0'}</span>
          </div>


          <div className="detail-text" style={{ marginTop: '16px' }}>
            <span className="light-blue-text">上下アニメ(
              <span style={{ color: activeSpriteDetail.top_bottom ? '#F8A3B1' : '#4A4A4A' }}>
                {activeSpriteDetail.top_bottom ? '実行中' : '停止中'}
              </span>
            )</span><br />

            <span>
              距離：
              <span style={{ color: activeSpriteDetail.top_bottom ? '#ECECEC' : '#4A4A4A' }}>
                {activeSpriteDetail.top_bottom ? activeSpriteDetail.top_bottom_value.amplitude_value : '---'}
              </span>
            </span><br />

            <span>
              速さ：
              <span style={{ color: activeSpriteDetail.top_bottom ? '#ECECEC' : '#4A4A4A' }}>
                {activeSpriteDetail.top_bottom ? activeSpriteDetail.top_bottom_value.period_value : '---'}
              </span>
            </span>
          </div>


          <div className="detail-text" style={{ marginTop: '16px' }}>
            <span className="light-blue-text">左右アニメ(
              <span style={{ color: activeSpriteDetail.left_right ? '#F8A3B1' : '#4A4A4A' }}>
                {activeSpriteDetail.left_right ? '実行中' : '停止中'}
              </span>
            )</span><br />

            <span>
              距離：
              <span style={{ color: activeSpriteDetail.left_right ? '#ECECEC' : '#4A4A4A' }}>
                {activeSpriteDetail.left_right ? activeSpriteDetail.left_right_value.amplitude_value : '---'}
              </span>
            </span><br />

            <span>
              速さ：
              <span style={{ color: activeSpriteDetail.left_right ? '#ECECEC' : '#4A4A4A' }}>
                {activeSpriteDetail.left_right ? activeSpriteDetail.left_right_value.period_value : '---'}
              </span>
            </span>
          </div>


          <div className="detail-text" style={{ marginTop: '16px' }}>
            <span className="light-blue-text">回転アニメ(
              <span style={{ color: activeSpriteDetail.rotate_anime && activeSpriteDetail.rotate_value.rotate_mode === 'revolution' ? '#F8A3B1' : '#4A4A4A' }}>
                {activeSpriteDetail.rotate_anime && activeSpriteDetail.rotate_value.rotate_mode === 'revolution' ? '実行中' : '停止中'}
              </span>
            )</span><br />

            {activeSpriteDetail.rotate_anime && activeSpriteDetail.rotate_value.rotate_mode === 'revolution' ? (
              <>
                <span>速さ：
                  <span className="detail-value">
                    {activeSpriteDetail.rotate_value.speed_value}
                  </span>
                </span><br />
                <span>回転方向：
                  <span className="detail-value">
                    {activeSpriteDetail.rotate_value.clockwise_value ? '時計回り' : '反時計回り'}
                  </span>
                </span>
              </>
            ) : (
              <>
                <span>速さ：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>回転方向：<span style={{ color: '#4A4A4A' }}>---</span></span>
              </>
            )}
          </div>



          <div className="detail-text" style={{ marginTop: '16px' }}>
            <span className="light-blue-text">振り子アニメ(
              <span style={{ color: activeSpriteDetail.rotate_anime && activeSpriteDetail.rotate_value.rotate_mode === 'pendulum' ? '#F8A3B1' : '#4A4A4A' }}>
                {activeSpriteDetail.rotate_anime && activeSpriteDetail.rotate_value.rotate_mode === 'pendulum' ? '実行中' : '停止中'}
              </span>
            )</span><br />

            {activeSpriteDetail.rotate_anime && activeSpriteDetail.rotate_value.rotate_mode === 'pendulum' ? (
              <>
                <span>速さ：
                  <span className="detail-value">
                    {activeSpriteDetail.rotate_value.period_value}
                  </span>
                </span><br />
                <span>回転方向：
                  <span className="detail-value">
                    {activeSpriteDetail.rotate_value.clockwise_value ? '時計回り' : '反時計回り'}
                  </span><br />
                </span>
                <span>最大回転角度：
                  <span className="detail-value">
                  {activeSpriteDetail.rotate_value.maxRotation_value}
                  </span>
                </span>
              </>
            ) : (
              <>
                <span>速さ：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>回転方向：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>最大回転角度：<span style={{ color: '#4A4A4A' }}>---</span></span>
              </>
            )}
          </div>


          <div className="detail-text" style={{ marginTop: '16px' }}>
            <span className="light-blue-text">縮尺アニメ(
              <span style={{ color: activeSpriteDetail.scale_anime ? '#F8A3B1' : '#4A4A4A' }}>
                {activeSpriteDetail.scale_anime ? '実行中' : '停止中'}
              </span>
            )</span><br />

            <span>
              最大値：
              <span style={{ color: activeSpriteDetail.scale_anime ? '#ECECEC' : '#4A4A4A' }}>
                {activeSpriteDetail.scale_anime ? activeSpriteDetail.scale_anime_value.max_scale : '---'}
              </span>
            </span><br />


            <span>
              最小値：
              <span style={{ color: activeSpriteDetail.scale_anime ? '#ECECEC' : '#4A4A4A' }}>
                {activeSpriteDetail.scale_anime ? activeSpriteDetail.scale_anime_value.min_scale : '---'}
              </span>
            </span><br />

            <span>
              速さ：
              <span style={{ color: activeSpriteDetail.scale_anime ? '#ECECEC' : '#4A4A4A' }}>
                {activeSpriteDetail.scale_anime ? activeSpriteDetail.scale_anime_value.period_value : '---'}
              </span>
            </span><br />
          </div>

          <div className="detail-text" style={{ marginTop: '16px' }}>
            <span className="light-blue-text">ランダムアニメ(
              <span style={{ color: activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'random' ? '#F8A3B1' : '#4A4A4A' }}>
                {activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'random' ? '実行中' : '停止中'}
              </span>
            )</span><br />

            {activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'random' ? (
              <>
                <span>距離：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.closeEnough_value}
                  </span>
                </span><br />
                <span>速さ：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.easing_value}
                  </span>
                </span>
              </>
            ) : (
              <>
                <span>距離：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>速さ：<span style={{ color: '#4A4A4A' }}>---</span></span>
              </>
            )}
          </div>

          <div className="detail-text" style={{ marginTop: '16px' }}>
            <span className="light-blue-text">追従アニメ(
              <span style={{ color: activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'click' ? '#F8A3B1' : '#4A4A4A' }}>
                {activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'click' ? '実行中' : '停止中'}
              </span>
            )</span><br />

            {activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'click' ? (
              <>
                <span>速さ：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.speed_value}
                  </span>
                </span>
              </>
            ) : (
              <>
                <span>速さ：<span style={{ color: '#4A4A4A' }}>---</span></span>
              </>
            )}
          </div>


          <div className="detail-text" style={{ marginTop: '16px' }}>
            <span className="light-blue-text">移動範囲アニメ[四角形](
              <span style={{ color: activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'boundary' ? '#F8A3B1' : '#4A4A4A' }}>
                {activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'boundary' ? '実行中' : '停止中'}
              </span>
            )</span><br />

            {activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'boundary' ? (
              <>
                <span>タイプ：
                  <span className="detail-value">
                    

                    {activeSpriteDetail.anime_value.boundary_type ? '全辺時間一定' : '1辺時間一定'}
                  </span>
                </span><br />

                <span>速さ：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.boundary_date.speed}
                  </span>
                </span><br />
                <span>X座標：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.boundary_date.x}
                  </span>
                </span><br />
                <span>Y座標：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.boundary_date.y}
                  </span>
                </span><br />
                <span>幅：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.boundary_date.width}
                  </span>
                </span><br />
                <span>高さ：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.boundary_date.height}
                  </span>
                </span>
              </>
            ) : (
              <>
                <span>速さ：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>X座標：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>Y座標：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>幅：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>高さ：<span style={{ color: '#4A4A4A' }}>---</span></span>
              </>
            )}
          </div>


          <div className="detail-text" style={{ marginTop: '16px' }}>
            <span className="light-blue-text">移動範囲アニメ[円形](
              <span style={{ color: activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'circular' ? '#F8A3B1' : '#4A4A4A' }}>
                {activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'circular' ? '実行中' : '停止中'}
              </span>
            )</span><br />

            {activeSpriteDetail.others_anime && activeSpriteDetail.anime_value.rotate_mode === 'circular' ? (
              <>
                <span>半径：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.radius_value}
                  </span>
                </span><br />
                <span>速さ：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.speed_value}
                  </span>
                </span><br />
                <span>X座標：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.center_x}
                  </span>
                </span><br />
                <span>Y座標：
                  <span className="detail-value">
                    {activeSpriteDetail.anime_value.center_y}
                  </span>
                </span>

              </>
            ) : (
              <>
                <span>半径：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>速さ：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>X座標：<span style={{ color: '#4A4A4A' }}>---</span></span><br />
                <span>Y座標：<span style={{ color: '#4A4A4A' }}>---</span></span>
              </>
            )}
          </div>


        </div>

        </>
      ) : (
        <div className="detail-text" style={{ fontSize: '14px', marginTop: '16px' }}>選択中のFlow Thingはありません。</div>
      )}
</div>
</Rnd>

    </>
  );
};


export { PixiCustomCurrentDetails };