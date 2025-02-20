import React from 'react';

const DraggableFlag: React.FC = () => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'flag');
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div 
      className="draggable-flag"
      draggable="true"
      onDragStart={handleDragStart}
    >
      🚩
    </div>
  );
};

export default DraggableFlag; 