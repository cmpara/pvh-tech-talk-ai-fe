import React from "react";
import "./App.css";

function App() {
  const [text, setText] = React.useState("");
  const speechRecognition = new webkitSpeechRecognition();
  const speechSythesis = window.speechSynthesis;

  speechRecognition.lang = "en-US";
  speechRecognition.maxAlternatives = 1;
  speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
    setText(event.results[0][0].transcript);
  };
  const handleStartRecording = () => {
    speechRecognition.start();
  };
  const handleStopRecording = () => {
    speechRecognition.stop();
  };

  const handleSay = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSythesis.speak(utterance);
  };

  return (
    <div className="App">
      <button type="button" onClick={handleStartRecording}>
        Start recording
      </button>
      <button type="button" onClick={handleStopRecording}>
        Stop recording
      </button>
      <div>
        <h1>Recorded text:</h1>
        <div>{text}</div>
        <button onClick={handleSay}>Sythesize speech</button>
      </div>
    </div>
  );
}

export default App;
