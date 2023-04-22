import { drawKeyPoints, drawSkeleton } from './utils'
import * as tfjs from '@tensorflow/tfjs'
import React, { Component, useEffect, useRef, useState } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import compare from './posenet';
import Analysis from '../pages/Analysis';
import { useNavigate } from 'react-router-dom';

function UploadVideo({ model_video }) {

    const navigate = useNavigate();
    const [laoding, setLoading] = useState(true);
    const [status, setStatus] = useState(false);
    const [inputData, setinputData] = useState([]);
    const [modelData, setmodelData] = useState([]);
    const [scoreData, setScoreData] = useState([]);
    const [source, setSource] = useState();
    const [compared, setCompared] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(true);
    const inputRef = React.useRef();

    let current_time = 0;
    const frameRate = 24;
    const nextFrame = 1 / frameRate
    let no_of_frames = 0;

    const defaultProps = {
        videoWidth: 700,
        videoHeight: 700,
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
        // console.log("useEffect seems to be running")
        if(!model_video){
            navigate('/explore/explore1')
        }

        const fetchVideo = async () => {
            try {
              // Set up the URL to the video file in Firebase Storage
              const videoUrl = model_video;
      
              // Set up the headers for the request
              const headers = {
                // Add your custom headers here
                'Access-Control-Allow-Origin': '*',
              };
      
              // Fetch the video with headers
              const response = await fetch(videoUrl, { headers });
      
              // Get the video blob from the response
              const videoBlob = await response.blob();
      
              // Create a blob URL from the video blob
              const videoBlobUrl = URL.createObjectURL(videoBlob);
      
              // Set the video URL in the state
              const video = video2Ref.current
              video.width = defaultProps.videoWidth
              video.height = defaultProps.videoHeight
              video.src = videoBlobUrl
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchVideo();

        
        // video.crossOrigin = 'Anonymous';

    }, [])

    

    const handleChoose = (event) => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
        
    };

    async function showSkeleton(video,canvas,Data){
        // console.log("input data seeems : ",inputData)

        const canvasContext = canvas.getContext('2d')
        const {
            minPartConfidence,
            videoWidth,
            videoHeight,
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
        for (let pose in Data){
            
            canvasContext.clearRect(0, 0, videoWidth, videoHeight)
            console.log(video.currentTime)
            if (showVideo) {
                canvasContext.save()
                canvasContext.scale(-1, 1)
                canvasContext.translate(-videoWidth, 0)
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
        await new Promise(resolve => setTimeout(resolve, nextFrame*1000));

      }
      
      

    return (
        <div>
            <div className='text-center'>
                {!compared && source && (<button type='button' className='btn btn-info m-3' onClick={async(event) => { event.target.setAttribute('disabled','ture');await compare(videoRef.current, video2Ref.current, setinputData, setmodelData, setScoreData); setCompared(true); }}>Compare</button>)}
                {compared && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={() => { showSkeleton(videoRef.current,canvasRef.current,inputData) }}>Show Skeleton input video</button>)}
                {compared && source && (<button type='button' className='btn btn-outline-dark m-3' onClick={() => { showSkeleton(video2Ref.current,canvas2Ref.current,modelData) }}>Show Skeleton model video</button>)}
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
                        style={{display:'none'}}
                    />
                    {!source && <div className='text-center'> <button type='button' className='btn btn-secondary mt-2' onClick={handleChoose}>Choose</button></div>}
                    {source && (
                        <video
                            id='video'
                            width={defaultProps.videoWidth}
                            height={defaultProps.videoHeight}
                            src={source}
                            ref={videoRef}
                        />
                    )}
                    <canvas style={{ margin: '10px' }} className="webcam" ref={canvasRef} />
                
                
                <video crossOrigin='anonymous' controls style={{ margin: '10px' }} id="videoNoShow" playsInline ref={video2Ref}  />
                <canvas style={{ margin: '10px' }} className="webcam" ref={canvas2Ref} />
                
            </div>

            {showAnalysis ? <Analysis input_data={scoreData} /> : null}

        </div>
    )
}

export default UploadVideo