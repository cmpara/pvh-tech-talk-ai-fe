import React, { useState } from "react";
import styled from "styled-components";
import Thumb from "./Thumb";

const SUPPORTED = ["jpg", "gif", "png", "jpeg"];

const Files = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Example: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files ?? []).filter(
      (file) => {
        const ext = file.name.split(".").pop() || "";
        return SUPPORTED.includes(ext);
      }
    );

    setFiles(uploadedFiles);
  };

  return (
    <div>
      <input title="add image with face" type="file" onChange={handleUpload} />

      <hr />

      <Files>
        {files.map((file, index) => (
          <Thumb key={`thumb-${index}`} file={file} />
        ))}
      </Files>
    </div>
  );
};

export default Example;
