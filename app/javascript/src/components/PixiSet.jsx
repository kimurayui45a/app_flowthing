import React from 'react';
import { PixiGroupProvider } from './PixiGroupContext';
import { PixiComponent } from './PixiComponent';



const PixiSet = ({
  itemAllId,
  spaceAllId,
  onDataFromGrandchild,
  pixiMode,
  subUserAllId,
  compositeId,
  spaceObject,
  itemObject,
  canvasSpaceSize,
  panelPosition
}) => {
  return (
    <>
      <PixiGroupProvider panelPosition={panelPosition}>
        <div>
          <PixiComponent
            onDataFromGrandchild={onDataFromGrandchild}
            key={compositeId}
            compositeId={compositeId}
            itemAllId={itemAllId}
            spaceAllId={spaceAllId}
            pixiMode={pixiMode}
            subUserAllId={subUserAllId}
            spaceObject={spaceObject}
            itemObject={itemObject}
            canvasSpaceSize={canvasSpaceSize}
          />
        </div>
      </PixiGroupProvider>
    </>
  );
};



export { PixiSet };
