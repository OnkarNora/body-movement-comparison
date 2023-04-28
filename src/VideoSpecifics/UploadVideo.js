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
    const [source, setSource] = useState();
    const [compared, setCompared] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [videoWidth, setVideoWidth] = useState(500);
    const [videoHeight, setVideoHeight] = useState(500);
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

        const fetchVideo = async () => {
            try {
                // Set up the URL to the video file in Firebase Storage
                const videoUrl = model_video;

                // Fetch the video with headers
                const response = await fetch(videoUrl, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'video/mp4',
                        'Sec-Fetch-Dest': 'video',
                        'range': 'bytes=0-',
                     },
                });

                // Get the video blob from the response
                const videoBlob = await response.blob();

                // Create a blob URL from the video blob
                const videoBlobUrl = URL.createObjectURL(videoBlob);

                // Set the video URL in the state
                const video = video2Ref.current
                video.width = videoWidth
                video.height = videoHeight
                video.src = videoBlobUrl
            } catch (error) {
                console.error(error);
            }
        };

        const video = video2Ref.current
        video.width = videoWidth
        video.height = videoHeight
        video.src = model_video

        // fetchVideo();
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

    useEffect(()=>{
        if (videoRef.current) {
            console.log("This is video : ", videoRef, videoRef.current.videoWidth, videoRef.current.videoHeight)
            setVideoWidth(videoRef.current.videoWidth);
            setVideoHeight(videoRef.current.videoHeight);
        }

    },[videoRef])
// for input handle height width separatly and same for model both cant be same size
    return (
        <div>
            <div className='text-center'>
                {!compared && source && (<button type='button' className='btn btn-info m-3' onClick={async (event) => { event.target.setAttribute('disabled', 'ture'); await compare(videoRef.current, video2Ref.current, setinputData, setmodelData, setScoreData, modalPoints); setCompared(true); }}>Compare</button>)}
                {compared && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={() => { showSkeleton(videoRef.current, canvasRef.current, inputData) }}>Show Skeleton input video</button>)}
                {compared && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={() => { showSkeleton(video2Ref.current, canvas2Ref.current, modelData) }}>Show Skeleton model video</button>)}
                {compared && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={() => { setShowAnalysis(true) }}>Show Analysis</button>)}
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
                            <video id='video' src={source} width={videoWidth} height={videoHeight} ref={videoRef}/>
                            <canvas  className="webcam" ref={canvasRef} />
                        </div>
                    }

                    <div className='model-video-wrapper'>
                        <video crossOrigin='anonymous' id="videoNoShow" width={videoWidth} height={videoHeight} playsInline ref={video2Ref} />
                        <canvas  className="webcam" ref={canvas2Ref} />
                    </div>
                </div>

            </div>

            {showAnalysis ? <Analysis modalPoints={modalPoints} input_data={scoreData} /> : null}

        </div>
    )
}

export default UploadVideo