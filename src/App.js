import './App.css';
import Method from './VideoSpecifics/Method';
import model_video from './model_videos/aniket_hands_up_4.mp4'

function App() {

  return (

    <div>
        <Method model_video={model_video} />
      </div>
  );
}

export default App;
