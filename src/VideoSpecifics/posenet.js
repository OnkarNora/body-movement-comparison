import * as tfjs from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'
import DynamicTimeWarping from 'dynamic-time-warping'


async function getKeyPoints(imageElement,setData){
    console.log("called",imageElement)
    var poses = [];
    var poses_detailed = []
    let ans;
    // console.log(cv);
    const net = await posenet.load(tfjs);
    // {inputResolution: { width: 640, height: 480 },scale: 0.8,}
    const imageScaleFactor = 1.0;
    const flipHorizontal = false;
    const outputStride = 16;
    const maxPoseDetections = 1;
    const frameRate = 24;
    const nextFrame = 1/frameRate
    const video = imageElement;
    // video.removeAttribute("controls")
    let i = 0;
    let no_of_frames = 0;
    // video.load();
    // video.play(); 
    console.log("the nextFrame : ",nextFrame)  
    video.currentTime = i+nextFrame;

    return new Promise(function (resolve){video.addEventListener('seeked', async function() {
        no_of_frames++;
        // now video has seeked and current frames will show
        // at the time as we expect
        // console.log("This is pased : ", video, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections)
        const pose = await net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections);
        console.log(pose)
        poses_detailed.push(pose)
        let arr = []
        for (let j = 0;j<17;j++){
            arr.push([pose.keypoints[j].position['x'],pose.keypoints[j].position['y']])
        }
        poses.push(arr)
      
        // when frame is captured, increase here by 5 seconds
        i += nextFrame;
      
        // if we are not past end, seek to next interval
        if (i <= this.duration) {
          // this will trigger another seeked event
          this.currentTime = i;
        }
        else {
            console.log(no_of_frames)
            setData(poses_detailed)
            resolve(analyseKeyPoints(poses))
        //   video.load();
        }
      });
    })
    // return new Promise(function (resolve){
    //     const intervalID = setInterval(async () => {
    //         i++;
    //         // video.pause()
    //         try {
    //             const pose = await net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride, maxPoseDetections);
    //             console.log(pose)
    //             let arr = []
    //             for (let j = 0;j<17;j++){
    //                 arr.push([pose.keypoints[j].position['x'],pose.keypoints[j].position['y']])
    //             }
    //             poses.push(arr)
    //         } catch (err) {
    //           clearInterval(intervalID)
    //           resolve("Error");
    //         //   setErrorMessage(err.message)
    //         }
    //         video.onended = function(e) {
    //             clearInterval(intervalID)
    //             video.load();
    //             console.log(i)
    //             // console.log(poses)
    //             resolve(analyseKeyPoints(poses,i));
                
    //           };
    //         // video.play()
    //       }, Math.round(1000 / frameRate))
    // })
    
    
    // load the posenet model
    
    
    // net.on('pose',gotPoses)
    // let pose_names = [];
    // let coords_new = [];
    // console.log(pose);
    // for (let i in pose.keypoints){
    //     // console.log(pose.keypoints[i].position)
    //     coords_new.push([pose.keypoints[i].position['x'],pose.keypoints[i].position['y']])
    //     pose_names.push(pose.keypoints[i].part)

    //     // Todo : manually check for left and right wrist which are not matching but it is giving 99% ha ha

    // }
    // // console.log("coords new before",coords_new)
    // let roi_coords = bounding_box(coords_new);
    // // console.log(roi_coords);
    // coords_new = get_new_coords(coords_new,roi_coords);
    // // console.log("coords new after",coords_new)
    // // console.log(coords_new);

    // coords_new = normalize_array(coords_new)
    // // for (let i in coords_new){
    // //     coords_new[i] = normalize_array(coords_new[i]);
    // // }
    // // console.log(pose_names)

    // return coords_new
}

function analyseKeyPoints(poses){
    // console.log("poses : ",poses)

    // let roi_coords = bounding_box(coords_new);
    let normalized_poses = []
    let new_coords = []
    for(let i in poses){
        let coords_new = poses[i]
        let roi_coords = bounding_box(coords_new);
        coords_new = get_new_coords(coords_new,roi_coords);
        // coords_new = normalize_array(coords_new)
        // for (let j in coords_new){
        //     coords_new[j] = normalize_array(coords_new[j]);
        // }
        new_coords.push(coords_new)
    }
    // console.log("normalized_poses : ",normalized_poses)
    for (let i=0 ; i<17; i++){
        let input = []
        for (let j in new_coords){
            input.push(new_coords[j][i][0])
            input.push(new_coords[j][i][1])
        }
        input = normalize_array(input)
        let k = 0;
        let normalizedarr = []
        for (let j in new_coords){
            new_coords[j][i][0] = input[k];
            k++;
            new_coords[j][i][1] = input[k];
            k++;
        }
    }
    return new_coords

}


function bounding_box(coords){
    let min_x = 100000 
    let min_y = 100000
    let max_x = -100000 
    let max_y = -100000

    for (let item in coords){
        // console.log(coords[item])
        if (coords[item][0] < min_x)
            min_x = coords[item][0]

        if (coords[item][0] > max_x)
            max_x = coords[item][0]

        if (coords[item][1] < min_y)
            min_y = coords[item][1]

        if (coords[item][1] > max_y)
            max_y = coords[item][1]
    }
    return [[Math.floor(min_x),Math.floor(min_y)],[Math.floor(max_x),Math.floor(min_y)],[Math.floor(max_x),Math.floor(max_y)],[Math.floor(min_x),Math.floor(max_y)]]
}

function get_new_coords(coords,fun_bound){
    for (let i in coords){
        coords[i][0] = coords[i][0] - fun_bound[0][0];
        coords[i][1] = coords[i][1] - fun_bound[0][1];
        // console.log(coords[i][0],coords[i][1])
    }
    // console.log("coords: ",coords)
    return coords;
}

function normalize_array(arr) {

    const norm = tfjs.norm(tfjs.tensor1d(arr)).dataSync()[0]
    // console.log("norm of arr is : ",norm)
    for(let i in arr){
        // console.log("arr : ",arr[i])
        arr[i] = arr[i]/ norm;
        // arr[i][1] = arr[i][1] / norm;
        // console.log([arr[i][0],arr[i][1]])
    }
    return arr
  
  }

async function compare(input_image,model_image, setinputData, setmodelData, setScoreData){

    let input_points = await getKeyPoints(input_image,setinputData);
    let model_points = await getKeyPoints(model_image,setmodelData);

    // input_points.pop()
    // model_points.pop()
    // console.log("input points : ",input_points);
    // console.log("model points : ",model_points);
    // const distFunc = ( a, b )=>  (a-b)**2; // this is used in python but still its different (dont know the reason)
    const distFunc = ( a, b )=>  Math.abs(a-b);
    let scores = [];
    for (let i=0 ; i<17; i++){
        let input = []
        let model = []
        for (let j in input_points){
            input.push(input_points[j][i][0])
            input.push(input_points[j][i][1])
        }
        for (let j in model_points){
            model.push(model_points[j][i][0])
            model.push(model_points[j][i][1])
        }
        // console.log("input ",i," : ",input)
        // console.log("model ",i," : ",model)
        var dtw = new DynamicTimeWarping(input, model, distFunc);
        // var dtw = new DynamicTimeWarping([0.76822747, 0.64017697], [0.69688069, 0.71718707],distFunc);
        let dist = dtw.getDistance();
        // console.log("dist is : ",dist)
        dist = dist / 10
        let percent_score = percentage_score(dist)
        scores.push(percent_score)
        
    }
    console.log(scores)
    scores.push(mean(scores))
    setScoreData(scores)
    console.log(mean(scores))
    
    
}

function percentage_score(score){
    return Number(100 - (score* 100))
}

function mean(array) {
    var total = 0;
    var count = 0;

    array.forEach(function(item, index) {
        total += item;
        count++;
    });

    return total / count;
}

export default compare;