import React, { useState } from 'react';
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { DashboardsOne, DashboardTwo, DashboardThree, DashboardFour } from "./pages/Dashboards";
import Contact from "./pages/ContactUs";
import { ContributesOne, ContributesTwo } from "./pages/Contribute";
import { AddExercisesOne, AddExercisesTwo } from "./pages/Add_exercise";
import { ExploreFour, ExploreOne, ExploreThree, ExploreTwo } from "./pages/Explore";
import Method from "./VideoSpecifics/Method";
import ShowGraph from "./pages/ShowGraph";
import model_video from './model_videos/aniket_hands_up_4.mp4'
function App() {

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	return (
		<Router>
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Routes>
				<Route path='/contact' element={<Contact isSidebarOpen={isSidebarOpen} />} />
				<Route path='/dashboard' element={<DashboardsOne isSidebarOpen={isSidebarOpen} />} />
				<Route path='/explore/explore1' element={<ExploreOne isSidebarOpen={isSidebarOpen} />} />
				<Route path='/explore/explore2' element={<ExploreTwo isSidebarOpen={isSidebarOpen} />} />
				<Route path='/explore/explore3' element={<ExploreThree isSidebarOpen={isSidebarOpen} />} />
				<Route path='/explore/explore4' element={<ExploreFour isSidebarOpen={isSidebarOpen} />} />
				<Route path='/contribute/contribute1' element={<ContributesOne isSidebarOpen={isSidebarOpen} />} />
				<Route path='/contribute/contribute2' element={<ContributesTwo isSidebarOpen={isSidebarOpen} />} />
				<Route path='/addexercise/addexercise1' element={<AddExercisesOne isSidebarOpen={isSidebarOpen} />} />
				<Route path='/addexercise/addexercise2' element={<AddExercisesTwo isSidebarOpen={isSidebarOpen} />} />
				<Route path='/process/video' element={<Method isSidebarOpen={isSidebarOpen} model_video={model_video} />} />
				<Route path='/process/showgraph' element={<ShowGraph isSidebarOpen={isSidebarOpen} />} />
				<Route exact path='/' element={<Home isSidebarOpen={isSidebarOpen} />} />
			</Routes>
		</Router>
	);
}

// <Method model_video={model_video} />

export default App;
