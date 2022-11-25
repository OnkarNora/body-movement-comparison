import {drawKeyPoints, drawSkeleton} from './utils'
import React, {Component, useEffect, useRef, useState} from 'react'
import * as posenet from '@tensorflow-models/posenet'

function RecordVideo() {

  const [laoding,setLoading] = useState(true);

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
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("useEffect seems to be running")
    setupCamera().then(async()=>{
      console.log("i am in after setup camera")
      setTimeout(() => {
        setLoading(false);
      }, 200)
        await detectPose()
    }).catch((err)=>{console.log(err);});
    
      
  
    
  }, [])


  async function setupCamera() {
    console.log("setupCamera seems to be running")
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
    }
    const {videoWidth, videoHeight} = defaultProps
    const video = videoRef.current
    video.width = videoWidth
    video.height = videoHeight

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
      }
    })

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play()
        resolve(video)
      }
    })
  }

  async function detectPose() {
    console.log("i am in detectpose pose")
    const {videoWidth, videoHeight} = defaultProps
    console.log(canvasRef.current)
    const canvas = canvasRef.current
    const canvasContext = canvas.getContext('2d')

    canvas.width = videoWidth
    canvas.height = videoHeight

    await poseDetectionFrame(canvasContext)
  }
  
  async function poseDetectionFrame(canvasContext) {
    console.log("i am in poseDetection pose")
    const {
      algorithm,
      imageScaleFactor, 
      flipHorizontal, 
      outputStride, 
      minPoseConfidence, 
      minPartConfidence, 
      maxPoseDetections, 
      nmsRadius, 
      videoWidth, 
      videoHeight, 
      showVideo, 
      showPoints, 
      showSkeleton, 
      skeletonColor, 
      skeletonLineWidth 
      } = defaultProps

    const posenetModel = await posenet.load()
    const video = videoRef.current
    video.width = videoWidth
    video.height = videoHeight

    const findPoseDetectionFrame = async () => {
      let poses = []
      // console.log("i am in findPoseDetectin pose")
      switch (algorithm) {
        case 'multi-pose': {
          poses = await posenetModel.estimateMultiplePoses(
          video, 
          imageScaleFactor, 
          flipHorizontal, 
          outputStride, 
          maxPoseDetections, 
          minPartConfidence, 
          nmsRadius
          )
          break
        }
        case 'single-pose': {
          // console.log("i am in single pose")
          const pose = await posenetModel.estimateSinglePose(
          video, 
          imageScaleFactor, 
          flipHorizontal, 
          outputStride
          )
          poses.push(pose)
          break
        }
      }

      canvasContext.clearRect(0, 0, videoWidth, videoHeight)

      if (showVideo) {
        canvasContext.save()
        canvasContext.scale(-1, 1)
        canvasContext.translate(-videoWidth, 0)
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
        canvasContext.restore()
      }

      poses.forEach(({score, keypoints}) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              skeletonColor,
              canvasContext
            )
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext
            )
          }
        }
      })
      requestAnimationFrame(findPoseDetectionFrame)
    }
    await findPoseDetectionFrame()
  }


  return (
    <div>
        <div>
          <video style={{margin:'20px'}} id="videoNoShow" playsInline ref={videoRef} />

          <canvas style={{margin:'20px'}} className="webcam" ref={canvasRef} />
        </div>
      </div>
  )
}

export default RecordVideo