import React, { useEffect, useState } from "react";
import CustomCard from "../components/CustomCard";
import { videos } from '../VideoSpecifics/videos';
import { fetchPosesData } from "../firebase";

export const ExploreOne = ({ isSidebarOpen, setLoader, setModalVideo }) => {

	const [posesData, setPosesData] = useState([]);

	useEffect(() => {
		setLoader(true);
		fetchPosesData().then((data) => {setPosesData(data);setLoader(false)})
	},[]);

	useEffect(() => {
		console.log(posesData)
	},[posesData]);

	return (
		<div className={isSidebarOpen ? "explore left-marging" : "explore"}>
			{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} id={idx} />) })}
		</div>
	);
};

export const ExploreTwo = () => {
	return (
		<div className="Dashboards">
			<h1>New addded videos</h1>
		</div>
	);
};
export const ExploreThree = () => {
	return (
		<div className="Dashboards">
			<h1>Here you will see full body exercise or weight reduction exercises</h1>
		</div>
	);
};
export const ExploreFour = () => {
	return (
		<div className="Dashboards">
			<h1>All exercises</h1>
		</div>
	);
};