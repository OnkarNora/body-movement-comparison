import logo from './logo.svg';
import './App.css';
import compare from './posenet';
import VideoInput from './VideoInput';
import { useState } from 'react';
import model_video from './m_hands_up_2.mp4'

function App() {

  const [video,setVideo] = useState();

  return (

    <div className="App">
      {/* <img id='image' src={require('./Capture.PNG')} width="372" height="495"/> */}
      <VideoInput setVideo={setVideo}  width={640} height={480} />
      {/* <VideoInput setVideo={setVideo}  width={372} height={495} /> */}
      <div className="VideoInput">
      <video
          id = 'model_video'
          className="VideoInput_video"
          width={640}  
          height={480}
        ><source src={model_video}
        type="video/mp4"></source></video>
      </div>
      
      {/* <img id='model_image' src={require('./Capture3.PNG')} width="372" height="495"/> */}
      <button onClick={()=>{compare(document.getElementById('video'),document.getElementById('model_video'))}}>Check</button>
    </div>
  );
}

export default App;
