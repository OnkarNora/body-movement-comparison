import React, { useState } from "react";
import { UploadVideoToStorage } from "../firebase";
import { Dropdown, DropdownButton } from 'react-bootstrap';

export const AddExercise = () => {
	return (
		<div className="Add_exercise">
			<h4>You can see new exercises here</h4>
		</div>
	);
};

export const AddExercisesOne = ({ setLoader }) => {

	const [videoFile, setVideoFile] = useState(null);
	const [thumbnailFile, setThumbnailFile] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [selected, setSelected] = useState([]);

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

	const handleDropdownSelect = (eventKey) => {
		console.log("This is being called : ", eventKey, selected)
		if (selected.includes(eventKey)) {
			setSelected(selected.filter((key) => key !== eventKey));
		} else {
			setSelected([...selected, eventKey]);
		}
	};

	const AddVideo = (e) => {
		e.preventDefault();
		setLoader(true);
		UploadVideoToStorage(videoFile, thumbnailFile, { title: title, description: description, ImpPoints:selected }).then(() => {
			setTitle('');
			setDescription('');
			setVideoFile(null);
			setThumbnailFile(null);
			setLoader(false);
			setShowAlert(true);
			setSelected([]);
			setTimeout(() => { setShowAlert(false) }, 3000);
		}).catch(() => {
			alert('Error in uploading')
			setTitle('');
			setDescription('');
			setVideoFile(null);
			setThumbnailFile(null);
			setLoader(false);
			setSelected([]);
		});
	}

	return (
		<>
		<div className="position-absolute top-50 start-50 translate-middle mt-5" >
			{
				showAlert ? <div className="alert alert-success">Exercise Added Successfully</div> : null
			}
			<h1 style={{ color: '#383838', textAlign: "center" }}>Add Exercise details</h1>
			<form onSubmit={AddVideo}>
				<div className="row justify-content-center align-items-center">
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Name of Exercie</label>
						<input type="text" value={title} className="form-control" placeholder="Push Up" onChange={(e) => { setTitle(e.target.value) }}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Description</label>
						<input type="text" value={description} className="form-control" id="inputEmail4" placeholder="description" onChange={(e) => { setDescription(e.target.value) }}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputPassword4">Video</label>
						<input type="file" ref={videoFile} accept="video/mp4" className="form-control" id="inputPassword4" onChange={(e) => { setVideoFile(e.target.files[0]) }}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Thumbnail</label>
						<input type="file" ref={thumbnailFile} accept="image/*" className="form-control" id="inputEmail4" onChange={(e) => { setThumbnailFile(e.target.files[0]) }}></input>
					</div>
				</div>
				<DropdownButton
					id="dropdown-basic-button"
					title={selected.length ? `${selected.length} keypoints selected` : 'Select keypoints'}
					onSelect={handleDropdownSelect}
					variant="primary"
					className="my-2"
					size="sm"
					drop="up"
				>
					{keyPoints.map((keyPoint) => (
						<Dropdown.Item
							key={keyPoint}
							eventKey={keyPoint}
							active={selected.includes(keyPoint)}
							style={selected.includes(keyPoint) ? { backgroundColor: '#4caf50', color: '#fff' } : {}}
						>
							{keyPoint}
						</Dropdown.Item>
					))}
				</DropdownButton>
				<center>
					<button type="submit" className="submit btn btn-primary " onClick={AddVideo} >
						Submit<i className="icon-angle-right" ></i>
					</button>
				</center>
			</form>
		</div>
		<div style={{float: 'right', height: '100vh', display: 'flex', alignItems: 'center'}}>
			<img width={350} height={350} src="https://editor.analyticsvidhya.com/uploads/96263posnet_keypoints.png" alt="placeholder" />
		</div>
		</>
	);
};

export const AddExercisesTwo = ({setLoader}) => {
	// const [videoFile, setVideoFile] = useState(null);
	// const [thumbnailFile, setThumbnailFile] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [reason, setReason] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const AddVideo = (e) => {
		e.preventDefault();
		setLoader(true);
		// UploadVideoToStorage(videoFile, thumbnailFile, {title:title,description:description}).then(()=>{
		UploadVideoToStorage({title:title,description:description,reason:reason}).then(()=>{
			setTitle('');
			setReason('');
			setDescription('');
			// setVideoFile(null);
			// setThumbnailFile(null);
			setLoader(false);
			setShowAlert(true);
			setTimeout(()=>{setShowAlert(false)}, 3000);
		}).catch(()=> {
			alert('Error in uploading')
			setTitle('');
			setReason('');
			setDescription('');
			// setVideoFile(null);
			// setThumbnailFile(null);
			setLoader(false);
		});
	}
	return (
		<div >
			{/* <h1>Recommended videos</h1> */}
			<div className="position-absolute top-50 start-50 translate-middle mt-5" >
			{
				showAlert ? <div className="alert alert-success">We will look at your Recommendation soon ..Thanks for your Recommendation</div> : null
			}
			<h1 style={{ color: '#383838', textAlign: "center" }}>Recommend us to improve your experience</h1>
			<form onSubmit={AddVideo}>
				<div className="row justify-content-center align-items-center">
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Name of Exercise</label>
						<input type="text" value={title} className="form-control" placeholder="Push Up" onChange={(e)=>{setTitle(e.target.value)}}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">What needs to improve</label>
						<input type="text" value={description} className="form-control" id="inputEmail4" placeholder="Recommendation" onChange={(e)=>{setDescription(e.target.value)}}></input>
					</div> 
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Reason</label>
						<input type="text" value={reason} className="form-control" id="inputEmail4" placeholder="reason" onChange={(e)=>{setReason(e.target.value)}}></input>
					</div> 

				</div>
				<center>
					<button type="submit" className="submit btn btn-primary " onClick={AddVideo} >
						Submit<i className="icon-angle-right" ></i>
					</button>
				</center>
			</form>
		</div>
			
		</div>
	);
};




