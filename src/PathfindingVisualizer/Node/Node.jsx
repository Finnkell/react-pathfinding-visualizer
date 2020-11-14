import React, { useEffect, useState } from 'react';
import './Node.css';

function Node(props) {

  const [col, setCol] = useState(0);
  const [row, setRow] = useState(0);
  const [isStart, setIsStart] = useState();
  const [isFinal, setIsFinal] = useState();

  const getProps = () => {
    setIsFinal(props.isFinal);
    setIsStart(props.isStart);
  }

  useEffect(() => {
    getProps();
  }, []);

  const extraClassName = isFinal ? 'node-finish' : isStart ? 'node-start' : '';

  return (
    <div className={`node ${extraClassName}`}>

    </div>
  );
}

export default Node;