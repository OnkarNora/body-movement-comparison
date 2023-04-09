import React from "react";
import {  Space, Table, Tag  } from 'antd';
import { Line } from 'react-chartjs-2';
const Analysis = ({input_data}) => {
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
		scales: {
		  xAxes: [
			{
			  type: 'linear',
			  position: 'bottom',
			  ticks: {
				stepSize: 1,
				min: 0,
				max: 5
			  }
			}
		  ],
		  yAxes: [
			{
			  type: 'linear',
			  ticks: {
				stepSize: 1,
				min: 0,
				max: 3
			  }
			}
		  ]
		}
	  };
	  
	const columns = [
		{
		  title: 'Name',
		  dataIndex: 'name',
		  key: 'name',
		  render: (text) => <a>{text}</a>,
		},
		{
		  title: 'Score',
		  dataIndex: 'score',
		  key: 'score',
		},
		{
		  title: 'Tags',
		  key: 'tags',
		  dataIndex: 'tags',
		  render: (_, { tags }) => (
			<>
			  {tags.map((tag) => {
				let color = 'green';
				return (
				  <Tag color={color} key={tag}>
					{tag.toUpperCase()}
				  </Tag>
				);
			  })}
			</>
		  ),
		},
	  ];
	  const bodyParts = ["nose","leftEye","rightEye","leftEar","rightEar","leftShoulder","rightShoulder","leftElbow","rightElbow","leftWrist","rightWrist","leftHip","rightHip","leftKnee","rightKnee","leftAnkle","rightAnkle"]
	  const data = [];
	  for (let i in bodyParts){
		data.push({
			key: i,
			name: bodyParts[i],
			score: input_data[i],
			tags: ['nice'],
		  })
	  }
	  console.log("input data; :",input_data)
	  

return (
	<div className='text-center'>
	<h1>Analysis Page</h1>
	{/* <p>{input_data}</p> */}
	<Table columns={columns} dataSource={data} />
	<Line data={TEMPDATA} options={OPTIONS}/>
	<h4>Total Score : {input_data[17]}</h4>
	</div>
);
};

export default Analysis;
