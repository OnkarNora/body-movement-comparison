import React, { useState, useEffect } from "react";
import { Table, Tag } from 'antd';
import { Line } from 'react-chartjs-2';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Analysis = ({ scoreData, modalPoints, inputData, modelData }) => {

	const [poseDataCombined, setPoseDataCombined] = useState();
	const [data, setData] = useState();
	const [maxLength, setmaxLength] = useState();
	const [options, setOptions] = useState();
	const [selectedKeypoint, setSelectedKeypoint] = useState('rightShoulder');

	const keyPoints = [
		'nose',
		'leftEye',
		'rightEye',
		'leftEar',
		'rightEar',
		'leftShoulder',
		'rightShoulder',
		'leftElbow',
		'rightElbow',
		'leftWrist',
		'rightWrist',
		'leftHip',
		'rightHip',
		'leftKnee',
		'rightKnee',
		'leftAnkle',
		'rightAnkle'
	];

	useEffect(() => {
		const poseLength = inputData.length;
		const standardPoseLength = modelData.length;
		setmaxLength(Math.min(poseLength, standardPoseLength));
		const maxLengthLocal = Math.min(poseLength, standardPoseLength)
		if (poseLength && standardPoseLength && inputData && modelData) {
			const combinedPoseData = [];
			for (let i = 0; i < maxLengthLocal; i++) {
				combinedPoseData.push({
					frame: i + 1,
					...inputData[i].keypoints.reduce((acc, kp) => {
						acc[kp.part] = kp.position.y;
						return acc;
					}, {}),
					...modelData[i].keypoints.reduce((acc, kp) => {
						acc[`std_${kp.part}`] = kp.position.y;
						return acc;
					}, {})
				});
			}
			setPoseDataCombined(combinedPoseData);
		}
	}, [inputData, modelData, selectedKeypoint])

	useEffect(() => {
		if (poseDataCombined) {
			setData({
				labels: [...Array(maxLength).keys()].map((i) => i + 1),
				datasets: [
					{
						label: "Input Video",
						data: poseDataCombined.map((d) => ({ x: d.frame, y: d[selectedKeypoint] })),
						borderColor: "rgba(255, 99, 132, 1)",
						fill: false
					},
					{
						label: "Model Video",
						data: poseDataCombined.map((d) => ({ x: d.frame, y: d['std_' + selectedKeypoint] })),
						borderColor: "rgba(54, 162, 235, 1)",
						fill: false
					}
				]
			});
		}
	}, [poseDataCombined])

	useEffect(() => {
		setOptions({
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Chart.js Line Chart (' + selectedKeypoint + ')',
				},
			},
		})
	}, [selectedKeypoint])

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
						let color;
						if (tag === 'nice') {
							color = 'green';
						}
						if (tag === 'average') {
							color = 'yellow';
						}
						if (tag === 'poor') {
							color = 'red';
						}
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
	const bodyParts = modalPoints ? modalPoints : ["nose", "leftEye", "rightEye", "leftEar", "rightEar", "leftShoulder", "rightShoulder", "leftElbow", "rightElbow", "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"]
	const statusData = [];
	for (let i in bodyParts) {
		statusData.push({
			key: i,
			name: bodyParts[i],
			score: scoreData[i].toFixed(2),
			tags: scoreData[i] > 75 ? ['nice'] : scoreData[i] > 50 ? ['average'] : ['poor'],
		})
	}

	const handleDropdownSelect = (eventKey) => {
		setSelectedKeypoint(eventKey)
	};

	return (
		<div className='text-center'>
			<Table columns={columns} dataSource={statusData} />
			{/* <Line data={TEMPDATA} options={OPTIONS}/> */}
			{data && <Line data={data} options={options} />}
			<div style={{ height: '70px' }}>
				<h4 style={{display:'inline'}}>
					Total Score : {scoreData[scoreData.length - 1].toFixed(2)}
					<Tag
						color={scoreData[scoreData.length - 1] > 75 ? 'green' : scoreData[scoreData.length - 1] > 50 ? 'yellow' : 'red'}
						className="mx-3
				"
					>
						{scoreData[scoreData.length - 1] > 75 ? 'Nice' : scoreData[scoreData.length - 1] > 50 ? 'Average' : 'Poor'}
					</Tag>
				</h4>
				<DropdownButton
				id="dropdown-basic-button"
				title={`${selectedKeypoint}`}
				onSelect={handleDropdownSelect}
				variant="info"
				className="my-2"
				size="sm"
				drop="up"
				style={{display:'inline'}}
			>
				{keyPoints.map((keyPoint) => (
					<Dropdown.Item
						key={keyPoint}
						eventKey={keyPoint}
						active={selectedKeypoint === keyPoint}
						style={selectedKeypoint === keyPoint ? { backgroundColor: '#4caf50', color: '#fff' } : {}}
					>
						{keyPoint}
					</Dropdown.Item>
				))}
			</DropdownButton>
			</div>
			
		</div>
	);
};

export default Analysis;
