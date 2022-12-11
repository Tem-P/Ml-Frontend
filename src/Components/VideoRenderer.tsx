import React from "react";

type Props = {
  src: string;
};

const VideoRenderer = ({ src }: Props) => {
  return (
    <video
      src={src}
      style={{
        width: "100%",
        height: "100%",
        margin: "10px 0",
      }}
      controls
      autoPlay
      muted
      loop
    />
  );
};

export default VideoRenderer;
