/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
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
  const [leftShoulderAngle, setLeftShoulderAngle] = React.useState(0);
  const [rightShoulderAngle, setRightShoulderAngle] = React.useState(0);
  const [leftHipAngle, setLeftHipAngle] = React.useState(0);
  const [rightHipAngle, setRightHipAngle] = React.useState(0);

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
    putAngles(points.keypoints);
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

  const putAngles = (keypoints: any[]) => {
    const leftShoulder = keypoints.find((keypoint) => {
      return keypoint.part === "leftShoulder";
    });
    const leftElbow = keypoints.find((keypoint) => {
      return keypoint.part === "leftElbow";
    });
    const leftWrist = keypoints.find((keypoint) => {
      return keypoint.part === "leftWrist";
    });
    const rightShoulder = keypoints.find((keypoint) => {
      return keypoint.part === "rightShoulder";
    });
    const rightElbow = keypoints.find((keypoint) => {
      return keypoint.part === "rightElbow";
    });
    const rightWrist = keypoints.find((keypoint) => {
      return keypoint.part === "rightWrist";
    });
    const leftHip = keypoints.find((keypoint) => {
      return keypoint.part === "leftHip";
    });
    const leftKnee = keypoints.find((keypoint) => {
      return keypoint.part === "leftKnee";
    });
    const leftAnkle = keypoints.find((keypoint) => {
      return keypoint.part === "leftAnkle";
    });
    const rightHip = keypoints.find((keypoint) => {
      return keypoint.part === "rightHip";
    });
    const rightKnee = keypoints.find((keypoint) => {
      return keypoint.part === "rightKnee";
    });

    const rightAnkle = keypoints.find((keypoint) => {
      return keypoint.part === "rightAnkle";
    });

    const leftShoulderAngle = calculateAngle(
      leftShoulder.position,
      leftElbow.position,
      leftWrist.position
    );

    const rightShoulderAngle = calculateAngle(
      rightShoulder.position,
      rightElbow.position,
      rightWrist.position
    );

    const leftHipAngle = calculateAngle(
      leftHip.position,
      leftKnee.position,
      leftAnkle.position
    );

    const rightHipAngle = calculateAngle(
      rightHip.position,
      rightKnee.position,
      rightAnkle.position
    );

    const leftShoulderAngleDeg = (leftShoulderAngle * 180) / Math.PI;
    const rightShoulderAngleDeg = (rightShoulderAngle * 180) / Math.PI;
    const leftHipAngleDeg = (leftHipAngle * 180) / Math.PI;
    const rightHipAngleDeg = (rightHipAngle * 180) / Math.PI;

    setLeftShoulderAngle(leftShoulderAngleDeg);
    setRightShoulderAngle(rightShoulderAngleDeg);
    setLeftHipAngle(leftHipAngleDeg);
    setRightHipAngle(rightHipAngleDeg);
  };

  const calculateAngle = (
    a: { x: number; y: number },
    b: { x: number; y: number },
    c: { x: number; y: number }
  ) => {
    const AB = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    const BC = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
    const AC = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
    return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
  };

  //PRogram starts here
  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    if (isVideoReady) {
      getModel();
    }
  }, [isVideoReady]);

  // put angles on canvas when angles are calculated
  useEffect(() => {
    if (!canvasRef.current) return;
    if (
      leftShoulderAngle &&
      rightShoulderAngle &&
      leftHipAngle &&
      rightHipAngle
    ) {
      const ctx = canvasRef?.current.getContext("2d");
      if (!ctx) return;
      // ctx.clearRect(0, 0, w, h);
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(
        `Left Shoulder Angle: ${leftShoulderAngle.toFixed(2)}°`,
        10,
        20
      );
      ctx.fillText(
        `Right Shoulder Angle: ${rightShoulderAngle.toFixed(2)}°`,
        10,
        40
      );
      ctx.fillText(`Left Hip Angle: ${leftHipAngle.toFixed(2)}°`, 10, 60);
      ctx.fillText(`Right Hip Angle: ${rightHipAngle.toFixed(2)}°`, 10, 80);
    }
  }, [leftShoulderAngle, rightShoulderAngle, leftHipAngle, rightHipAngle]);

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      navigator.mediaDevices
        .getUserMedia({ video: false })
        .then((stream) => {
          if (!videoRef.current) return;
          videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.log(err);
        });

      // clear canvas
      if (!canvasRef.current) return;
      const ctx = canvasRef?.current.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
    }
  };

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
      <Button
        variant="contained"
        color="primary"
        onClick={stopVideo}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "2",
        }}
      >
        Stop Video
      </Button>
    </div>
  );
};

export default RealTime;
