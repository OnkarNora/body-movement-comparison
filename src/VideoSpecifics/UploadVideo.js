import { drawKeyPoints, drawSkeleton } from './utils'
import React, { useEffect, useRef, useState } from 'react'
import compare from './posenet';
import Analysis from '../pages/Analysis';
import { useNavigate } from 'react-router-dom';

function UploadVideo({ model_video, modalPoints }) {

    const navigate = useNavigate();
    const [inputData, setinputData] = useState([]);
    const [modelData, setmodelData] = useState([]);
    const [scoreData, setScoreData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState();
    const [compared, setCompared] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [videoInputSize, setVideoInputSize] = useState({width: 360, height: 640});
    const [videoModelSize, setVideoModelSize] = useState({width: 360, height: 640});
    const inputRef = React.useRef();

    const frameRate = 24;
    const nextFrame = 1 / frameRate

    const defaultProps = {
        flipHorizontal: false,
        algorithm: 'single-pose',
        showVideo: true,
        showSkeleton: true,
        showPoints: true,
        minPoseConfidence: 0.1,
        minPartConfidence: 0.5,
        maxPoseDetections: 2,
        nmsRadius: 20,
        outputStride: 16,
        imageScaleFactor: 0.5,
        skeletonColor: '#ffadea',
        skeletonLineWidth: 6,
        loadingText: 'Loading...please be patient...'
    }
    const videoRef = useRef(null);
    const video2Ref = useRef(null);
    const canvasRef = useRef(null);
    const canvas2Ref = useRef(null);

    useEffect(() => {
        if (!model_video) {
            navigate('/explore/explore1')
        }
        const video = video2Ref.current
        video.src = model_video
    }, [])



    const handleChoose = (event) => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);

    };

    async function showSkeleton(video, canvas, Data) {

        const canvasContext = canvas.getContext('2d')
        const {
            minPartConfidence,
            showVideo,
            showPoints,
            showSkeleton,
            skeletonColor,
            skeletonLineWidth
        } = defaultProps

        video.currentTime = 0
        const videoWidth = video.width;
        const videoHeight = video.height;
        canvas.width = videoWidth
        canvas.height = videoHeight
        canvasContext.clearRect(0, 0, videoWidth, videoHeight)
        for (let pose in Data) {

            canvasContext.clearRect(0, 0, videoWidth, videoHeight)
            if (showVideo) {
                canvasContext.save()
                // canvasContext.scale(-1, 1)
                // canvasContext.translate(-videoWidth, 0)
                canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
                canvasContext.restore()
            }

            if (showPoints) {
                drawKeyPoints(
                    Data[pose].keypoints,
                    minPartConfidence,
                    skeletonColor,
                    canvasContext
                )
            }
            if (showSkeleton) {
                // console.log("This is being called : ",Data[pose].keypoints)
                drawSkeleton(
                    Data[pose].keypoints,
                    minPartConfidence,
                    skeletonColor,
                    skeletonLineWidth,
                    canvasContext
                )
            }

            await wait();
            video.currentTime += nextFrame

        }
        video.currentTime = 0
    }

    async function wait() {
        await new Promise(resolve => setTimeout(resolve, nextFrame * 1000));

    }

    const SavePose = () => {

    }

    const useStandardVideoSize = () => {
        setVideoInputSize({width: 360 ,height: 640});
        setVideoModelSize({width: 360,height: 640});
    }

    const handleMetadataLoadInput = (()=>{
        if (videoRef.current) {
            console.log("This is video : ", videoRef, videoRef.current.videoWidth, videoRef.current.videoHeight, videoRef.current.tagName)
            if (videoRef.current.videoWidth){
                setVideoInputSize({width: videoRef.current.videoWidth ,height: videoRef.current.videoHeight});
            }
        }
    })

    const handleMetadataLoadModel = (()=>{
        if (video2Ref.current) {
            console.log("This is video : ", video2Ref, video2Ref.current.videoWidth, video2Ref.current.videoHeight, video2Ref.current.tagName)
            if (video2Ref.current.videoWidth){
                setVideoModelSize({width: video2Ref.current.videoWidth ,height: video2Ref.current.videoHeight});
            }
        }
    })
// for input handle height width separatly and same for model both cant be same size
    return (
        <div>
            <div className='text-center'>
                {!compared && source && (<button type='button' className='btn btn-info m-3' onClick={async (event) => { event.target.setAttribute('disabled', 'ture'); setLoading(true); await compare(videoRef.current, video2Ref.current, setinputData, setmodelData, setScoreData, modalPoints); setCompared(true); setLoading(false); }}>Compare</button>)}
                {!compared && !loading && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={useStandardVideoSize}>Use Standard Video Size</button>)}
                {loading && <h4 style={{display: 'inline-block'}}>Please wait...</h4>}
                {compared && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={() => { showSkeleton(videoRef.current, canvasRef.current, inputData) }}>Show Skeleton input video</button>)}
                {compared && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={() => { showSkeleton(video2Ref.current, canvas2Ref.current, modelData) }}>Show Skeleton model video</button>)}
                {compared && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={() => { setShowAnalysis(true) }}>Show Analysis</button>)}
                {/* {compared && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={() => { SavePose() }}>Save This Comparison</button>)} */}
                {/* <button onClick={() => { setStatus(false) }}>Stop</button> */} 
            </div>
            <div>

                <input
                    ref={inputRef}
                    className="VideoInput_input"
                    type="file"
                    onChange={handleFileChange}
                    accept=".mov,.mp4"
                    id="test"
                    style={{ display: 'none' }}
                />
                {!source && <div className='text-center'> <button type='button' className='btn btn-secondary mt-2' onClick={handleChoose}>Choose</button></div>}
                <div className='videos-wrapper'>
                    {
                        source && 
                        <div className='input-video-wrapper'>
                            <video id='video' src={source} ref={videoRef} width={videoInputSize.width} height={videoInputSize.height} onLoadedMetadata={handleMetadataLoadInput}/>
                            <canvas  className="webcam" ref={canvasRef} />
                        </div>
                    }

                    <div className='model-video-wrapper'>
                        <video crossOrigin='anonymous' id="videoNoShow" playsInline ref={video2Ref} width={videoModelSize.width} height={videoModelSize.height} onLoadedMetadata={handleMetadataLoadModel}/>
                        <canvas  className="webcam" ref={canvas2Ref} />
                    </div>
                </div>

            </div>

            {showAnalysis ? <Analysis modalPoints={modalPoints} inputData={inputData} modelData ={modelData} scoreData={scoreData} /> : null}

        </div>
    )
}

export default UploadVideo