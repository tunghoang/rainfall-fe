// src/TimeAxis.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface TimeAxisProps {
  startDate: Date;
  endDate: Date;
}

const TimeAxis: React.FC<TimeAxisProps> = ({ startDate, endDate }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth((window.innerWidth * 5) / 6);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const axisRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    if (axisRef.current) {
      const x = d3.scaleTime().domain([startDate, endDate]).range([0, width]);

      const axis = d3.axisBottom(x);

      d3.select(axisRef.current).call(axis).selectAll('text').style('font-size', '14px'); // Apply font-size style here

      // const axis = d3
      // .axisBottom(x)
      // .ticks(d3.timeDay.every(1))
      // .tickSize(8);
      // .tickFormat((date) => {
      //   console.log('date', date, d3.timeFormat(date));

      //   const day = date.getDate();

      //   return day === 1 ? d3.timeFormat('%B')(date) : d3.timeFormat('')(date);
      // });

      // const axisGroup = d3.select(axisRef.current).call(axis);

      // Custom tick styles
      // axisGroup
      //   .selectAll('.tick line')
      //   .style('stroke', (d: Date) => (d.getDate() === 1 ? 'black' : 'gray'))
      //   .attr('y2', (d: Date) => (d.getDate() === 1 ? 12 : 8));

      // axisGroup
      //   .selectAll('.tick text')
      //   .style('fill', (d: Date) => (d.getDate() === 1 ? 'black' : 'gray'))
      //   .attr('text-anchor', (d: Date) => (d.getDate() === 1 ? 'middle' : 'middle'))
      //   .attr('dy', (d: Date) => (d.getDate() === 1 ? '10' : '0')); // Add spacing for month labels
    }
  }, [width]);

  return (
    <svg
      width='100%'
      height={32}
    >
      <g ref={axisRef} />
    </svg>
  );
};

export default TimeAxis;
