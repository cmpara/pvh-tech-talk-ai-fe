import React from "react";

const Instructions: React.FC = () => (
  <div>
    <h1>Looks like you still haven't activated the FaceDetector API</h1>

    <h2> Follow these instructions</h2>

    <h3> Copy and paste this into a new tab</h3>

    <code>chrome://flags/#enable-experimental-web-platform-features</code>

    <h3> And enable the experimental web platform features</h3>

    <img alt="example" src="/0.png" />

    <h3>
      After enabling it you should see a <strong>Relaunch Now</strong> button on
      the bottom of the screen.
    </h3>

    <h3>Relaunch the browser please.</h3>
  </div>
);
export default Instructions;
