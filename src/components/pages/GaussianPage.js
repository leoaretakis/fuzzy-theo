import React from 'react';
import { LineChart } from 'react-d3-basic';
import { GaussianFS } from 'fuzzy-theo';

const GuassianPage = () => {
  const fs = new GaussianFS(50, 20);

  const chartData = [];
  for (let i = 0; i <= 100; i = i + 1) {
    chartData.push({ x: i, y: fs.membershipGrade(i) });
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

export default GuassianPage;
