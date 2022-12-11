import React from "react";
import styles from "../styles/drop-zone.module.css";
type Props = {
  onDrop: (files: FileList) => void;
  onClick: () => void;
};

const Banner = ({ onClick, onDrop }: Props) => {
  const handleDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    onDrop(ev.dataTransfer.files);
  };

  return (
    <div
      className={styles.banner}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* <input onSelect={(e) => {}} /> */}
      <span className={styles.banner_text}>Click to Add files </span>
      <span className={styles.banner_text}>Or</span>
      <span className={styles.banner_text}>Drag and Drop files here</span>
    </div>
  );
};

export default Banner;
