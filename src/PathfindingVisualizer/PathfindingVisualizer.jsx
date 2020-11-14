import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';

function PathfindingVisualizer() {

  const [nodes, setNodes] = useState([]);

  const loadNodes = () => {
    const temp = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          row,
          col,
          isStart: row === 7 && col === 5,
          isFinal: row === 7 && col === 45,
        }
        currentRow.push(currentNode);
      }
      temp.push(currentRow);
    }
    setNodes(temp);
  }

  useEffect(() => {
    loadNodes();
  }, []);

  return (
    <div className="grid">
      {nodes.map((row, rowIdx) => {
        return <div key={rowIdx}>
          {row.map((node, nodeIdx) => {
            const { isFinal, isStart } = node;
            return <Node key={nodeIdx} isStart={isStart} isFinal={isFinal} />
          })}
        </div>
      })}
    </div>
  );
}

export default PathfindingVisualizer;
