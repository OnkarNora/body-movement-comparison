import React, { useState } from 'react';
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { DashboardsOne, DashboardTwo, DashboardThree, DashboardFour } from "./pages/Dashboards";
import Contact from "./pages/ContactUs";
import Login from "./pages/Login";
import { ContributesOne, ContributesTwo } from "./pages/Contribute";
import { AddExercisesOne, AddExercisesTwo } from "./pages/Add_exercise";
import { ExploreFour, ExploreOne, ExploreThree, ExploreTwo } from "./pages/Explore";
import Method from "./VideoSpecifics/Method";
import ShowGraph from "./pages/ShowGraph";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from './components/LoadingScreen';

function App() {

	const [user, loading, error] = useAuthState(auth);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [loader, setLoader] = useState(false);
	const [modalVideo, setModalVideo] = useState(null);

	return (
		<Router>
			<Sidebar
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			{
				loader || loading ? <LoadingScreen /> : null
			}
			<Routes>
				<Route path='/login' element={<Login setLoader={setLoader} />} />
				<Route path='/contact' element={<Contact isSidebarOpen={isSidebarOpen} />} />
				<Route path='/dashboard' element={<DashboardsOne isSidebarOpen={isSidebarOpen} />} />
				<Route path='/explore/explore1' element={<ExploreOne setModalVideo={setModalVideo} setLoader={setLoader} isSidebarOpen={isSidebarOpen} />} />
				<Route path='/explore/explore2' element={<ExploreTwo setModalVideo={setModalVideo} setLoader={setLoader} isSidebarOpen={isSidebarOpen} />} />
				<Route path='/explore/explore3' element={<ExploreThree setModalVideo={setModalVideo} setLoader={setLoader} isSidebarOpen={isSidebarOpen} />} />
				<Route path='/explore/explore4' element={<ExploreFour setModalVideo={setModalVideo} setLoader={setLoader} isSidebarOpen={isSidebarOpen} />} />
				<Route path='/contribute/contribute1' element={<ContributesOne setLoader={setLoader} isSidebarOpen={isSidebarOpen} />} />
				<Route path='/contribute/contribute2' element={<ContributesTwo setLoader={setLoader} />} />
				<Route path='/addexercise/addexercise1' element={<AddExercisesOne setLoader={setLoader} isSidebarOpen={isSidebarOpen} />} />
				<Route path='/addexercise/addexercise2' element={<AddExercisesTwo setLoader={setLoader} />} />
				<Route path='/process/video' element={<Method isSidebarOpen={isSidebarOpen} model_video={modalVideo} />} />
				<Route path='/process/showgraph' element={<ShowGraph isSidebarOpen={isSidebarOpen} />} />
				<Route exact path='/' element={<Home isSidebarOpen={isSidebarOpen} />} />
			</Routes>
		</Router>
	);
}

export default App;
