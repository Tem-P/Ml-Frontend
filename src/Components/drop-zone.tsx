import React from "react";
import Banner from "./Banner";
import styles from "../styles/drop-zone.module.css";

type Props = {
  onChange: (files: FileList | null) => void;
  accept?: string[];
};

const DropZone = ({ onChange, accept = ["*"] }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef?.current?.click();
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange(ev.target.files);
  };

  const handleDrop = (files: FileList | null) => {
    onChange(files);
  };

  return (
    <div className={styles.wrapper}>
      <Banner onClick={handleClick} onDrop={handleDrop} />
      <input
        type="file"
        aria-label="add files"
        className={styles.input}
        ref={inputRef}
        multiple
        onChange={handleChange}
        accept={accept.join(",")}
      />
    </div>
  );
};

export { DropZone };
