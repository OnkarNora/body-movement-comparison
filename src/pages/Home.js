import React,{ useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = ({isSidebarOpen}) => {

  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		if (!user) {
		  navigate('/login');
		}
			
	}, [user, loading]);

  return (
    <div className={isSidebarOpen ? "home mt-5 left-marging":"home mt-5"}>
      <Container>
        <Row>
          <Col>
            <h1>Welcome to our Exercise Accuracy Scoring App!</h1>
            <p>
              Our app uses the PoseNet library to analyze your exercise movements and compare them to a standard video. With our app, you can get real-time feedback on the accuracy of your exercises and see how your performance compares to the standard.
            </p>
            <Link to='/explore/explore1' className='btn btn-lg btn-success'>
              Get Started
            </Link>
          </Col>
          <Col>
            <img width={250} height={250} src="https://editor.analyticsvidhya.com/uploads/96263posnet_keypoints.png" alt="placeholder" />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h2>How to Use the App</h2>
            <p>
              Using our app is easy! Simply upload a video of yourself performing the exercise you want to analyze. Our app will compare your movements to the standard video and generate a score that reflects your accuracy.
            </p>
            <p>
              To get started, click on the "Upload Video" button and select the video file you want to analyze. You can then watch your video and see your score in real-time. You can also compare your score to previous scores to track your progress over time.
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h2>Why Use Our App?</h2>
            <p>
              Our app is perfect for anyone who wants to improve their exercise form and accuracy. Whether you're a fitness enthusiast or a professional athlete, our app can help you fine-tune your movements and achieve better results.
            </p>
            <p>
              Our app is also great for trainers and coaches who want to monitor their clients' progress and provide feedback on their performance. With our app, you can easily track your clients' progress over time and help them achieve their fitness goals.
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h2>Get Started Today!</h2>
            <p>
              Ready to improve your exercise accuracy and take your fitness to the next level? Try our app today and see the results for yourself! Click on the "Get Started" button to upload your first video.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
