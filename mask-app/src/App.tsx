import { useRef, useEffect, useState } from "react";
import "./App.css";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { MediaPipeFaceMesh } from "@tensorflow-models/face-landmarks-detection/dist/types";
import { draw } from "./mask";

const App = () => {
  const webcam = useRef<Webcam>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const runFaceDetect = async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );
    detect(model);
  };

  const detect = async (model: MediaPipeFaceMesh) => {
    if (webcam.current && canvas.current) {
      const webcamCurrent = webcam.current;
      if (webcamCurrent?.video?.readyState === 4) {
        const video = webcamCurrent.video;
        const videoWidth = webcamCurrent.video.videoWidth;
        const videoHeight = webcamCurrent.video.videoHeight;
        canvas.current.width = videoWidth;
        canvas.current.height = videoHeight;
        const predictions = await model.estimateFaces({
          input: video,
        });
        const ctx = canvas.current.getContext("2d");
        if (ctx) {
          requestAnimationFrame(() => {
            draw(predictions, ctx, videoWidth, videoHeight);
          });
          detect(model);
        }
        if (loading) {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    runFaceDetect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcam.current?.video?.readyState]);

  return (
    <div className="App">
      <header className="header">
        <div className="title">Face mask App</div>
        {loading ? (
          <div className="subtitle">Loading Face Detector TF model...</div>
        ) : null}
      </header>
      <Webcam
        audio={false}
        ref={webcam}
        style={{
          position: "absolute",
          margin: "auto",
          textAlign: "center",
          top: 100,
          left: 0,
          right: 0,
          zIndex: 9,
        }}
      />

      <canvas
        ref={canvas}
        style={{
          position: "absolute",
          margin: "auto",
          textAlign: "center",
          top: 100,
          left: 0,
          right: 0,
          zIndex: 9,
        }}
      />
    </div>
  );
};

export default App;
