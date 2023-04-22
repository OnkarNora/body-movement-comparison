import React from "react";
import {videos} from '../VideoSpecifics/videos';
import CustomCard from "../components/CustomCard";
import Carousel from 'carousel-react-rcdev'

export const Dashboards = () => {
return (
	<div className="Dashboards">
	<h1>Dashboards Page</h1>
	</div>
);
};

export const DashboardsOne = ({isSidebarOpen}) => {
return (
	<div className={isSidebarOpen ? "dashboards left-marging":"dashboards"}>
	<h1>Ongoing exercise</h1>
	<div>
	<Carousel>
		{videos.map((val,idx)=>{return (<CustomCard img={val.img} title={val.title} description={val.description} id={idx} />)})}
		{videos.map((val,idx)=>{return (<CustomCard img={val.img} title={val.title} description={val.description} id={idx} />)})}
    </Carousel>
	</div>

	<h1>Upcoming exercise</h1>
	<div>
	<Carousel>
		{videos.map((val,idx)=>{return (<CustomCard img={val.img} title={val.title} description={val.description} id={idx} />)})}
		{videos.map((val,idx)=>{return (<CustomCard img={val.img} title={val.title} description={val.description} id={idx} />)})}
    </Carousel>
	</div>

	</div>
);
};

export const DashboardTwo = () => {
return (
	<div className="Dashboards">
	<h1>Upcoming exercise</h1>
	</div>
);
};
export const DashboardThree = () => {
return (
	<div className="Dashboards">
	<h1>Past exercise</h1>
	</div>
);
};
export const DashboardFour = () => {
return (
	<div className="Dashboards">
	<h1>Recommended exercise</h1>
	</div>
);
};
