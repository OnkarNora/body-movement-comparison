import React from "react";
import CustomCard from "../components/CustomCard";
import {videos} from '../VideoSpecifics/videos';
export const Explore = () => {
return (
	<div className="Dashboards">
	<h1>Explore Page</h1>
	</div>
);
};

export const ExploreOne = () => {
return (
	<div className="Dashboards">
		{videos.map((val,idx)=>{return (<CustomCard img={val.img} title={val.title} description={val.description} id={idx} />)})}
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