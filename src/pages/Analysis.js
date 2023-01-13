import React from "react";
import {  Space, Table, Tag  } from 'antd';
const Analysis = ({input_data}) => {
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
	<h4>Total Score : {input_data[17]}</h4>
	</div>
);
};

export default Analysis;
