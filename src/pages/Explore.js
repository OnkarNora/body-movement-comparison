import React, { useEffect, useState, useRef } from "react";
import CustomCard from "../components/CustomCard";
import { fetchPosesData } from "../firebase";
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons'

export const ExploreOne = ({ isSidebarOpen, setLoader, setModalVideo, setModalPoints }) => {

	const [posesData, setPosesData] = useState([]);
	const cardsContainerRef = useRef(null);
	const [translateValue, setTranslateValue] = useState(0);
	const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState('disb');
	const [isNextButtonDisabled, setIsNextButtonDisabled] = useState('');
	
	const handlePrevClick = () => {
		setTranslateValue(translateValue + 50);
	};

	const handleNextClick = () => {
		console.log("cardsContainerRef",cardsContainerRef)
		setTranslateValue(translateValue - 50);
	};

	useEffect(() => {
		if (translateValue === 0){
			setIsPrevButtonDisabled('disb');
		} else {
			setIsPrevButtonDisabled('');
		}
		if (cardsContainerRef?.current.clientWidth + (-(translateValue)) >=  (240  * posesData.length) ){
			setIsNextButtonDisabled('disb');
		} else {
			setIsNextButtonDisabled('');	
		}
	}, [translateValue, posesData]);

	useEffect(() => {
		setLoader(true);
		fetchPosesData().then((data) => { setPosesData(data); setLoader(false) })
	}, []);

	return (
		<div className={isSidebarOpen ? "explore left-marging" : "explore"}>
			<h3>Explore All Exercises here</h3>
			<button className={"prev-btn " + isPrevButtonDisabled} onClick={handlePrevClick}><CaretLeftOutlined  /></button>
			<div className="card-container" style={{ transform: `translateX(${translateValue}%)` }} ref={cardsContainerRef}>
				{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} setModalPoints={setModalPoints} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} impPoints={val.impPoints} id={idx} />) })}
			</div>
			<button className={"next-btn " + isNextButtonDisabled}  onClick={handleNextClick} ><CaretRightOutlined  /></button>
		</div>
	);
};

export const ExploreTwo = ({ isSidebarOpen, setLoader, setModalVideo, setModalPoints }) => {

	const [posesData, setPosesData] = useState([]);
	const cardsContainerRef = useRef(null);
	const [translateValue, setTranslateValue] = useState(0);
	const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState('disb');
	const [isNextButtonDisabled, setIsNextButtonDisabled] = useState('');
	
	const handlePrevClick = () => {
		setTranslateValue(translateValue + 50);
	};

	const handleNextClick = () => {
		console.log("cardsContainerRef",cardsContainerRef)
		setTranslateValue(translateValue - 50);
	};

	useEffect(() => {
		if (translateValue === 0){
			setIsPrevButtonDisabled('disb');
		} else {
			setIsPrevButtonDisabled('');
		}
		if (cardsContainerRef?.current.clientWidth + (-(translateValue)) >=  (240  * posesData.length) ){
			setIsNextButtonDisabled('disb');
		} else {
			setIsNextButtonDisabled('');	
		}
	}, [translateValue, posesData]);

	useEffect(() => {
		setLoader(true);
		fetchPosesData().then((data) => { setPosesData(data); setLoader(false) })
	}, []);


	return (
		<div className={isSidebarOpen ? "explore left-marging" : "explore"}>
			<h3>New added videos</h3>
			<h3>Here you will see all latest exercises we added to our website</h3>
			<div>
				<button className={"prev-btn " + isPrevButtonDisabled} onClick={handlePrevClick}><CaretLeftOutlined  /></button>
				<div className="card-container" style={{ transform: `translateX(${translateValue}%)` }} ref={cardsContainerRef}>
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} setModalPoints={setModalPoints} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} impPoints={val.impPoints} id={idx} />) })}
				</div>
				<button className={"next-btn " + isNextButtonDisabled}  onClick={handleNextClick} ><CaretRightOutlined  /></button>
			</div>
		</div>
	);
};
export const ExploreThree = ({ isSidebarOpen, setLoader, setModalVideo, setModalPoints }) => {

	const [posesData, setPosesData] = useState([]);
	const cardsContainerRef = useRef(null);
	const [translateValue, setTranslateValue] = useState(0);
	const [isPrevButtonDisabled, setIsPrevButtonDisabled] = useState('disb');
	const [isNextButtonDisabled, setIsNextButtonDisabled] = useState('');
	
	const handlePrevClick = () => {
		setTranslateValue(translateValue + 50);
	};

	const handleNextClick = () => {
		console.log("cardsContainerRef",cardsContainerRef)
		setTranslateValue(translateValue - 50);
	};

	useEffect(() => {
		if (translateValue === 0){
			setIsPrevButtonDisabled('disb');
		} else {
			setIsPrevButtonDisabled('');
		}
		if (cardsContainerRef?.current.clientWidth + (-(translateValue)) >=  (240  * posesData.length) ){
			setIsNextButtonDisabled('disb');
		} else {
			setIsNextButtonDisabled('');	
		}
	}, [translateValue, posesData]);

	useEffect(() => {
		setLoader(true);
		fetchPosesData().then((data) => { setPosesData(data); setLoader(false) })
	}, []);

	useEffect(() => {
		console.log(posesData)
	}, [posesData]);

	return (
		<div className={isSidebarOpen ? "explore left-marging" : "explore"}>
			<h3>This includes different exercise in one package <br/> explore any one and do combination of exercises together</h3>
			<div>
				<button className={"prev-btn " + isPrevButtonDisabled} onClick={handlePrevClick}><CaretLeftOutlined  /></button>
				<div className="card-container" style={{ transform: `translateX(${translateValue}%)` }} ref={cardsContainerRef}>
					{posesData.map((val, idx) => { return (<CustomCard setModalVideo={setModalVideo} setModalPoints={setModalPoints} vid={val.videoURL} img={val.thumbnailURL} title={val.title} description={val.description} impPoints={val.impPoints} id={idx} />) })}
				</div>
				<button className={"next-btn " + isNextButtonDisabled}  onClick={handleNextClick} ><CaretRightOutlined  /></button>
			</div>
		</div>
	);
};
