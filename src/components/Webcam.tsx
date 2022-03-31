import Webcam, { WebcamProps } from 'react-webcam';

import Button from '@/components/buttons/Button';

const videoConstraintsProp = {
  width: 1280,
  height: 720,
  facingMode: 'environment',
};

export type WebcamCaptureProps = {
  onCapture: (img: string | null) => void;
} & Partial<WebcamProps>;

const WebcamCapture = ({
  videoConstraints = videoConstraintsProp,
  onCapture,
  ...rest
}: WebcamCaptureProps) => (
  <Webcam
    {...rest}
    audio={false}
    screenshotFormat='image/jpeg'
    videoConstraints={videoConstraints}
  >
    {({ getScreenshot }) => (
      <Button onClick={() => onCapture(getScreenshot())}>Capture photo</Button>
    )}
  </Webcam>
);

export default WebcamCapture;
