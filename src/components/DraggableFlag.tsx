import React from 'react';

interface DraggableFlagProps {
  isDraggable: boolean;
}

const DraggableFlag = (flagProps: DraggableFlagProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'flag');
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div 
      className="draggable-flag"
      draggable={flagProps.isDraggable}
      onDragStart={handleDragStart}
    >
      🚩
    </div>
  );
};

export default DraggableFlag; 