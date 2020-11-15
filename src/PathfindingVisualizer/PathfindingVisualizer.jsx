import React, { useState, useEffect } from 'react';
import { dijkstra } from '../Algorithms/Dijkstra';
import Node from './Node/Node';
import './PathfindingVisualizer.css';

const START_NODE_COL = 15;
const START_NODE_ROW = 7;
const FINAL_NODE_COL = 35;
const FINAL_NODE_ROW = 7;

function PathfindingVisualizer() {

  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

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
      if (i === visitedNodesInOrder.lenght) {
        setTimeout(() => {
          // animatedShortestPath(nodesInShortestPath);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 25 * i);

    }
  }

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = grid[FINAL_NODE_ROW][FINAL_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, targetNode);
    animatedDijkstra(visitedNodesInOrder);
  }

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) {
      return;
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  }

  useEffect(() => {
    loadInitalGrid();
  }, []);

  return (
    <>
      <button type="button" onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isFinal, isStart, isWall } = node;
              return <Node
                key={nodeIdx}
                row={row}
                col={col}
                isStart={isStart}
                isFinal={isFinal}
                isWall={isWall}
                mouseIsPressed={mouseIsPressed}
                onMouseDown={(row, col) => handleMouseDown(row, col)}
                onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                onMouseUp={() => handleMouseUp()}
              />
            })}
          </div>
        })}
      </div>
    </>
  );
}

export default PathfindingVisualizer;
