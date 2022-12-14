/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// import Sketch from "react-p5";
// @ts-ignore
const ml5 = window.ml5;
// window.ml5 has ml5.js

let w = 800;
let h = 600;

type drawKeypointstype = (
  keypoints: any[],
  minConfidence: number,
  ctx: CanvasRenderingContext2D | null,
  scale?: number
) => void;

const RealTime = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const [video, setVideo] = React.useState<HTMLVideoElement | null | undefined>(
    null
  );

  /**
   * This function is used to get the video from the webcam
   * and set the videoRef to the video stream
   */
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current === null) return;
        videoRef.current.srcObject = stream as MediaStream; // Assign the stream to the video element
        videoRef?.current?.play(); // Play the video
        setVideo(videoRef.current); // Set the video state variable
        setIsVideoReady(true); // Set the video ready state variable
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Initialize the model to the video stream and get the pose
   * and draw the keypoints and skeleton
   */
  const getModel = () => {
    const model = ml5.poseNet(videoRef.current, () => {
      console.log("Model Loaded");
    });
    model.flipHorizontal = true;
    model.maxPoseDetections = 1;
    // Every time the model detects a pose, it will call the draw function
    model.on("pose", (results: Array<{ pose: { keypoints: never[] } }>) => {
      if (results.length > 0) {
        draw(results[0].pose);
      }
      // console.log(results);
    });
  };

  /**
   * This function is used to draw the keypoints and skeleton
   * @param points This is the keypoints and skeleton points
   * @returns void
   */
  const draw = (
    points = {
      keypoints: [],
    }
  ) => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, w, h);
    ctx?.save();
    ctx?.scale(-1, 1);
    ctx?.translate(-w, 0);
    // @ts-ignore
    ctx?.drawImage(video, 0, 0, w, h);
    ctx?.restore();
    drawKeypoints(points.keypoints, 0.5, ctx);
    drawSkeleton(points.keypoints, 0.5, ctx);
  };

  /**
   * This function is used to draw the points on the canvas
   * @param keypoints
   * @param minConfidence
   * @param ctx
   * @param scale
   * @returns
   */
  const drawKeypoints: drawKeypointstype = (
    keypoints = [],
    minConfidence,
    ctx,
    scale = 1
  ) => {
    if (!ctx) return;
    for (let i = 0; i < keypoints.length; i++) {
      const keypoint = keypoints[i];
      if (keypoint?.score < minConfidence) {
        continue;
      }
      const { y, x } = keypoint?.position;
      drawPoint(ctx, y * scale, x * scale, 3, "aqua");
    }
  };

  const drawSkeleton: drawKeypointstype = (
    keypoints = [],
    minConfidence,
    ctx,
    scale = 1
  ) => {
    if (!ctx) return;
    const adjacentKeyPoints = getAdjacentKeyPoints(keypoints, minConfidence);
    // adjacent key points are the points that are connected by a line
    // e.g. left wrist and left elbow, left elbow and left shoulder, etc.
    adjacentKeyPoints.forEach((keypoints) => {
      drawSegment(
        toTuple(keypoints[0].position),
        toTuple(keypoints[1].position),
        "aqua",
        scale,
        ctx
      );
    });
  };

  const getAdjacentKeyPoints: (
    keypoints: any[],
    minConfidence: number
  ) => any[] = (keypoints, minConfidence) => {
    return POSE_CHAIN.reduce((result: any[], [leftJoint, rightJoint]) => {
      const leftKeypoint = keypoints.find((keypoint) => {
        return keypoint.part === leftJoint;
      });
      const rightKeypoint = keypoints.find((keypoint) => {
        return keypoint.part === rightJoint;
      });
      if (
        leftKeypoint.score < minConfidence ||
        rightKeypoint.score < minConfidence
      ) {
        return result;
      }
      return [...result, [leftKeypoint, rightKeypoint]];
    }, []);
  };

  const POSE_CHAIN = [
    ["leftShoulder", "rightShoulder"],
    ["leftShoulder", "leftElbow"],
    ["leftElbow", "leftWrist"],
    ["rightShoulder", "rightElbow"],
    ["rightElbow", "rightWrist"],
    ["leftShoulder", "leftHip"],
    ["leftHip", "leftKnee"],
    ["leftKnee", "leftAnkle"],
    ["rightShoulder", "rightHip"],
    ["rightHip", "rightKnee"],
    ["rightKnee", "rightAnkle"],
  ];

  const toTuple = ({ y = 0, x = 0 }): [number, number] => {
    return [y, x];
  };

  const drawSegment = (
    [ay, ax]: [number, number],
    [by, bx]: [number, number],
    color: string,
    scale: number,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  const drawPoint = (
    ctx: CanvasRenderingContext2D,
    y: number,
    x: number,
    r: number,
    color: string
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  };

  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    if (isVideoReady) {
      getModel();
    }
  }, [isVideoReady]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        // bring it to the center of the screen
        margin: "auto",
        backgroundColor: "#4B4A4A",
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <video ref={videoRef} width={w} height={h} />
        <canvas
          ref={canvasRef}
          width={w}
          height={h}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "1",
          }}
        />
      </div>
    </div>
  );
};

export default RealTime;
