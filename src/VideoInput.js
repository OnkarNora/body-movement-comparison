import React from "react";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);

  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
        id="test"
      />
      {!source && <button onClick={handleChoose}>Choose</button>}
      {source && (
        <video
          id = 'video'
          className="VideoInput_video"
          width={width}  
          height={height}
          src={source}
        />
      )}
      
      {/* <div className="VideoInput_footer">{source || "Nothing selectd"}</div> */}
    </div>
  );
}
