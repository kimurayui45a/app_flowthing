import React, { useState } from 'react';
import { PixiSet } from './components/PixiSet';

const LoadComposite = ({ itemAllId, spaceAllId, subUserAllId, compositeId, spaceObject, itemObject }) => {
    
  //「編集・作成」なのか「再描画」なのかを知らせるステート
  const [pixiMode, setPixiMode] = useState(false);

  return (
    <div>
      <PixiSet
        key={compositeId}
        compositeId={compositeId}
        itemAllId={itemAllId}
        spaceAllId={spaceAllId}
        subUserAllId={subUserAllId}
        spaceObject={spaceObject}
        itemObject={itemObject}
        pixiMode={pixiMode}
      />
    </div>
  );
};

export { LoadComposite };