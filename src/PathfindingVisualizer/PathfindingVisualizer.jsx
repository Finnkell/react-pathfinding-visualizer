import React, { useState, useEffect } from 'react';
import { dijkstra } from '../Algorithms/Dijkstra';
import Node from './Node/Node';
import './PathfindingVisualizer.css';

const START_NODE_COL = 15;
const START_NODE_ROW = 10;
const FINAL_NODE_COL = 35;
const FINAL_NODE_ROW = 10;

function PathfindingVisualizer() {

  const [grid, setGrid] = useState([]);

  const loadInitalGrid = () => {
    const grid = [];
    for (let row = 0; row < 15; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(row, col));
      }
      grid.push(currentRow);
    }
    setGrid(grid);
  }

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinal: row === FINAL_NODE_ROW && col === FINAL_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  }

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  const animatedDijkstra = (visitedNodesInOrder) => {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = grid.slice();
        const newNode = {
          ...node,
          isVisited: true,
        };
        newGrid[node.row][node.col] = newNode;
        setGrid(newGrid);
      }, 50 * i);

    }
  }

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = grid[FINAL_NODE_ROW][FINAL_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, targetNode);
    animatedDijkstra(visitedNodesInOrder);
  }

  useEffect(() => {
    loadInitalGrid();
  }, []);

  return (
    <>
      {/* <button type="button" onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button> */}
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isFinal, isStart, isVisited } = node;
              return <Node
                key={nodeIdx}
                isStart={isStart}
                isFinal={isFinal}
                isVisited={isVisited}
              />
            })}
          </div>
        })}
      </div>
    </>
  );
}

export default PathfindingVisualizer;
