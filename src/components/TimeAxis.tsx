// src/TimeAxis.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TimeAxisProps {
  width: number;
  height: number;
}

const TimeAxis: React.FC<TimeAxisProps> = ({ width, height }) => {
  const axisRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (axisRef.current) {
      const x = d3
        .scaleTime()
        .domain([new Date(2024, 7, 1), new Date(2025, 1, 1)]) // Aug 1, 2024 to Dec 31, 2024
        .range([0, width]);

      const axis = d3
        .axisBottom(x)
        .ticks(d3.timeDay.every(1))
        .tickSize(8)
        .tickFormat((date) => {
          console.log('date', date, d3.timeFormat(date));

          const day = date.getDate();

          return day === 1 ? d3.timeFormat('%B')(date) : d3.timeFormat('')(date);
        });

      const axisGroup = d3.select(axisRef.current).call(axis);

      // Custom tick styles
      axisGroup
        .selectAll('.tick line')
        .style('stroke', (d: Date) => (d.getDate() === 1 ? 'black' : 'gray'))
        .attr('y2', (d: Date) => (d.getDate() === 1 ? 12 : 8));

      axisGroup
        .selectAll('.tick text')
        .style('fill', (d: Date) => (d.getDate() === 1 ? 'black' : 'gray'))
        .attr('text-anchor', (d: Date) => (d.getDate() === 1 ? 'middle' : 'middle'))
        .attr('dy', (d: Date) => (d.getDate() === 1 ? '10' : '0')); // Add spacing for month labels
    }
  }, [width, height]);

  return (
    <svg
      width={width}
      height={height}
    >
      <g ref={axisRef} />
    </svg>
  );
};

export default TimeAxis;
