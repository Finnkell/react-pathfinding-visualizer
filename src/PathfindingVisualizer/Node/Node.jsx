import React from 'react';
import './Node.css';

function Node(props) {

  const { row, col, isStart, isFinal, isWall, onMouseDown, onMouseEnter, onMouseUp } = props

  const extraClassName = isFinal ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
    </div>
  );
}

export default Node;