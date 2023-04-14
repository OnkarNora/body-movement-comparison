import React, { useEffect } from 'react'
import './Method.css'
import UploadVideo from './UploadVideo'
import RecordVideo from './RecordVideo'
import { useState } from 'react'

function Method({model_video, isSidebarOpen}) {

    const [step, setStep] = useState(1);

    useEffect(() => {
        setStep(1);
    }, [])
    

    // eslint-disable-next-line default-case
    switch (step) {
        case 1:
            return (
                <div id="cards_landscape_wrap-2" >
                    <div className="container"  >
                        <div className="row" >
                        <h1>Choose a Method</h1>
                            <div style={{display:'flex',justifyContent:'space-between',}} >
                                
                                <div className="col-xs-12  col-lg-4">
                                    <button onClick={()=>{setStep(2)}}>
                                        <div className="card-flyer">
                                            <div className="text-box">
                                                <div className="image-box">
                                                    <img src="https://cdn.pixabay.com/photo/2016/11/30/18/14/download-1873539_960_720.png" alt="" />
                                                </div>
                                                <div className="text-container">
                                                    <h6>Upload a Video</h6>
                                                    <p>Choose a video from your local computer to test it with the standard video, make sure the video file is having extension .mp4 and is of minimum 360p.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className="col-xs-12  col-lg-4 ">
                                    <button onClick={()=>{setStep(3)}}>
                                        <div className="card-flyer">
                                            <div className="text-box">
                                                <div className="image-box">
                                                    <img src="https://cdn.pixabay.com/photo/2017/01/25/17/35/camera-2008489_960_720.png" alt="" />
                                                </div>
                                                <div className="text-container">
                                                    <h6>Record Video</h6>
                                                    <p>Record a video with the camera connected to this computer. make sure the lighting is good and all body parts are visible on the screen.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 2:
            return (
                <UploadVideo model_video={model_video} />
            )
        case 3:
            return (
                <RecordVideo isSidebarOpen={isSidebarOpen} model_video={model_video}/>
            )
    }
}

export default Method