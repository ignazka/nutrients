import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function Chart({ nutrients }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const chartData = {
    labels: ['fat', 'fiber', 'carbs', 'proteins'],
    datasets: [
      {
        label: '# of Votes',
        data: [
          [nutrients][0][0].fat,
          [nutrients][0][1].fiber,
          [nutrients][0][2].carbs,
          [nutrients][0][3].proteins,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='ctn-chart'>
      <Pie data={chartData} />
    </div>
  );
}

export default Chart;
