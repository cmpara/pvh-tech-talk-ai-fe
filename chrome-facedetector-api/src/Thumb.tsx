import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

interface FaceBox {
  width: number;
  height: number;
  top: number;
  left: number;
}

interface IDot {
  x: number;
  y: number;
  top: number;
  left: number;
}

interface LandmarkBox {
  x: number;
  y: number;
  top: number;
  left: number;
  width: number;
  height: number;
}
interface LandmarkLocation {
  x: number;
  y: number;
}

interface Landmark {
  locations: LandmarkLocation[];
  type: "nose" | "eye" | "mouth";
}

interface IFace {
  boundingBox: FaceBox;
  landmarks: Landmark[];
}

const Wrapper = styled.div`
  z-index: 5;
  position: relative;
`;

const Face = styled.div<FaceBox>`
  position: absolute;
  border: 1px solid yellow;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Eye = styled.div<LandmarkBox>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: absolute;
  border: 1px solid blue;
  top: ${(props) => props.y - props.top}px;
  left: ${(props) => props.x - props.left}px;
`;

const Mouth = styled.div<LandmarkBox>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: absolute;
  border: 1px solid orange;
  top: ${(props) => props.y - props.top}px;
  left: ${(props) => props.x - props.left}px;
`;

const Nose = styled.div<LandmarkBox>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: absolute;
  border: 1px solid green;
  top: ${(props) => props.y - props.top}px;
  left: ${(props) => props.x - props.left}px;
`;

const Dot = styled.div<IDot>`
  height: 2px;
  width: 2px;
  position: absolute;
  border-radius: 50%;
  border: 1px solid black;
  background-color: black;
  top: ${(props) => props.y - props.top}px;
  left: ${(props) => props.x - props.left}px;
`;

const Thumb: React.FC<{ file: File }> = ({ file }) => {
  const [faces, setFaces] = useState<IFace[]>([]);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const detectFaces = async () => {
      if (typeof window.FaceDetector === "undefined") {
        return;
      }

      const faceDetector = new window.FaceDetector();

      const faces = await faceDetector.detect(imgRef.current);

      setFaces(faces);
    };

    const reader = new FileReader();

    reader.onloadend = () => {
      if (imgRef && imgRef.current != null) {
        imgRef.current.src = reader.result?.toString() || "";
      }
    };
    if (imgRef && imgRef.current != null) {
      imgRef.current.onload = detectFaces;
    }

    reader.readAsDataURL(file);
  }, [file]);

  return (
    <Wrapper>
      <img alt={file.name} ref={imgRef} />

      {faces.map((face) => {
        const { top, left, width, height } = face.boundingBox;

        return (
          <Face
            key={`face-${top}-${left}-${width}-${height}`}
            top={top}
            left={left}
            width={width}
            height={height}
          >
            {face.landmarks.map((landmark) => {
              const x = Math.min(
                ...landmark.locations.map((location) => Number(location.x))
              );
              const y = Math.min(
                ...landmark.locations.map((location) => Number(location.y))
              );
              const width =
                Math.max(
                  ...landmark.locations.map((location) => Number(location.x))
                ) -
                Math.min(
                  ...landmark.locations.map((location) => Number(location.x))
                );
              const height =
                Math.max(
                  ...landmark.locations.map((location) => Number(location.y))
                ) -
                Math.min(
                  ...landmark.locations.map((location) => Number(location.y))
                );
              const key = `landmark-${top}-${left}-${width}-${height}-${landmark.type}`;

              switch (landmark.type) {
                case "eye":
                  return (
                    <Eye
                      key={key}
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      top={top}
                      left={left}
                    />
                  );
                case "mouth":
                  return (
                    <Mouth
                      key={key}
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      top={top}
                      left={left}
                    />
                  );
                case "nose":
                  return (
                    <Nose
                      key={key}
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      top={top}
                      left={left}
                    />
                  );
                default:
                  return null;
              }
            })}
            {face.landmarks.map((landmark) => {
              return landmark.locations.map((location) => (
                <Dot
                  key={`${landmark.type}-${location.x}-${location.y}`}
                  x={Math.round(Number(location.x))}
                  y={Math.round(Number(location.y))}
                  top={top}
                  left={left}
                />
              ));
            })}
          </Face>
        );
      })}
    </Wrapper>
  );
};

export default Thumb;
