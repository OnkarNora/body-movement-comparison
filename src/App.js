import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AboutUs, OurAim, OurVision } from "./pages/AboutUs";
import {
Services,
ServicesOne,
ServicesTwo,
ServicesThree,
} from "./pages/Services";
import { Dashboards, DashboardsOne, DashboardTwo, DashboardThree, DashboardFour } from "./pages/Dashboards";
import Contact from "./pages/ContactUs";
import {Contribute, ContributesOne, ContributesTwo } from "./pages/Contribute";
import Analysis from "./pages/Analysis";
import { AddExercise, AddExercisesOne, AddExercisesTwo } from "./pages/Add_exercise";
import { Explore, ExploreFour, ExploreOne, ExploreThree, ExploreTwo } from "./pages/Explore";
import Method from "./VideoSpecifics/Method";
import  ShowGraph from "./pages/ShowGraph";
import model_video from './model_videos/aniket_hands_up_4.mp4'
function App() {
return (
	<Router>
	<Sidebar />
	<Routes>
		<Route path='/about-us' element={<AboutUs/>} />
		<Route path='/about-us/aim' element={<OurAim/>} />
		<Route path='/about-us/vision' element={<OurVision/>} />
		<Route path='/services' element={<Services/>} />
		<Route path='/services/services1' element={<ServicesOne/>} />
		<Route path='/services/services2' element={<ServicesTwo/>} />
		<Route path='/services/services3' element={<ServicesThree/>} />
		<Route path='/contact' element={<Contact/>} />
		<Route path='/Dashboard' element={<Dashboards/>} />
		<Route path='/dashboard/dashboard1' element={<DashboardsOne/>} />
		<Route path='/dashboard/dashboard2' element={<DashboardTwo/>} />
		<Route path='/dashboard/dashboard3' element={<DashboardThree/>} />
		<Route path='/dashboard/dashboard4' element={<DashboardFour/>} />
		<Route path='/explore' element={<Explore/>} />
		<Route path='/explore/explore1' element={<ExploreOne/>} />
		<Route path='/explore/explore2' element={<ExploreTwo/>} />
		<Route path='/explore/explore3' element={<ExploreThree/>} />
		<Route path='/explore/explore4' element={<ExploreFour/>} />
		<Route path='/contribute' element={<Contribute/>} />
		<Route path='/contribute/contribute1' element={<ContributesOne/>} />
		<Route path='/contribute/contribute2' element={<ContributesTwo/>} />
		<Route path='/addexercise' element={<AddExercise/>} />
		<Route path='/addexercise/addexercise1' element={<AddExercisesOne/>} />
		<Route path='/addexercise/addexercise2' element={<AddExercisesTwo/>} />
		<Route path='/analysis' element={<Analysis/>} />
		<Route path='/process/video' element={<Method model_video={model_video} />} />
		<Route path='/process/showgraph' element={<ShowGraph  />} />
	</Routes>
	</Router>
);
}

// <Method model_video={model_video} />

export default App;
