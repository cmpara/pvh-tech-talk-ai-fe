# Getting Started with Chrome Face Detector API in browser

This project is a demonstration of Chromium-based browser functionality that allows to use experimental feature of Chrome to run face detection API using AI ML model in-built into browser. API can detect face boxes, basic facial features like mouth, nose, eyes in images and video frames. It runs on device and does not require internet connection or sending data to the server.

The project demonstrates usage of such browser on device AI ML capabilities but they are not production-ready as they are only supported in experimental branch of Chrome.

Before you build and run the app, you need to [enable experimental features in your Chrome browser](chrome://flags/#enable-experimental-web-platform-features). Open the link and click Enabled for Experimental Web Platform features in Chrome, then restart your browser.

Then you can run commands (you need Node.js version 16 or higher installed on your machine):

```bash
npm i && npm run start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more about face detection and landmark recognition [here](https://towardsdatascience.com/face-detection-for-beginners-e58e8f21aad9).
