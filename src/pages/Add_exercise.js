import React, { useState } from "react";
import { UploadVideoToStorage } from "../firebase";

export const AddExercise = () => {
	return (
		<div className="Add_exercise">
			<h4>You can see new exercises here</h4>
		</div>
	);
};

export const AddExercisesOne = ({setLoader}) => {

	const [videoFile, setVideoFile] = useState(null);
	const [thumbnailFile, setThumbnailFile] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const AddVideo = (e) => {
		e.preventDefault();
		setLoader(true);
		UploadVideoToStorage(videoFile, thumbnailFile, {title:title,description:description}).then(()=>{
			setTitle('');
			setDescription('');
			setVideoFile(null);
			setThumbnailFile(null);
			setLoader(false);
			setShowAlert(true);
			setTimeout(()=>{setShowAlert(false)}, 3000);
		}).catch(()=> {
			alert('Error in uploading')
			setTitle('');
			setDescription('');
			setVideoFile(null);
			setThumbnailFile(null);
			setLoader(false);
		});
	}

	return (
		<div className="position-absolute top-50 start-50 translate-middle mt-5" >
			{
				showAlert ? <div className="alert alert-success">Exercise Added Successfully</div> : null
			}
			<h1 style={{ color: '#383838', textAlign: "center" }}>Add Exercise details</h1>
			<form onSubmit={AddVideo}>
				<div className="row justify-content-center align-items-center">
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Name of Exercise</label>
						<input type="text" value={title} className="form-control" placeholder="Push Up" onChange={(e)=>{setTitle(e.target.value)}}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Description</label>
						<input type="text" value={description} className="form-control" id="inputEmail4" placeholder="description" onChange={(e)=>{setDescription(e.target.value)}}></input>
					</div> 
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputPassword4">Video</label>
						<input type="file" ref={videoFile} accept="video/mp4" className="form-control" id="inputPassword4" onChange={(e)=>{setVideoFile(e.target.files[0])}}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Thumbnail</label>
						<input type="file" ref={thumbnailFile} accept="image/*" className="form-control" id="inputEmail4" onChange={(e)=>{setThumbnailFile(e.target.files[0])}}></input>
					</div>
				</div>
				<center>
					<button type="submit" className="submit btn btn-primary " onClick={AddVideo} >
						Submit<i className="icon-angle-right" ></i>
					</button>
				</center>
			</form>
		</div>
	);
};

export const AddExercisesTwo = ({setLoader,isSidebarOpen}) => {
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
		<div className={isSidebarOpen ? "dashboards left-marging":"dashboards"}>
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




