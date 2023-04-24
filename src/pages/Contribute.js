import React, { useState }  from "react";
import { UploadVideoToStorage } from "../firebase";
export const Contribute = () => {
	return (
		<div className="Contribute">
			<h4>You are in contribute page here you can add your own exercise videos for reviews and can also report about particular exercise</h4>
		</div>
	);
};

export const ContributesOne = ({setLoader}) => {

	const [videoFile, setVideoFile] = useState(null);
	const [thumbnailFile, setThumbnailFile] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const AddVideo = (e) => {
		e.preventDefault();
		setLoader(true);
		UploadVideoToStorage(videoFile, thumbnailFile, { title: title, description: description }).then(() => {
			setTitle('');
			setDescription('');
			setVideoFile(null);
			setThumbnailFile(null);
			setLoader(false);
			setShowAlert(true);
			setTimeout(() => { setShowAlert(false) }, 3000);
		}).catch(() => {
			alert('Error in uploading')
			setTitle('');
			setDescription('');
			setVideoFile(null);
			setThumbnailFile(null);
			setLoader(false);
		});
	}
	return (
		// <div className="Contribute">
		// <h1>Upload your video for review</h1>
		// </div>
		<div className="position-absolute top-50 start-50 translate-middle mt-5" >
			{
				showAlert ? <div className="alert alert-success">Exercise Added Successfully</div> : null
			}
			<h1 style={{ color: '#383838', textAlign: "center" }}>Add Standard Exercise</h1>
			<form onSubmit={AddVideo}>
				<div className="row justify-content-center align-items-center">
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Name of Exercise</label>
						<input type="text" value={title} className="form-control" placeholder="Push Up" onChange={(e) => { setTitle(e.target.value) }}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Description</label>
						<input type="text" value={description} className="form-control" id="inputEmail4" placeholder="description" onChange={(e) => { setDescription(e.target.value) }}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputPassword4">Upload your standard video</label>
						<input type="file" ref={videoFile} accept="video/mp4" className="form-control" id="inputPassword4" onChange={(e) => { setVideoFile(e.target.files[0]) }}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Thumbnail</label>
						<input type="file" ref={thumbnailFile} accept="image/*" className="form-control" id="inputEmail4" onChange={(e) => { setThumbnailFile(e.target.files[0]) }}></input>
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

export const ContributesTwo = ({setLoader}) => {
	// return (
	// 	<div className="Contribute">
	// 		<h1>Report page</h1>
	// 	</div>
	// );
	// const [videoFile, setVideoFile] = useState(null);
	// const [thumbnailFile, setThumbnailFile] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [Suggestions, setSuggestions] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const AddVideo = (e) => {
		e.preventDefault();
		setLoader(true);
		// UploadVideoToStorage(videoFile, thumbnailFile, {title:title,description:description}).then(()=>{
		UploadVideoToStorage({title:title,description:description,Suggestions:Suggestions}).then(()=>{
			setTitle('');
			setSuggestions('');
			setDescription('');
			// setVideoFile(null);
			// setThumbnailFile(null);
			setLoader(false);
			setShowAlert(true);
			setTimeout(()=>{setShowAlert(false)}, 3000);
		}).catch(()=> {
			alert('Error in uploading')
			setTitle('');
			setSuggestions('');
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
				showAlert ? <div className="alert alert-success">We will get back to you soon ..</div> : null
			}
			<h1 style={{ color: '#383838', textAlign: "center" }}>Report Page</h1>
			<form onSubmit={AddVideo}>
				<div className="row justify-content-center align-items-center">
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Name of Exercise</label>
						<input type="text" value={title} className="form-control" placeholder="e.g. Push Up" onChange={(e)=>{setTitle(e.target.value)}}></input>
					</div>
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Describe the issue</label>
						<input type="text" value={description} className="form-control" id="inputEmail4" placeholder="description" onChange={(e)=>{setDescription(e.target.value)}}></input>
					</div> 
					<div className="form-group col-md-12 m-3">
						<label htmlFor="inputEmail4">Suggestions</label>
						<input type="text" value={Suggestions} className="form-control" id="inputEmail4" placeholder="Suggestions" onChange={(e)=>{setSuggestions(e.target.value)}}></input>
					</div> 

				</div>
				<center>
					<button type="submit" className="submit btn btn-primary " onClick={AddVideo} >
						Report<i className="icon-angle-right" ></i>
					</button>
				</center>
			</form>
		</div>
			
		</div>
	);
};


