
import React, { useState, useEffect } from 'react';
import { PixiSet } from './components/PixiSet';
import PixiTest from './PixiTest';

const AllComposite = ({ allComposite, itemAllId, spaceAllId, subUserAllId }) => {
    
  //「編集・作成」なのか「再描画」なのかを知らせるステート
  const [pixiMode, setPixiMode] = useState(false);
  const [spaceObject, setSpaceObject] = useState();
  const [itemObject, setItemObject] = useState();

  const [defaultPixi, setDefaultPixi] = useState(true);

  const [changeDate, setChangeDate] = useState(false);

  const [pixiDateId, setPixiDateId] = useState();

  
  useEffect(() => {
    // allComposite 配列が空であるかどうかを確認
    if (allComposite.length === 0) {
      setDefaultPixi(false);
      console.log('allCompositeの中', allComposite)
    } else {
      // allComposite の中で一番大きいIDを持つ composite を見つける
      const selectComposite = allComposite.reduce((max, composite) => composite.id > max.id ? composite : max, allComposite[0]);
      
      if (selectComposite) {
        const spaceData = selectComposite.composite_space;
        const itemData = selectComposite.composite_item;
        setSpaceObject(spaceData);
        setItemObject(itemData);
      }
    }
  }, []);
  

  
  // const handleCompositeChange = (compositeId) => {
  //   const selectComposite = allComposite.find(composite => composite.id === compositeId);
  //   if (selectComposite) {
  //     const spaceDate = selectComposite.composite_space;
  //     const itemDate = selectComposite.composite_item;
  //     setSpaceObject(spaceDate);
  //     setItemObject(itemDate);
  //     setChangeDate(true);
  //     console.log('allCompositeの中', allComposite)
  //   }
  // }

  const handleCompositeChange = (dateId) => {
    const selectComposite = allComposite.find(composite => composite.id === dateId);
    if (selectComposite) {
      const spaceData = selectComposite.composite_space;
      const itemData = selectComposite.composite_item;
      setSpaceObject(spaceData);
      setItemObject(itemData);
      setPixiDateId(dateId);  // compositeIdを更新
      setChangeDate(true);
    }
  }




  return (
    <div className="flex-column">

<div className="flux-screen-show-frame">
      {defaultPixi ? (
        <>
          <PixiSet
            // key={compositeId}
            // compositeId={compositeId}
            key={pixiDateId}
            itemAllId={itemAllId}
            spaceAllId={spaceAllId}
            subUserAllId={subUserAllId}
            spaceObject={spaceObject}
            itemObject={itemObject}
            pixiMode={pixiMode}
            changeDate={changeDate}
            setChangeDate={setChangeDate}
          />
        </>
      ) : (
        <>
          <PixiTest />
        </>
      )}
</div>

      {allComposite.map((composite, index) => (
        <div key={index} className="flex">
          <div>
            <div
              onClick={() => handleCompositeChange(composite.id)}
              onTouchStart={() => handleCompositeChange(composite.id)}
            >
            {composite.composite_name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllComposite;


