// src/XAxis.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface XAxisProps {
  width: number;
  height: number;
}

const XAxis: React.FC<XAxisProps> = ({ width, height }) => {
  const axisRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (axisRef.current) {
      const x = d3.scaleLinear().domain([0, 100]).range([0, width]);
      const axis = d3.axisBottom(x).tickValues([1, 2, 3, 5, 8, 13, 21, 23, 40, 50, 100]);

      d3.select(axisRef.current).call(axis);
    }
  }, [width, height]);

  return (
    <svg
      width={width}
      height={height}
    >
      <g
        ref={axisRef}
        transform={`translate(0, ${height - 30})`}
      />
    </svg>
  );
};

export default XAxis;
