import React, { useEffect, useState } from "react";
import CustomCard from "../components/CustomCard";
import { videos } from '../VideoSpecifics/videos';
import { fetchPosesData } from "../firebase";

import Carousel from 'carousel-react-rcdev'
export const ExploreOne = ({ isSidebarOpen, setLoader, setModalVideo }) => {

	const [posesData, setPosesData] = useState([]);

	useEffect(() => {
		setLoader(true);
		fetchPosesData().then((data) => { setPosesData(data); setLoader(false) })
	}, []);

	useEffect(() => {
		console.log(posesData)
	}, [posesData]);

	return (
		<div className={isSidebarOpen ? "explore left-marging" : "explore"}>
			{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
		</div>
	);
};

export const ExploreTwo = ({ isSidebarOpen, setLoader, setModalVideo }) => {
	const [posesData, setPosesData] = useState([]);

	useEffect(() => {
		setLoader(true);
		fetchPosesData().then((data) => { setPosesData(data); setLoader(false) })
	}, []);

	useEffect(() => {
		console.log(posesData)
	}, [posesData]);

	return (
		<div className={isSidebarOpen ? "explore left-marging" : "explore"}>
			<h1>New added videos</h1>
			<h3>Here you will see all latest exercises we added to our website</h3>
			<Carousel>
				{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
				{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
			</Carousel>
		</div>
	);
};
export const ExploreThree = ({ isSidebarOpen, setLoader, setModalVideo }) => {
	const [posesData, setPosesData] = useState([]);

	useEffect(() => {
		setLoader(true);
		fetchPosesData().then((data) => { setPosesData(data); setLoader(false) })
	}, []);

	useEffect(() => {
		console.log(posesData)
	}, [posesData]);

	return (
		<div className={isSidebarOpen ? "explore left-marging" : "explore"}>
			<h1>This includes different exercise in one package explore any one and do combination of exercises together</h1>
			<div>
				<Carousel>
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
				</Carousel>
			</div>
		</div>
	);
};
export const ExploreFour = ({ isSidebarOpen, setLoader, setModalVideo }) => {
	const [posesData, setPosesData] = useState([]);

	useEffect(() => {
		setLoader(true);
		fetchPosesData().then((data) => { setPosesData(data); setLoader(false) })
	}, []);

	useEffect(() => {
		console.log(posesData)
	}, [posesData]);

	return (
		<div className={isSidebarOpen ? "explore left-marging" : "explore"}>
			<h1>All exercises</h1>
			<h1>Ongoing exercise</h1>
			<div>
				<Carousel>
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
				</Carousel>
			</div>

			<h1>Upcoming exercise</h1>
			<div>
				<Carousel>
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
				</Carousel>
			</div>
			<h1>Past exercise</h1>
			<div>
				<Carousel>
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
				</Carousel>
			</div>
		</div>
	);
};