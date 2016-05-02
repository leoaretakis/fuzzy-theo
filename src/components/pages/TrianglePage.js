import React from 'react';
import { LineChart } from 'react-d3-basic';
import { TriangularFS } from 'fuzzy-theo';

const TrianglePage = () => {

  const fs = new TriangularFS(20,40, 60);

  const chartData = [];
  for (let i = 0; i < 81; i = i + 5) {
    chartData.push({
      x: i,
      y: fs.membershipGrade(i),
    });
  }

  return (
    <section>
      <LineChart
        showXGrid= {false}
        showYGrid= {false}
        margins={{left: 40, right: 40, top: 40, bottom: 40}}
        data={chartData}
        width={600}
        height={280}
        chartSeries={[{ field: 'y', color: '#ff7f0e' }]}
        x={(d) => d.x}
      />
    </section>
  );
};

export default TrianglePage;
