import React from 'react';
import { Rnd } from 'react-rnd';

function DraggableRndTest() {
  return (
    <div className="draggable-container">
      <Rnd
        default={{ x: 0, y: 0, width: 100, height: 100 }}
        minWidth="50"
        minHeight="50"
        maxWidth="200"
        maxHeight="200"
        bounds="parent"
        className="draggable-box"
      >
      
          <div className="small-box blue-box">
            <i className="bi bi-image"></i>
          </div>
          <div className="small-box red-box">
          </div>
  
      </Rnd>
    </div>
  );
}

export default DraggableRndTest;