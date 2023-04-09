import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
  );

  
const ShowGraph = () => {
	const TEMPDATA = {
		datasets: [
		  {
			label: 'Wave 1',
			data: [
			  { x: 0, y: 1 },
			  { x: 1, y: 2 },
			  { x: 2, y: 3 },
			  { x: 3, y: 2 },
			  { x: 4, y: 1 },
			  { x: 5, y: 0 }
			],
			borderColor: 'red'
		  },
		  {
			label: 'Wave 2',
			data: [
			  { x: 0, y: 3 },
			  { x: 1, y: 2 },
			  { x: 2, y: 1 },
			  { x: 3, y: 0 },
			  { x: 4, y: 1 },
			  { x: 5, y: 2 }
			],
			borderColor: 'blue'
		  }
		]
	  };
	  const OPTIONS = {
		responsive: true,
		plugins: {
		  title: {
			display: true,
			text: 'Chart.js Line Chart',
		  },
		},
		scales: {
			y: {
			  type: 'linear',
			  display: true,
			  position: 'left',
			},
			y1: {
			  type: 'linear',
			  display: true,
			  position: 'right',
			  grid: {
				drawOnChartArea: false,
			  },
			},
		  },
	  
	  
		}
	  

return (
	<div className='text-center'>
	<h1>Show Graph Page</h1>
	<Line data={TEMPDATA} options={OPTIONS}/>
	</div>
);
};

export default ShowGraph;
